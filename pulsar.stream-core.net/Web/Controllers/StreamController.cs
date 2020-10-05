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
using StreamServices;
using StreamInterfaces;

namespace StreamService.Controllers
{
    [ApiController]
    [Route("/")]
    public class StreamController : ControllerBase
    {
        private readonly ITokenValidationService _tokenValidationService;
        private readonly MongoClient _mongoClient;
        private readonly IMongoDatabase _userDb;
        private readonly IStreamService _streamService;

        public StreamController(ITokenValidationService tokenValidationService, ILogger<TokenValidationService> logger, IStreamService streamService)
        {
            _tokenValidationService = tokenValidationService;
            _mongoClient = new MongoClient("mongodb://127.0.0.1:27017/Pulsar");
            _userDb = _mongoClient.GetDatabase("Pulsar");
            _streamService = streamService;
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
            _streamService.StartStream(stream, Response, Request);
        }

        [HttpPost]
        public JsonResult SaveStream(string channel, string streamId)
        {
            Responce responce = _streamService.RecordStreamData(channel, streamId);
            return new JsonResult(responce);
        }

        [HttpDelete]
        public JsonResult DeleteStream(string channel, string streamId)
        {
            Responce responce = _streamService.RemoveStream(channel, streamId);
            return new JsonResult(responce);
        }
    }
}
