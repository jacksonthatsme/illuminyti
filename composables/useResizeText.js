// composables/useResizeText.js

import { onMounted, nextTick } from 'vue';

const isOverflown = (element) => {
  return element.scrollHeight > element.clientHeight;
};

export const useResizeText = ({ minSize = 15, maxSize = 28, step = 0.5, unit = 'px', lineHeightMultiplier = 1.2 } = {}) => {
  const resizeText = ({ elements }) => {
    elements.forEach(element => {
      let i = minSize;
      let overflow = false;

      while (!overflow && i < maxSize) {
        element.style.fontSize = `${i}${unit}`;
        element.style.lineHeight = `${i * lineHeightMultiplier}${unit}`;
        overflow = isOverflown(element);
        if (!overflow) i += step;
      }

      element.style.fontSize = `${i - step}${unit}`;
      element.style.lineHeight = `${(i - step) * lineHeightMultiplier}${unit}`;
    });
  };

  return {
    resizeText
  };
};
