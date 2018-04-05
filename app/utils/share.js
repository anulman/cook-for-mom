import { isPresent } from '@ember/utils';

const FACEBOOK_APP_ID = '1004569109682616';

export default function share(platform) {
  switch (platform) {
    case 'facebook':
      return open('https://www.facebook.com/v2.12/dialog/share', {
        app_id: FACEBOOK_APP_ID,
        display: 'popup',
        href: `https://cookformom.com${window.location.pathname}`
      });
  }
}

function open(url, queryParams) {
  let queryString;

  if (isPresent(queryParams)) {
    queryString = Object.keys(queryParams)
      .map((key) => {
        return `${key}=${encodeURIComponent(queryParams[key])}`;
      })
      .join('&');
  }

  url = [url, queryString]
    .compact()
    .join('?');

  window.open(url);
}
