using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using Models;
using StreamInterfaces;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Options;
using Utils;

namespace StreamServices
{
    public class StreamService : IStreamService
    {
        private readonly MongoClient _mongoClient;
        private readonly IMongoDatabase _userDb;
        private readonly IOptions<SecretKeys> _secretKeys;

        public StreamService(ILogger<TokenValidationService> logger, IOptions<SecretKeys> secretKeys)
        {
            _secretKeys = secretKeys;
            _mongoClient = new MongoClient(secretKeys.Value.MongoDbConnectionUrl);
            _userDb = _mongoClient.GetDatabase("Pulsar");
        }
        public void StartStream(string stream, HttpResponse Response, HttpRequest Request)
        {
            string token = Regex.Replace(stream, @"[0-9,\.]+(ts|m3u8)$", string.Empty);


            var channelsCollection = _userDb.GetCollection<Channel>("channels");


            var filter = Builders<Channel>.Filter.Eq(channel => channel.streamToken, token);

            var currentChannel = channelsCollection.Find(filter).FirstOrDefault();
            var channelStreamObj = currentChannel.currentStream;
            if (channelStreamObj == null)
            {
                Response.StatusCode = 404;
                var updateIsOnline = Builders<Channel>
                .Update
                .Set(channel => channel.isOnline, false)
                .Set(channel => channel.currentStream, null);

                channelsCollection.UpdateOne(filter, updateIsOnline);
                return;
            }

            var channelStreamObjId = channelStreamObj.id;
            var streamIsInPandingStatus = currentChannel.pending;

            var userDirectoryPath = $"{currentChannel.channelName}/{channelStreamObjId}/";
            string fullDirectoryPath = $"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}/pulsar_streams/online/{userDirectoryPath}";
            if (streamIsInPandingStatus)
            {
                var update = Builders<Channel>
                    .Update
                    .Set(channel => channel.currentStream.locationPath, $"{userDirectoryPath}index.m3u8")
                    .Set(channel => channel.currentStream.previewImage, $"{userDirectoryPath}preview.jpg")
                    .Set(channel => channel.currentStream.startDate, DateTime.UtcNow)
                    .Set(channel => channel.isOnline, true)
                    .Set(channel => channel.pending, false);

                channelsCollection.UpdateOne(filter, update);
                currentChannel.isOnline = true;
                Directory.CreateDirectory($"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}/pulsar_streams/online/{userDirectoryPath}");
            }


            if (!currentChannel.isOnline)
            {
                Response.StatusCode = 404;
                var updateIsOnline = Builders<Channel>
                .Update
                .Set(channel => channel.currentStream, null);
                channelsCollection.UpdateOne(filter, updateIsOnline);
                return;
            }

            if (stream.Contains(".m3u8"))
            {
                if (File.Exists($"{fullDirectoryPath}index.m3u8"))
                {
                    using (var indexFile = File.AppendText($"{fullDirectoryPath}index.m3u8"))
                    {

                        using (StreamReader strReader = new StreamReader(Request.Body))
                        {

                            var m3U8Lines = strReader.ReadToEnd().Split('\n');

                            var tsRegex = @"(.)+(\d.ts)$";
                            var lastTsMetadata = m3U8Lines.Select((line, index) =>
                                 {
                                     if (Regex.IsMatch(line, tsRegex))
                                     {
                                         return new M3U8 { tsVideolength = m3U8Lines[index - 1], tsFileName = line };
                                     }
                                     else if (line == "#EXT-X-ENDLIST")
                                     {
                                         return new M3U8 { tsVideolength = "", tsFileName = line };
                                     }
                                     return null;
                                 })
                                 .Where(line => line != null)
                                 .Select(line => $"{line.tsVideolength}\n{line.tsFileName}")
                                 .LastOrDefault();


                            indexFile.WriteLine(lastTsMetadata);
                            indexFile.Close();

                        }
                    }
                }
                else
                {
                    using (var indexFile = File.AppendText($"{fullDirectoryPath}index.m3u8"))
                    {
                        Request.Body.CopyTo(indexFile.BaseStream);
                        indexFile.Close();
                    }
                }



                // string[] m3U8Lines = File.ReadAllLines(e.FullPath);
            }
            else
            {
                using (var tsStream = new System.IO.FileStream($"{fullDirectoryPath}/{stream}", FileMode.OpenOrCreate))
                {
                    Request.Body.CopyTo(tsStream);
                }
            }
        }



        public Responce RecordStreamData(string channelName, string streamId)
        {

            if (channelName == null || streamId == null)
            {
                return new Responce { Status = false, Message = "ChannelName or StreamId is null" };
            }

            try
            {
                var streamFolder = $"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}/pulsar_streams/online/{channelName}/{streamId}";
                var savedStreamsFolder = $"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}/pulsar_streams/saved/{channelName}/{streamId}";

                CopyFiles(streamFolder, savedStreamsFolder);
                GenerateFullIndexList(savedStreamsFolder);

                return new Responce { Status = true, Message = "Success" };
            }
            catch (Exception ex)
            {
                return new Responce { Status = false, Message = ex.Message };
            }

        }


        public Responce RemoveStream(string channelName, string streamId)
        {

            if (channelName == null || streamId == null)
            {
                return new Responce { Status = false, Message = "ChannelName or StreamId is null" };
            }
            System.Console.WriteLine($"channelName - {channelName} streamId - {streamId}");
            try
            {
                var streamFolder = $"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}/pulsar_streams/online/{channelName}/{streamId}";

                DirectoryInfo directoryWithStream = new DirectoryInfo(streamFolder);
                System.Console.WriteLine("Remoed: " + directoryWithStream.Name);
                directoryWithStream.Delete(true);

                return new Responce { Status = true, Message = "Success" };
            }
            catch (Exception ex)
            {
                return new Responce { Status = false, Message = ex.Message };
            }

        }

        private static void CopyFiles(string from, string to)
        {
            DirectoryInfo directoryForCopy = new DirectoryInfo(from);

            Directory.CreateDirectory(to);

            var filesToCopy = directoryForCopy.GetFiles();
            foreach (var file in filesToCopy)
            {
                file.CopyTo(Path.Combine(to, file.Name));
            }
        }


        private static void GenerateFullIndexList(string streamFolder)
        {
            DirectoryInfo directoryWithStream = new DirectoryInfo(streamFolder);

            List<FileInfo> allStreamData = directoryWithStream.GetFiles().OrderBy(file => file.Name.Length).ThenBy(file => file.Name).ToList();
            FileInfo indexFile = allStreamData.FirstOrDefault(file => file.Name == "index.m3u8");
            allStreamData.RemoveAll(file => file.Name == "index.m3u8" || file.Name == "preview.jpg");
            var indexStreamReader = indexFile.OpenText();
            string fileData = indexStreamReader.ReadToEnd();
            indexStreamReader.Close();

            string indexMetadata =
                "#EXTM3U\n" +
                "#EXT-X-VERSION:3\n" +
                "#EXT-X-TARGETDURATION:8\n" +
                $"#EXT-X-MEDIA-SEQUENCE:{allStreamData.Count}\n";


            for (int iterator = 0; iterator < allStreamData.Count - 1; iterator++)
            {
                indexMetadata +=
                 "#EXTINF:8.333333,\n" +
                 $"{allStreamData[iterator].Name}\n";
            }
            var TSfileDurations = Regex.Matches(fileData, "#EXTINF:+[0-9]+.+[0-9]");

            var lastTSfileDuration = TSfileDurations[TSfileDurations.Count - 1];

            indexMetadata +=
            $"{lastTSfileDuration},\n" +
            $"{allStreamData[allStreamData.Count - 1].Name}\n" +
            "#EXT-X-ENDLIST\n";


            var indexStreamWriter = indexFile.OpenWrite();
            var indexByteMetadata = Encoding.ASCII.GetBytes(indexMetadata);
            indexStreamWriter.Write(indexByteMetadata, 0, indexByteMetadata.Length);
            indexStreamWriter.Close();
        }


    }

    class M3U8
    {
        public string tsVideolength;
        public string tsFileName;
    }
}