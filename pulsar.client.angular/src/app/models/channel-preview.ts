export class ChannelPreview {
    id: string;
    channelName: string;
    streamName: string;
    streamId: string;
    previewImage: string;

    constructor(
        id: string,
        channelName: string,
        streamName: string,
        streamId: string,
        previewImage: string
    ) {
        this.id = id;
        this.channelName = channelName;
        this.streamName = streamName;
        this.streamId = streamId;
        this.previewImage = previewImage;
    }
}
