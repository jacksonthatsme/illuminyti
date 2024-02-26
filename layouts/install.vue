<template>
  <ClientOnly>
  <div class="envelopeContainer">
    <img src="/assets/images/Envelope[Layer2].png" class="envelopeLid" alt="Envelope Lid" />
    <img src="/images/install/emblem.svg" class="emblem" alt="Emblem" />
    <h1 class="envelopeTitle">Download the app to begin</h1>
    <div class="evelopeButton" v-if="$pwa?.showInstallPrompt">
      Install
    </div>
    <h2 v-if="!$pwa?.showInstallPrompt" class="envelopeSubtitle">Scroll for <br/> instructions</h2>
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
    display: grid;
    grid-template-rows: auto 1fr auto 1fr;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  .envelopeLid {
    width: 100%;
    grid-row: 1/2;
    -webkit-filter: drop-shadow(-5px 2px 2px rgba(0, 0, 0, .2));
    filter: drop-shadow(-5px 2px 2px rgba(0, 0, 0, .2));
  }
  .emblem {
    grid-row: 2/3;
    padding: 10vw;
    width: 100%;
    height: 100%;
  }

  .envelopeTitle {
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 30px;
    text-align: center;
    grid-row: 3/4;
    padding: 0 10vw;
  }

  .envelopeSubtitle {
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 18px;
    text-align: center;
    grid-row: 4/5;
    align-self: end;
    padding: 0 10vw 80px 10vw;
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