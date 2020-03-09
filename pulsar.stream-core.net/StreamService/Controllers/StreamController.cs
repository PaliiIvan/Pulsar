using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace StreamService.Controllers
{
    [ApiController]
    [Route("/")]
    public class StreamController : ControllerBase
    {

        private readonly ILogger<StreamController> _logger;
        private readonly IAuth _authentification;
        public StreamController(ILogger<StreamController> logger, IAuth authentification)
        {
            _logger = logger;
            _authentification = authentification;
        }

        [HttpGet]
        public string CheckAction()
        {
            return "Hello world";
        }
        [HttpPut]
        public void StartStream([FromQuery] string stream)
        {
            DirectoryInfo di = Directory.CreateDirectory($@"wwwroot/{stream}/");

            if (stream.Contains(".m3u8"))
            {
                using (var indexFile = System.IO.File.OpenWrite($@"wwwroot/index.m3u8"))
                {
                    Request.Body.CopyTo(indexFile);
                }
            }
            else
            {
                using (var tsStream = new System.IO.FileStream($@"wwwroot/{stream}", FileMode.OpenOrCreate))
                {
                    Request.Body.CopyTo(tsStream);
                }
            }
        }
    }
}
