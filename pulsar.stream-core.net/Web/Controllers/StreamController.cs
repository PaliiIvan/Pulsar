using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Models;

namespace StreamService.Controllers
{
    [ApiController]
    [Route("/")]
    public class StreamController : ControllerBase
    {
        private readonly ITokenValidationService _tokenValidationService;
        private readonly MongoClient _mongoClient;
        private readonly IMongoDatabase _userDb;
        public StreamController(ITokenValidationService tokenValidationService, ILogger<TokenValidationService> logger)
        {
            _tokenValidationService = tokenValidationService;
            _mongoClient = new MongoClient("mongodb://127.0.0.1:27017/Pulsar");
            _userDb = _mongoClient.GetDatabase("Pulsar");

        }

        [HttpGet("{stream}")]
        public string CheckAction(string stream)
        {
            var st = stream;
            var channelsCollection = _userDb.GetCollection<Channel>("channels");
            var filter = Builders<Channel>.Filter.Eq(channel => channel.userId, ObjectId.Parse("5f11f0e2a84f233764161184"));

            var testres = channelsCollection.Find(filter).FirstOrDefault().Id;

            return testres.ToString();
        }

        [HttpPut("{stream}")]
        public void StartStream(string stream)
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

            if (!streamIsInPandingStatus)
            {
                Response.StatusCode = 404;
                var updateIsOnline = Builders<Channel>
                .Update
                .Set(chanel => chanel.isOnline, false)
                .Set(channel => channel.currentStream, null);

                channelsCollection.UpdateOne(filter, updateIsOnline);
                return;
            }

            var streamIsInOnlineStatus = currentChannel.isOnline;

            if (!streamIsInOnlineStatus)
            {
                var updateStartDate = Builders<Channel>
                           .Update
                           .Set(channel => channel.currentStream.startDate, DateTime.UtcNow);
                channelsCollection.UpdateOne(filter, updateStartDate);
            }

            var userDirectoryPath = $"{tokenMetaData.channelName}/{channelStreamObjId}/";
            var fullDirectoryPath = Directory.CreateDirectory($"{Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)}/pulsar_streams/{userDirectoryPath}").FullName;
            var update = Builders<Channel>
            .Update
            .Set(channel => channel.currentStream.locationPath, $"{userDirectoryPath}index.m3u8")
            .Set(chanel => chanel.isOnline, true);

            channelsCollection.UpdateOne(filter, update);

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
    }
}
