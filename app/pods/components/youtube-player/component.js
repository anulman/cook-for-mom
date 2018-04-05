import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { bind, next, scheduleOnce } from '@ember/runloop';

let isLoadingYoutubeAPI = false;
let didLoadYoutubeAPI = false;
let players = [];

const YoutubePlayer = Component.extend({
  metrics: service(),

  classNames: ['youtube-player'],

  videoId: null,
  player: null,

  height: '100%',
  width: '100%',
  aspectRatio: 9/16,
  isShowingControls: false,

  onReady() {},
  onStateChange() {},
  onPlaybackQualityChange() {},
  onPlaybackRateChange() {},
  onError() {},
  onApiChange() {},

  isIOS: computed(function() {
    let userAgent = window.navigator.userAgent;
    return !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
  }),

  didInsertElement() {
    this._onResize = bind(this, next, this, scaleVideoPlayerHeight);

    if (didLoadYoutubeAPI) {
      this.load();
    } else {
      loadYoutubeAPI();
    }

    players.addObject(this);
    window.addEventListener('resize', this._onResize, true);
  },

  willDestroyElement() {
    players.removeObject(this);
    window.removeEventListener('resize', this._onResize, true);
    this._onResize = null;
  },

  load() {
    let { videoId, height, width } =
      this.getProperties('videoId', 'height', 'width');

    if (videoId === null) {
      return;
    }

    this.player = new window.YT.Player(this.element.querySelector('main'), {
      videoId,
      height,
      width,
      playerVars: {
        controls: 0,
        disablekb: true,
        fs: false,
        iv_load_policy: 3,
        modestBranding: 1,
        playsInline: 0,
        rel: 0,
        showinfo: 0
      },
      events: {
        onReady: trigger('onReady', this),
        onStateChange: trigger('onStateChange', this),
        onPlaybackQualityChange: trigger('onPlaybackQualityChange', this),
        onPlaybackRateChange: trigger('onPlaybackRateChange', this),
        onError: trigger('onError', this),
        onApiChange: trigger('onApiChange', this)
      }
    });
  },

  play() {
    this.player.playVideo();
    this.set('isShowingControls', false);

    this.get('metrics').trackEvent('Segment', {
      event: 'video-play',
      provider: 'youtube',
      id: this.get('videoId')
    });
  }
});

YoutubePlayer.reopenClass({
  positionalParams: ['videoId']
});

export default YoutubePlayer;

function loadYoutubeAPI() {
  if (didLoadYoutubeAPI || isLoadingYoutubeAPI) {
    return;
  }

  isLoadingYoutubeAPI = true;

  if (window.onYouTubePlayerAPIReady === undefined) {
    window.onYouTubePlayerAPIReady = () => {
      didLoadYoutubeAPI = true;
      isLoadingYoutubeAPI = false;
      players.forEach((player) => player.load());
    }
  }

  if (!didLoadYoutubeAPI) {
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";

    document.getElementsByTagName('body')[0]
      .append(tag);
  }
}

function scaleVideoPlayerHeight() {
  if (typeof FastBoot !== 'undefined' || this.player === null) {
    return;
  }

  let player = this.player.getIframe();
  let { width } = player.getBoundingClientRect();

  player.style.height = `${width * this.get('aspectRatio')}px`;
  player.style['min-height'] = 'initial';
}

function trigger(eventName, ctx) {
  if (typeof FastBoot !== 'undefined') {
    return;
  }

  return function(event) {
    switch (eventName) {
      case 'onReady':
        scheduleOnce('afterRender', ctx, () => {
          if (ctx.player !== null) {
            let player = ctx.player.getIframe();
            let { width } = player.getBoundingClientRect();

            player.style['min-height'] = `${width * ctx.get('aspectRatio')}px`;
          }
        });

        ctx.set('isShowingControls', true);
        break;
      case 'onStateChange':
        switch (event.data) {
          case 0: // ended
            ctx.player.seekTo(0);
            ctx.player.pauseVideo();

            break;
          case 1: // playing
            ctx.set('isShowingControls', false);
            scheduleOnce('afterRender', ctx, scaleVideoPlayerHeight);

            break;
          case 2: // paused
            ctx.set('isShowingControls', true);
            break;
        }

        break;
    }

    ctx.get(eventName)();
  }
}
