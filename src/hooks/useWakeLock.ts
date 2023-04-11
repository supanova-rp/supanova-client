/* eslint-disable @typescript-eslint/no-explicit-any */
export const useWakeLock = () => {
  let wakeLock = null as any;

  const requestWakeLock = async () => {
    try {
      const castedNavigator: any = navigator;

      wakeLock = await castedNavigator.wakeLock.request("screen");
    } catch (error) {
      console.error(error);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLock) {
      try {
        await wakeLock.release();

        wakeLock = null;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    requestWakeLock,
    releaseWakeLock,
  };
};
