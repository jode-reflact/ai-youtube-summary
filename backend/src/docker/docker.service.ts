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
        // intervall to delete exited containers
        /*
         setInterval(() => {
            child_process.spawn('docker', ["container", "prune", "--force"], { shell: true });
        }, 1000 * 60 * 1)
        */
    }

    // ytVideoUrl example: https://www.youtube.com/watch?v=L3wKzyIN1yk
    async summarizeYTVideo(ytVideoUrl: string) {
        return new Promise<string>((resolve, reject) => {
            const process = child_process.spawn('docker', ["run", '--env yt_url="' + ytVideoUrl + '"', 'ai-yt-summary'], { shell: true });
            process.stderr.on('data', (data) => {
                const d = Buffer.from(data);
                const dataString = d.toString();
                console.log('error:', dataString);
                // docker error occured
                if (dataString.includes('docker')) {

                    process.stderr.removeAllListeners('data');
                    process.stdout.removeAllListeners('data');
                    reject(dataString)
                }
            });
            process.stdout.on('data', (data) => {
                const d = Buffer.from(data);
                const dataString = d.toString();
                console.log('output', dataString);
                if (dataString.startsWith("Summary:")) {
                    const summary = dataString.replace("Summary:", "")

                    process.stderr.removeAllListeners('data');
                    process.stdout.removeAllListeners('data');
                    resolve(summary)
                }
            })
            // timeout after 1h
            setTimeout(() => { reject("Timeout") }, 1000 * 60 * 60)
        });
    }
}
