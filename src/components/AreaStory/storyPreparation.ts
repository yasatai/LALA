type IdleWindow = Window & typeof globalThis & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const storyImages = [
  '/images/service-interior-map.jpg',
  '/images/sendai-station.jpg',
];

let imagePreparation: Promise<void> | null = null;

export function prepareStoryImages() {
  if (imagePreparation) return imagePreparation;

  imagePreparation = Promise.allSettled(
    storyImages.map((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      return image.decode?.() ?? Promise.resolve();
    }),
  ).then(() => undefined);

  return imagePreparation;
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
