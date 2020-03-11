using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace StreamService.Controllers
{
    [ApiController]
    [Route("/")]
    public class StreamController : ControllerBase
    {
        private readonly ITokenValidationService _tokenValidationService;
        public StreamController(ITokenValidationService tokenValidationService, ILogger<TokenValidationService> logger)
        {
          _tokenValidationService = tokenValidationService;
        }

        [HttpGet]
        public void CheckAction(string token)
        {
           var tokenMetaData = _tokenValidationService.ValidateToken(token);
        }
        [HttpPut]
        public void StartStream([FromQuery] string stream)
        {
            string token = Regex.Replace(stream, @"[0-9,\.]+ts", string.Empty).Replace(".m3u8", string.Empty);
            var tokenMetaData = _tokenValidationService.ValidateToken(token);

            string directoryToSave = Directory.CreateDirectory($@"wwwroot/{tokenMetaData.StreamId}/").FullName;

            if (stream.Contains(".m3u8"))
            {
                using (var indexFile = System.IO.File.OpenWrite($"{directoryToSave}/index.m3u8"))
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
