import { exec } from "node:child_process";
import "dotenv/config";

const cmd = `ffmpeg -re -f lavfi -i testsrc2=size=960x540 -f lavfi -i aevalsrc="sin(0*2*PI*t)" -vcodec libx264 -r 30 -g 30 -preset fast -vb 3000k -pix_fmt rgb24 -pix_fmt yuv420p -f flv rtmp://live-fra.twitch.tv/app/${process.env.STREAM_KEY}`;
exec(cmd, (err, output) => {
  // once the command has completed, the callback function is called
  if (err) {
    // log and return if we encounter an error
    console.error("could not execute command: ", err);
    return;
  }
  // log the output received from the command
  console.log("Output: \n", output);
});
