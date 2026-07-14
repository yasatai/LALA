import { municipalities, type MunicipalityRegion } from '../../data/municipalities';

export type MunicipalityRenderData = {
  code: string;
  name: string;
  region: MunicipalityRegion;
  featured: boolean;
  path: string;
  anchorX: number;
  anchorY: number;
  labelX: number;
  labelY: number;
  labelAlign: 'start' | 'end';
  guidePath: string;
};

export type MiyagiMapRenderData = {
  viewBox: [number, number, number, number];
  sendaiOrigin: {
    xPercent: number;
    yPercent: number;
  };
  municipalities: MunicipalityRenderData[];
};

type IdleWindow = Window & typeof globalThis & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const storyImages = [
  '/images/service-interior-map.webp',
  '/images/sendai-station.webp',
];

let imagePreparation: Promise<void> | null = null;
let renderDataRequest: Promise<MiyagiMapRenderData> | null = null;
let preparedRenderData: MiyagiMapRenderData | null = null;

export function getPreparedMiyagiMapData() {
  return preparedRenderData;
}

export function prepareMiyagiMapData() {
  if (!renderDataRequest) {
    renderDataRequest = fetch('/data/miyagi-map-render-data.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Miyagi map render data: ${response.status}`);
        return response.json() as Promise<MiyagiMapRenderData>;
      })
      .then((data) => {
        const knownCodes = new Set(municipalities.map((municipality) => municipality.code));
        const valid = data.municipalities.length === 35
          && data.municipalities.every((municipality) => knownCodes.has(municipality.code));
        if (!valid) throw new Error('Miyagi municipality render data validation failed');
        preparedRenderData = data;
        return data;
      })
      .catch((error: unknown) => {
        preparedRenderData = null;
        renderDataRequest = null;
        throw error;
      });
  }

  return renderDataRequest;
}

function decodeImage(src: string) {
  return new Promise<void>((resolve) => {
    let image: HTMLImageElement;

    try {
      image = new Image();
    } catch {
      resolve();
      return;
    }

    image.decoding = 'async';
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      image.onload = null;
      image.onerror = null;

      if (typeof image.decode !== 'function') {
        resolve();
        return;
      }

      try {
        void image.decode().catch(() => undefined).then(() => resolve());
      } catch {
        resolve();
      }
    };

    image.onload = finish;
    image.onerror = finish;

    try {
      image.src = src;
    } catch {
      finish();
      return;
    }

    if (image.complete) finish();
  });
}

export function prepareStoryImages() {
  if (imagePreparation) return imagePreparation;

  imagePreparation = Promise.all(storyImages.map(decodeImage)).then(() => undefined);

  return imagePreparation;
}

export function preloadMiyagiMapAssets() {
  return Promise.all([prepareMiyagiMapData(), prepareStoryImages()]).then(([data]) => data);
}

export function scheduleIdleTask(task: () => void, timeout = 1200) {
  const idleWindow = window as IdleWindow;

  if (idleWindow.requestIdleCallback) {
    const handle = idleWindow.requestIdleCallback(task, { timeout });
    return () => idleWindow.cancelIdleCallback?.(handle);
  }

  const handle = window.setTimeout(task, 300);
  return () => window.clearTimeout(handle);
}
