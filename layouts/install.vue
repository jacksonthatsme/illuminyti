<template>
  <ClientOnly>
  <div class="envelopeContainer">
    <img src="/assets/images/Envelope[Layer2].png" class="envelopeLid" alt="Envelope Lid" />
    <img src="/images/install/emblem.svg" class="emblem" alt="Emblem" />
    <h1 class="envelopeTitle">Download the app to begin</h1>
    <div class="envelopeAction">
      <div v-if="$pwa?.showInstallPrompt" class="evelopeButton" @click="$pwa.install()">
        Install
      </div>
      <h2 v-if="!$pwa?.showInstallPrompt" class="envelopeSubtitle">Scroll for <br/> instructions</h2>
    </div>
  </div>
  <div class="instructionsContainer" v-if="!$pwa?.showInstallPrompt">
    <h1 class="instructionsTitle">Instructions</h1>
    <div class="instructions">
      <div v-for="(instruction, index) in pwaInstructions" :key="index" class="instructionBlock">
        <span class="instructionNumeral">
          0{{ index + 1 }}.
        </span>
        <span class="instructionContent">
          {{ instruction.content }}
        </span>
        <img class="instructionImage" :src="'/images/pwainstructions/' + instruction.image + '.png'" alt="">
      </div>
    </div>
  </div>
  </ClientOnly>
</template>

<script setup>
  import { computed } from 'vue';
  const device = useDevice()

  const pwaInstructions = computed(() => {
    if (device.isIos && device.isSafari) { 
      return [
        {image: 'pwa-instruction-ios-02', content: 'Tap the share icon'},
        {image: 'pwa-instruction-ios-03', content: 'Tap Add to Home Screen'},
      ];
    } else if (device.isIos && !device.isSafari) {
      return [
        {image: 'pwa-instruction-ios-01', content: 'Open this page in Safari'},
        {image: 'pwa-instruction-ios-02', content: 'Tap the share button'},
        {image: 'pwa-instruction-ios-03', content: 'Tap "Add to Home Screen"'},
      ];
    } else if (device.isAndroid) {
      return [
        {image: 'pwa-instruction-android-01', content: 'Open the page options'},
        {image: 'pwa-instruction-android-02', content: 'Tap install app'},
        {image: 'pwa-instruction-android-03', content: 'Confirm the installation'},
      ];
    }
  })
</script>

<style lang="scss" scoped>
  .envelopeContainer {
    height: 100dvh;
    width: 100dvw;
    background: url('/assets/images/Envelope[Layer1].png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px; /* Margin at the bottom */
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    color: #242424;
    min-width: 0;
    min-height: 0;
  }

  .evelopeButton {
    border: #B40000 4px solid;
    color: #B40000;
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 20px;
    padding: 20px 16px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    display: inline-block;
    transform: rotate(-5deg);
  }

  .envelopeLid {
    width: 100%;
    -webkit-filter: drop-shadow(-5px 2px 2px rgba(0, 0, 0, .2));
    filter: drop-shadow(-5px 2px 2px rgba(0, 0, 0, .2));
  }
  .emblem {
    padding: 10vw;
    flex-shrink: 1;
    flex-grow: 0;
    min-height: 0;
    mix-blend-mode: multiply;
  }

  .envelopeTitle {
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 30px;
    text-align: center;
    padding: 0 10vw;
  }

  .envelopeSubtitle {
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
    text-align: center;
  }

  .envelopeAction {
    padding: 40px 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .instructionsTitle {
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 30px;
  }

  .instructionsContainer {
    margin-top: 100dvh;
    background-color: white;
    padding: 10vw 5vw;
    background: url('/assets/images/PaperTexture.png'), #F7F7E7;
    background-repeat: repeat, no-repeat;
    background-size: 400px, cover;
    background-blend-mode: hard-light, normal;
  }
  .instructionImage {
    width: 100%;
    margin-top: 10px;
  }
  .instructionBlock {
    margin-top: 5vw;
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
  }
  .instructionNumeral {
    font-weight: 500;
  }
  .instructionNumeral {
    display: inline;
  }
</style>