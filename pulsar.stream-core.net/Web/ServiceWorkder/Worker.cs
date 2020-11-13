using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace StreamPreviewServiceWorker
{
    public class Worker : BackgroundService
    {
        private readonly string streamFolder = @"C:\Users\ivan.palii\Documents\pulsar_streams\online";
        private readonly ILogger<Worker> _logger;

        public Worker(ILogger<Worker> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            System.Console.WriteLine("Started");
            using (FileSystemWatcher watcher = new FileSystemWatcher())
            {

                watcher.Filter = "*.ts";
                watcher.IncludeSubdirectories = true;
                watcher.Path = streamFolder;

                watcher.Created += (sender, e) =>
                {
                    System.Console.WriteLine(e);
                    string imagePathAndName = Path.Combine(Path.GetDirectoryName(e.FullPath), "preview.jpg");
                    using (Process process = new Process())
                    {
                        process.StartInfo = new ProcessStartInfo
                        {
                            CreateNoWindow = false,
                            FileName = @"ffmpeg\ffmpeg.exe", // or path to the ffmpeg
                            WindowStyle = ProcessWindowStyle.Hidden,
                            Arguments = $@" -y -i {e.FullPath} -ss 00:00:0.010 -vframes 1 {imagePathAndName}"
                        };

                        process.Start();
                        process.WaitForExit(1000);
                    };

                };
                watcher.EnableRaisingEvents = true;

                while (!stoppingToken.IsCancellationRequested)
                {
                    //Set the filter to all files.

                    await Task.Delay(10000, stoppingToken);
                }
            }
        }
    }
}