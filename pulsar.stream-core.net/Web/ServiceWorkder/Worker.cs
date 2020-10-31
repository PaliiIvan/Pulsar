using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
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
            while (!stoppingToken.IsCancellationRequested)
            {
                using (FileSystemWatcher watcher = new FileSystemWatcher())
                {
                    //Set the filter to all files.

                    watcher.Filter = "*.ts";
                    watcher.IncludeSubdirectories = true;
                    watcher.Path = streamFolder;

                    watcher.Created += (sender, e) =>
                    {
                        System.Console.WriteLine("-----------------------");

                        string imagePathAndName = Path.Combine(Path.GetDirectoryName(e.FullPath), "preview.jpg");
                        var process = new Process
                        {
                            StartInfo = new ProcessStartInfo()
                            {
                                CreateNoWindow = false,
                                FileName = @"ffmpeg\ffmpeg.exe", // or path to the ffmpeg
                                WindowStyle = ProcessWindowStyle.Hidden,
                                Arguments = $@"-i {e.FullPath} -ss 00:00:1.000 -vframes 1 {imagePathAndName}"
                            }
                        };


                        System.Console.WriteLine("-----------------------");
                        process.Start();
                        process.WaitForExit(10000);
                    };

                    watcher.EnableRaisingEvents = true;

                    await Task.Delay(1000, stoppingToken);
                }

            }
        }
    }
}
