using Microsoft.AspNetCore.Http;
using Models;

namespace StreamInterfaces
{
    public interface IStreamService
    {
        void StartStream(string stream, HttpResponse Response, HttpRequest Request);

        Responce RecordStreamData(string channelName, string streamId);

        Responce RemoveStream(string channelName, string streamId);

    }
}