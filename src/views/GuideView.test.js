import { shallowMount } from '@vue/test-utils';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import GuideView from './GuideView.vue';
import { afterEach } from 'vitest';

let setAvailableMock = vi.fn();
let setUnavailableMock = vi.fn();
let setStepMock = vi.fn();
let setExtIdMock = vi.fn();
let setExtNameMock = vi.fn();
let setExtVersionMock = vi.fn();
let setBrowserMock = vi.fn();

vi.mock('@/stores/guide', () => ({
  useGuideStore: vi.fn(() => ({
    currentStep: 0,
    browser: 'chrome',
    extId: '',
    extName: '',
    extVersion: '',
    apiUrl: 'https://vitest.local',
    isUnavailable: 'false',
    setAvailable: setAvailableMock,
    setUnavailable: setUnavailableMock,
    setStep: setStepMock,
    setExtId: setExtIdMock,
    setExtName: setExtNameMock,
    setExtVersion: setExtVersionMock,
    setBrowser: setBrowserMock,
  })),
}));

const mockJson = {
  serving: true,
  id: 'chromeextensionid',
  name: 'Chrome Extension Name',
  version: '1.0',
};

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(GuideView);
});

afterEach(() => {
  wrapper.unmount();
  vi.clearAllMocks();
});

describe(`Fetch API '/status'`, () => {
  it('should fetch server status and update guideStore on success', async () => {
    expect.assertions(5);
    // Mock server to return JSON
    const server = setupServer(
      http.get('https://vitest.local/status', () => {
        return HttpResponse.json(mockJson);
      }),
    );
    server.listen();

    await wrapper.vm.getServerStatus();
    // Expect that guideStore methods are called with the correct values
    expect(setAvailableMock).toHaveBeenCalled();
    expect(setExtIdMock).toHaveBeenCalledWith('chromeextensionid');
    expect(setExtNameMock).toHaveBeenCalledWith('Chrome Extension Name');
    expect(setExtVersionMock).toHaveBeenCalledWith('1.0');
    // Expect that no other guideStore methods are called
    expect(setUnavailableMock).not.toHaveBeenCalled();

    server.close();
  });

  it('should fetch server status and update guideStore if fetch throws error', async () => {
    expect.assertions(6);
    // Mock server to return network error
    const server = setupServer(
      http.get('https://vitest.local/status', () => {
        return HttpResponse.networkError();
      }),
    );

    server.listen();

    // Expect that fetch promise is rejected and guideStore isUnavailable is set to true
    await expect(wrapper.vm.getServerStatus()).rejects.toThrowError();
    expect(setUnavailableMock).toHaveBeenCalled();
    // Expect that no other guideStore methods are called
    expect(setAvailableMock).not.toHaveBeenCalled();
    expect(setExtIdMock).not.toHaveBeenCalled();
    expect(setExtNameMock).not.toHaveBeenCalled();
    expect(setExtVersionMock).not.toHaveBeenCalled();

    server.close();
  });
});
