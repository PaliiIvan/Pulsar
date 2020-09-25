using MongoDB.Bson;
using MongoDB.Driver;
using Models;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Models
{
    public class Channel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public bool isOnline { get; set; }
        public bool pending { get; set; }
        public ObjectId userId { get; set; }
        public string channelName { get; set; }
        public string streamToken { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public Stream currentStream { get; set; }
        public int __v { get; set; }
    }
}