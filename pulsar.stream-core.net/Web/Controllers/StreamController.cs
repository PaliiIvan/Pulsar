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
        private readonly MongoClient _mongoClient;
        private readonly IMongoDatabase _userDb;
        private readonly IStreamService _streamService;

        private readonly ILogger<TokenValidationService> _logger;
        public StreamController(IStreamService streamService)
        {
            _mongoClient = new MongoClient("mongodb://ivan-palii:7INYnjqcWzCZ5uIn89nXuB6O0abJD3M0lmwcAUiCbunFYehX1yu9bIUkZRB0E2tiBdZq5vx3n0NKBDRi1RLgBg==@ivan-palii.mongo.cosmos.azure.com:10255/?ssl=true&appName=@ivan-palii@");
            _userDb = _mongoClient.GetDatabase("Pulsar");
            _streamService = streamService;
        }

        [HttpGet("{stream}")]
        public string CheckAction(string stream)
        {
            return "Hello from CheckAction";
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
