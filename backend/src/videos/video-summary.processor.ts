import { config } from 'dotenv';
import child_process from 'node:child_process';
import { Logger } from '@nestjs/common';
import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { VideosService } from './videos.service';

config(); // neccessary for process.env to work to retrieve VIDEO_SUMMARY_CONCURRENCY

@Processor('video-summary')
export class VideoSummaryProcessor {
  private readonly logger = new Logger(VideoSummaryProcessor.name);
  private static readonly CONCURRENCY =
    parseInt(process.env['VIDEO_SUMMARY_CONCURRENCY']) || 5;

  constructor(private readonly videoService: VideosService) {}

  @Process({
    concurrency: VideoSummaryProcessor.CONCURRENCY,
  })
  async handleVideoSummary(job: Job<{ videoId: string; youtubeUrl: string }>) {
    const { videoId, youtubeUrl } = job.data;

    const existingSummary = await this.videoService.getSummary(videoId);
    if (existingSummary) return existingSummary;

    return this.summarizeYtVideo(youtubeUrl);
  }

  @OnQueueActive()
  async onActive(job: Job<{ videoId: string; youtubeUrl: string }>) {
    const { youtubeUrl } = job.data;
    this.logger.log(`⏳ Processing for video ${youtubeUrl} started`);
  }

  @OnQueueCompleted()
  async onCompleted(
    job: Job<{ videoId: string; youtubeUrl: string }>,
    summary: string,
  ) {
    const { videoId, youtubeUrl } = job.data;
    this.logger.log(`🏁 Summarized video ${youtubeUrl}: ${summary}`);

    await this.videoService.fillSummary(videoId, summary);
  }

  private async summarizeYtVideo(ytVideoUrl: string): Promise<string> {
    // return new Promise<string>((resolve) => {
    //   setTimeout(() => {
    //     resolve('This is a summary');
    //   }, Math.random() * 60_000 + 30_000);
    // });

    return new Promise<string>((resolve, reject) => {
      const process = child_process.spawn(
        'docker',
        ['run', '--env yt_url="' + ytVideoUrl + '"', 'yousum-pipeline'],
        { shell: true },
      );
      process.stderr.on('data', (data) => {
        const d = Buffer.from(data);
        const dataString = d.toString();
        // console.log('error:', dataString);
        // docker error occured
        if (dataString.includes('docker')) {
          process.stderr.removeAllListeners('data');
          process.stdout.removeAllListeners('data');
          reject(dataString);
        }
      });
      process.stdout.on('data', (data) => {
        const d = Buffer.from(data);
        const dataString = d.toString();
        // console.log('output', dataString);
        if (dataString.startsWith('Summary:')) {
          const summary = dataString.replace('Summary:', '');

          process.stderr.removeAllListeners('data');
          process.stdout.removeAllListeners('data');
          resolve(summary);
        }
      });
      // timeout after 1h
      setTimeout(() => {
        reject('Timeout');
      }, 1000 * 60 * 60);
    });
  }
}
