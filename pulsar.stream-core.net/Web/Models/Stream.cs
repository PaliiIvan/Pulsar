using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class Stream
    {
        [BsonId]
        public ObjectId id { get; set; }
        public ObjectId channel { get; set; }
        public string title { get; set; }
        public string locationPath { get; set; }
        public string previewImage { get; set; }
        public dynamic comments { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public DateTime startDate { get; set; }
        public int __v { get; set; }
    }
}