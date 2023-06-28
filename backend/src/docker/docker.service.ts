import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import child_process from 'node:child_process';
import { Video, VideoDocument } from 'src/videos/schemas/video.schema';

@Injectable()
export class DockerService {
    constructor(
        @InjectModel(Video.name)
        private readonly videoModel: Model<VideoDocument>,
    ) {
        /*
        const process = child_process.spawn('docker', ["events", '--filter event=destroy', '--filter type=container', "--format '{{json .}}'"], { shell: true });
        process.stdout.on('data', (data) => {
            const d = Buffer.from(data);
            const dataString = d.toString();
            console.log('output', dataString);

        })
        */
    }
    // ytVideoUrl example: https://www.youtube.com/watch?v=L3wKzyIN1yk
    async summarizeYTVideo(ytVideoUrl: string) {
        return new Promise<string>((resolve, reject) => {
            const process = child_process.spawn('docker', ["run", '--env yt_url="' + ytVideoUrl + '"', 'ai-yt-summary'], { shell: true });
            process.stdout.on('data', (data) => {
                const d = Buffer.from(data);
                const dataString = d.toString();
                console.log('output', dataString);
                if (dataString.startsWith("Summary:")) {
                    const summary = dataString.replace("Summary:", "")
                    resolve(summary)
                }
            })
            // timeout after 1h
            setTimeout(() => { reject("Timeout") }, 1000 * 60 * 60)
        });
    }
}
