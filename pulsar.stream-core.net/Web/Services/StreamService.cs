using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using Models;
using StreamInterfaces;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace StreamServices
{
    public class StreamService : IStreamService
    {

        private readonly ITokenValidationService _tokenValidationService;
        private readonly MongoClient _mongoClient;
        private readonly IMongoDatabase _userDb;
        public StreamService(ITokenValidationService tokenValidationService, ILogger<TokenValidationService> logger)
        {
            _tokenValidationService = tokenValidationService;
            _mongoClient = new MongoClient("mongodb://127.0.0.1:27017/Pulsar");
            _userDb = _mongoClient.GetDatabase("Pulsar");
        }
        public void StartStream(string stream, HttpResponse Response, HttpRequest Request)
        {
            string token = Regex.Replace(stream, @"__+[0-9,\.]+(ts|m3u8)$", string.Empty);
            var tokenMetaData = _tokenValidationService.ValidateToken(token);


            var channelsCollection = _userDb.GetCollection<Channel>("channels");
            var filter = Builders<Channel>.Filter.Eq(channel => channel.userId, ObjectId.Parse(tokenMetaData.UserId));

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

            var userDirectoryPath = $"{tokenMetaData.channelName}/{channelStreamObjId}/";
            if (streamIsInPandingStatus)
            {
                var update = Builders<Channel>
                    .Update
                    .Set(channel => channel.currentStream.locationPath, $"{userDirectoryPath}index.m3u8")
                    .Set(channel => channel.currentStream.startDate, DateTime.UtcNow)
                    .Set(channel => channel.isOnline, true)
                    .Set(channel => channel.pending, false);

                channelsCollection.UpdateOne(filter, update);
                currentChannel.isOnline = true;
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
            var fullDirectoryPath = Directory.CreateDirectory($"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}/pulsar_streams/online/{userDirectoryPath}").FullName;

            if (stream.Contains(".m3u8"))
            {
                using (var indexFile = System.IO.File.OpenWrite($"{fullDirectoryPath}index.m3u8"))
                {
                    Request.Body.CopyTo(indexFile);
                }
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
            try
            {
                var streamFolder = $"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}/pulsar_streams/online/{channelName}/{streamId}";

                DirectoryInfo directoryWithStream = new DirectoryInfo(streamFolder);
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

            List<FileInfo> allStreamData = directoryWithStream.GetFiles().OrderBy(file => file.Name).ToList();
            FileInfo indexFile = allStreamData.FirstOrDefault(file => file.Name == "index.m3u8");
            allStreamData.RemoveAll(file => file.Name == "index.m3u8");

            var res = indexFile.OpenText();
            string fileData = res.ReadToEnd();
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

            File.WriteAllText("test.m3u8", indexMetadata);
            System.Console.WriteLine(indexMetadata);
        }

    }
}