# cook-for-mom

[cookformom.com](https://cookformom.com/?utm_source=github&utm_medium=documentation&utm_campaign=readme&utm_content=intro) is an online course that helps beginner and intermediate home cooks learn to prepare a 3-course meal for Mother's Day 2018.

All site code is intended to be licensed with the MIT license. All site content (eg copy, recipes, videos, etc) is generally under copyright. A `LICENSE` file will be published soon.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [ffmpeg](https://ffmpeg.org/)
    * Install with `brew install ffmpeg --with-libvpx --with-libvorbis --with-fdk-aac --with-opus` ([source](https://gist.github.com/Vestride/278e13915894821e1d6f))

## Installation

* `git clone <repository-url>` this repository
* `cd cook-for-mom`
* `yarn install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* ~~Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).~~

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Video Conversion

* **Use the included `bin` script:** `bin/encode lessons/knife-skills/**/edited/*.mov -o public/assets/videos/lessons/knife-skills`
* WebM: Needs two passes:

```
ffmpeg -i <source> -c:v libvpx-vp9 -pass 1 -b:v 1000K -threads 1 -speed 4 -tile-columns 0 -frame-parallel 0 -auto-alt-ref 1 -lag-in-frames 25 -g 9999 -aq-mode 0 -an -dn -sn -f webm /dev/null
ffmpeg -i <source> -c:v libvpx-vp9 -pass 2 -b:v 1000K -threads 1 -speed 0 -tile-columns 0 -frame-parallel 0 -auto-alt-ref 1 -lag-in-frames 25 -g 9999 -aq-mode 0 -an -dn -sn -f webm out.webm
```

* MP4: `ffmpeg -i <source> -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -level 3 -an -sn -dn output.mp4`
    * `pix_fmt` is only required for Quicktime / `.mov` support

### Running Tests

None yet :(

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

This site is hosted w Firebase Hosting @ cookformom.com, and is deployed with ember-cli-deploy:

```bash
ember deploy production
```

Check [e-cli-deploy-firebase-hosting](https://www.npmjs.com/package/ember-cli-deploy-firebase) for CI instructions.

## Further Reading / Useful Links

* [cookformom.com](https://cookformom.com/?utm_source=github&utm_medium=documentation&utm_campaign=readme&utm_content=footer-links)
* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
