export class ChannelPreview {
    id: string;
    channelName: string;
    streamName: string;
    streamId: string;

    constructor(id: string, channelName: string, streamName: string, streamId: string) {
        this.id = id;
        this.channelName = channelName;
        this.streamName = streamName;
        this.streamId = streamId;
    }
}