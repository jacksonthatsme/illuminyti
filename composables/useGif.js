import { ref, nextTick } from 'vue';

export function useGif(gifUrl) {
  const gifSrc = ref(gifUrl);

  async function resetGif() {
    try {
      gifSrc.value = '';
      await nextTick();
      gifSrc.value = gifUrl;
    } catch (error) {
      console.error('Error resetting GIF:', error);
    }
  }

  return {
    gifSrc,
    resetGif
  };
}