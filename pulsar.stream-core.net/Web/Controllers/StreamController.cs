using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

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
            var channelsCollection = _userDb.GetCollection<BsonDocument>("channels");
            var filter = Builders<BsonDocument>.Filter.Eq("userId", ObjectId.Parse("5ee099261f0d11077900d3e2"));

            var testres = channelsCollection.Find(filter).FirstOrDefault().GetElement("_id").Value;

            return testres.ToString();
        }

        [HttpPut("{stream}")]
        public void StartStream(string stream)
        {
            string token = Regex.Replace(stream, @"__+[0-9,\.]+(ts|m3u8)$", string.Empty);
            var tokenMetaData = _tokenValidationService.ValidateToken(token);


            var channelsCollection = _userDb.GetCollection<BsonDocument>("channels");
            var filter = Builders<BsonDocument>.Filter.Eq("userId", ObjectId.Parse(tokenMetaData.UserId));

            var channelObj = channelsCollection.Find(filter).FirstOrDefault();
            var channelStreamObj = channelObj["currentStream"];
            if (channelStreamObj.IsBsonNull)
            {
                Response.StatusCode = 404;
                var updateIsOnline = Builders<BsonDocument>
                .Update
                .Set("isOnline", false)
                .Set<BsonDocument, object>("currentStream", null);

                channelsCollection.UpdateOne(filter, updateIsOnline);
                return;
            }

            var channelStreamObjId = channelStreamObj["_id"];
            var streamIsInPandingStatus = channelObj["pending"].AsBoolean;

            if (!streamIsInPandingStatus)
            {
                Response.StatusCode = 404;
                var updateIsOnline = Builders<BsonDocument>
                .Update
                .Set("isOnline", false)
                .Set<BsonDocument, object>("currentStream", null);

                channelsCollection.UpdateOne(filter, updateIsOnline);
                return;
            }

            var directoryPath = $"{tokenMetaData.channelName}/{channelStreamObjId}/";
            var directoryToSave = Directory.CreateDirectory($"wwwroot/{directoryPath}").FullName;
            var update = Builders<BsonDocument>
            .Update
            .Set("currentStream.locationPath", $"{directoryPath}index.m3u8")
            .Set("isOnline", true);

            channelsCollection.UpdateOne(filter, update);

            if (stream.Contains(".m3u8"))
            {
                using (var indexFile = System.IO.File.OpenWrite($"{directoryToSave}index.m3u8"))
                {
                    Request.Body.CopyTo(indexFile);
                }
            }
            else
            {
                using (var tsStream = new System.IO.FileStream($"{directoryToSave}/{stream}", FileMode.OpenOrCreate))
                {
                    Request.Body.CopyTo(tsStream);
                }
            }
        }
    }
}
