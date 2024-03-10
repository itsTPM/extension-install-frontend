import { useGuideStore } from '@/stores/guide';
import { describe, expect, it, vi } from 'vitest';
import detectBrowser from './detectBrowser';

let setBrowserMock = vi.fn();

vi.mock('@/stores/guide', () => ({
  useGuideStore: vi.fn(() => ({
    setBrowser: setBrowserMock,
  })),
}));

describe('detectBrowser', () => {
  it('should detect Opera', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0'; // extracted from Opera One 107.0.5045.36
    detectBrowser(userAgent);
    expect(useGuideStore().setBrowser).toHaveBeenCalledWith('opera');
  });

  it('should detect Microsoft Edge', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0'; // extracted from Microsoft Edge 121.0.2277.128
    detectBrowser(userAgent);
    expect(useGuideStore().setBrowser).toHaveBeenCalledWith('edge');
  });

  it('should detect Yandex Browser', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 YaBrowser/24.1.0.0 Safari/537.36'; // extracted from Yandex Browser 24.1.3.809
    detectBrowser(userAgent);
    expect(useGuideStore().setBrowser).toHaveBeenCalledWith('yandex');
  });

  it('should detect Firefox', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; rv:123.0) Gecko/20100101 Firefox/123.0'; // extracted from LibreWolf 123.0-1
    detectBrowser(userAgent);
    expect(useGuideStore().setBrowser).toHaveBeenCalledWith('firefox');
  });

  it('should detect Chrome', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'; // extracted from ungoogled-chromium 122.0.6261.111
    detectBrowser(userAgent);
    expect(useGuideStore().setBrowser).toHaveBeenCalledWith('chrome');
  });

  it('should detect unsupported browser', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Other/1.0';
    detectBrowser(userAgent);
    expect(useGuideStore().setBrowser).toHaveBeenCalledWith('Неподдерживаемый');
  });
});
