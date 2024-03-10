import { useGuideStore } from '@/stores/guide';

function detectBrowser(userAgent) {
  userAgent = userAgent.toLowerCase();

  const browsers = {
    opera: /opr/.test(userAgent) || /opera/.test(userAgent),
    edge: /edg/.test(userAgent) || /edge/.test(userAgent),
    yandex: /yabrowser/.test(userAgent),
    firefox: /firefox/.test(userAgent),
    chrome: /chrome/.test(userAgent),
    // safari: /safari/.test(userAgent) && /mac os x/.test(userAgent),
  };

  for (const key in browsers) {
    if (browsers[key]) {
      useGuideStore().setBrowser(key);
      break;
    } else {
      useGuideStore().setBrowser('Неподдерживаемый');
    }
  }
}

export default detectBrowser;
