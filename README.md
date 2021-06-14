# Another Meme Generator

This project is an experimental meme generator that is built using React and [ffmpeg.wasm](https://ffmpegwasm.github.io/). The app leverages ffmpeg to create a gif of a video file from the user. It also uses ffmpeg's drawtext filter to display text on the output gif. [Example on Loom](https://www.loom.com/share/ea07cdf56c574b35b776b907dab3d1d7)

> ✨ Bootstrapped with Create Snowpack App (CSA).

### Available Scripts

#### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.mjs` config file.

#### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
