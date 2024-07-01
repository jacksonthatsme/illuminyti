<template>
  <div class="deviceContainer" :class="{'isPeeking': isPeeking}">
    <div class="deviceWrapper">
      <div class="top">
        <div class="light" @click="lightClick" :class="{'isOn': lightBulbState === 'on', 
                                                        'isOff': lightBulbState === 'off', 
                                                        'isBlinking': lightBulbState === 'blinking'}">
          <div class="bulb"></div>
          <div class="base"></div>
          <div class="glow"></div>
        </div>
        <div class="battery" @click="batteryClick">
          <img src="/images/transciever/BatteryCoil.png" />
        </div>
      </div>
      <div class="body">
        <div class="screenContainer">
          <img src="/images/transciever/Screw.png" class="screw" style="grid-row: 1 / 2; grid-column: 1 / 2;" />
          <img src="/images/transciever/Screw.png" class="screw" style="grid-row: 1 / 2; grid-column: 3 / 4; transform: rotate(45deg);" />
          <img src="/images/transciever/Screw.png" class="screw" style="grid-row: 3 / 4; grid-column: 1 / 2; transform: rotate(98deg);" />
          <img src="/images/transciever/Screw.png" class="screw" style="grid-row: 3 / 4; grid-column: 3 / 4; transform: rotate(18deg);" />
          <div class="screenWrapper" data-tour="screen-wrapper">
            <div class="noiseOverlay"></div>
            <component 
              :is="currentScreenComponent"
              v-bind="screenData"
              :key="currentScreenComponentKey"
              @send-home="resetView">
            </component>
          </div>
          <div class="screenLabel">
            ny.vrs.10
          </div>
        </div>
        <div class="punchOuts">
          <img src="/images/transciever/PunchOuts.png" />
        </div>
        <div class="controlsContainer">
          <keypad @key-press="handleKeyPress" @backspace="handleBackspace" @enter="handleEnter" :isNum="isNum"></keypad>
          <div class="rightRail">
            <div class="dial" @click="dialClick" data-tour="keyboard-dial" :class="isNum ? 'numerals' : 'letters'">
              <img src="/images/transciever/Dial.png" alt="">
              <div class="label">Let</div>
              <div class="label">Num</div>
              <div class="indicator"></div>
            </div>
            <div class="locationButton" @click="handleRelayLocation"  data-tour="location-relay">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.08578L16.7953 5.88107L15.3811 7.29528L13 4.91421V9.62602C14.7252 10.0701 16 11.6362 16 13.5C16 14.0647 15.8825 14.6032 15.6707 15.0913L20 19.1801V16.3616H22V22.5H15.8102V20.5H18.4848L14.434 16.6743C13.7602 17.1915 12.9161 17.5 12 17.5C11.0839 17.5 10.2398 17.1915 9.56599 16.6743L5.51523 20.5H8.18976V22.5H2V16.3616H4V19.1801L8.32932 15.0913C8.11751 14.6032 8 14.0647 8 13.5C8 11.6362 9.27477 10.0701 11 9.62602V4.91421L8.61893 7.29528L7.20472 5.88107L12 1.08578ZM12 11.5C10.8954 11.5 10 12.3954 10 13.5C10 13.9456 10.1446 14.3546 10.3897 14.6864C10.7556 15.1819 11.3406 15.5 12 15.5C12.6594 15.5 13.2444 15.1819 13.6103 14.6864C13.8554 14.3546 14 13.9456 14 13.5C14 12.3954 13.1046 11.5 12 11.5Z"/>
              </svg>
              Relay <br/> Location
            </div>
            <div class="cordContainer">
              <img src="/images/transciever/Cord.png" class="cord" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="edge"></div>
    </div>
  </div>
  <VTour :steps="tourSteps" name="device-tour" ref="tour" :options="tourOptions" />
</template>

<script setup>
import { ref, shallowRef, computed } from 'vue';
import { useActiveOperationStore } from '~/stores/activeOperation';
import { useUnlockedStore } from '~/stores/unlocked';
import { useGeofencing } from '~/composables/useGeofencing';
import operationsIndex from '~/components/operationsIndex.vue';
import relayLocation from '~/components/relayLocation.vue';
import locationNotFound from '~/components/locationNotFound.vue';
import locationFound from '~/components/locationFound.vue';
import missionsPrinting from '~/components/missionsPrinting.vue';
import codeAccepted from '~/components/codeAccepted.vue';
import cheatCodeInput from '~/components/cheatCodeInput.vue';
import cipher from '~/components/cipher.vue';
import { useOperationsStore } from '~/stores/operationsStore';
import { useScreenStore } from '~/stores/screenStore'; 
import { useFirstRunStore } from '~/stores/firstRunStore';


const { $event } = useNuxtApp();

const activeOperationStore = useActiveOperationStore();
const operationsStore = useOperationsStore();
const unlockedStore = useUnlockedStore();
const screenStore = useScreenStore();
const firstRunStore = useFirstRunStore();
const { isRelayingLocation, locations, isWithinGeofence, errorMessage, checkLocation, clearError } = useGeofencing();

const isNum = ref(true);
const code = ref('');
const cheatCode = ref('');
const currentScreenComponent = computed(() => screenStore.currentScreenComponent);
const screenTimeoutRef = ref(null);

const props = defineProps({
  'isPeeking': Boolean
});
const isPeeking = computed(() => props.isPeeking);

const operationsQuery = queryContent('operations')
const operations = await operationsQuery.find()
const filteredOperations = computed(() => operations.filter(operation => !operation.hidden));
const activeOperation = computed(() => {
  return operations.find(op => op.id === activeOperationStore.activeOperationId)
})
const screenData = computed(() => ({
  operations: filteredOperations.value,
  activeOperation: activeOperation.value,
  code: code.value,
  cheatCode: cheatCode.value,
}));

const currentScreenComponentKey = ref(0);

const lightBulbState = computed(() => {
  if (screenStore.currentScreenComponent === operationsIndex) {
    return 'off';
  }
  if (screenStore.currentScreenComponent === relayLocation) {
    return 'blinking';
  }
  if (screenStore.currentScreenComponent === locationFound) {
    return 'on';
  }
  if (screenStore.currentScreenComponent === locationNotFound) {
    return 'on';
  }
  if (screenStore.currentScreenComponent === missionsPrinting) {
    return 'blinking';
  }
  if (screenStore.currentScreenComponent === cheatCodeInput) {
    return 'blinking';
  }
  if (screenStore.currentScreenComponent === cipher) {
    return 'on';
  }
  if (isPeeking.value) {
    return 'blinking';
  }
});

function dialClick() {
  isNum.value = !isNum.value;
}

let lightTimeout = null;
function lightClick() {
  if (lightTimeout) {
    clearTimeout(lightTimeout);
    lightTimeout = null;
    screenStore.setScreen(cheatCodeInput);
  } else {
    lightTimeout = setTimeout(() => {
      lightTimeout = null;
    }, 200);  // Mimics debouncing user input
  }
}

let batteryTimeout = null;
function batteryClick() {
  if (batteryTimeout) {
    clearTimeout(batteryTimeout);
    batteryTimeout = null;
    screenStore.setScreen(operationsIndex);
    activeOperationStore.setActiveOperationId(null);
  } else {
    batteryTimeout = setTimeout(() => {
      batteryTimeout = null;
    }, 200);  // Mimics debouncing user input
  }
}

async function handleRelayLocation() {
  screenStore.setScreen(relayLocation);
  await checkLocation().then(async () => {
    if (isWithinGeofence.value) {
      console.log('Location found:', isWithinGeofence.value);
      activeOperationStore.setActiveOperationId(isWithinGeofence.value.id);
      screenStore.setScreen(locationFound);
      screenTimeoutRef.value = setTimeout(async () => {
        screenStore.setScreen(cipher);
        if (!firstRunStore.firstCheckpointFound) {
          firstRunStore.markFirstCheckpointAsFound(true);
          tourSteps.value = [
            {
              target: "[data-tour='screen-wrapper']",
              body: "You’ve found your first rendezvous and unlocked your first cipher. Congrats!",
            },
            {
              target: "[data-tour='location-relay']",
              body: "Solve the cipher using information from your nearby surroundings to unlock the missions",
            },
            {
              target: "[data-tour='keyboard-dial']",
              body: "Use this dial to switch between letters and numbers.",
            },
            {
              target: "[data-tour='location-relay']",
              body: "If you get stuck, hit this for a hint. If you get  really stuck, hit up HQ for support.",
            }
          ];
          tour.value?.resetTour();
        }
      }, 4000);
    } else {
      screenStore.setScreen(locationNotFound);
      screenTimeoutRef.value = setTimeout(() => {
        screenStore.setScreen(operationsIndex);
      }, 4000);
    }
  });
}

function handleKeyPress(character, isOverride = false) {
  if (screenStore.currentScreenComponent === cheatCodeInput && !isNum.value) {
    $event.$emit('shakeInput');
    return;
  } else if (screenStore.currentScreenComponent === cheatCodeInput) {
    if (cheatCode.value.length >= 6 && !isOverride) {
      return;
    } else if (isOverride) {
      cheatCode.value = cheatCode.value.slice(0, -1) + character;
    } else {
      cheatCode.value += character;
    }
  } else if (activeOperation.value && screenStore.currentScreenComponent === cipher) {
    const maxCodeLength = activeOperation.value.code.length;
    if (code.value.length >= maxCodeLength && !isOverride) {
      return;
    } else if (isOverride) {
      code.value = code.value.slice(0, -1) + character;
    } else {
      code.value += character;
    }
  }
}

const handleBackspace = () => {
  if (screenStore.currentScreenComponent === cheatCodeInput) {
    if (cheatCode.value.length > 0) {
      cheatCode.value = cheatCode.value.slice(0, -1);
    }
  }
  if (screenStore.currentScreenComponent === cipher) {
    if (code.value.length > 0) {
      code.value = code.value.slice(0, -1);
    }
  }
};

const handleEnter = () => {
  if (currentScreenComponent.value === cheatCodeInput) {
    const matchingOperationId = operations.find(op => op['cheat-code'] == cheatCode.value)?.id;
    if (matchingOperationId) {
      activeOperationStore.setActiveOperationId(matchingOperationId);
      screenStore.setScreen(locationFound)
      screenTimeoutRef.value = setTimeout(() => {
        screenStore.setScreen(cipher)
        cheatCode.value = '';
        if (!firstRunStore.firstCheckpointFound) {
          firstRunStore.markFirstCheckpointAsFound(true);
          tourSteps.value = [
            {
              target: "[data-tour='screen-wrapper']",
              body: "You’ve found your first rendezvous and unlocked your first cipher. Congrats!",
            },
            {
              target: "[data-tour='location-relay']",
              body: "Solve the cipher using information from your nearby surroundings to unlock the missions",
            },
            {
              target: "[data-tour='keyboard-dial']",
              body: "Use this dial to switch between letters and numbers.",
            },
            {
              target: "[data-tour='location-relay']",
              body: "If you get stuck, hit this for a hint. If you get  really stuck, hit up HQ for support.",
            }
          ];
          tour.value?.resetTour();
        }
      }, 4000);
    } else {
      cheatCode.value = '';
      $event.$emit('shakeInput');
    }
  }
  if (currentScreenComponent.value === cipher) {
    if (activeOperation.value) {
      var currentCode = code.value.toLowerCase();
      var accessCode = activeOperation.value.code.toLowerCase();
      if (currentCode === accessCode) {
        screenStore.setScreen(codeAccepted);
        screenTimeoutRef.value = setTimeout(() => {
          unlockedStore.unlockOperation(activeOperation.value.id);
          screenStore.setScreen(missionsPrinting);
          screenTimeoutRef.value = setTimeout(() => {
            screenStore.setScreen(operationsIndex)
            activeOperationStore.setActiveOperationId(null);
          }, 4000);
        }, 4000);
      } else {
        code.value = '';
        $event.$emit('shakeInput');
      }
    }
  }
};

  const resetView = () => {
    console.log('resetting view');
    screenStore.setScreen(operationsIndex);
    activeOperationStore.setActiveOperationId(null);
    code.value = '';
    cheatCode.value = '';
    clearTimeout(screenTimeoutRef.value);
  }

  const tour = ref(null);

  const tourSteps = ref([
    {
      target: "[data-tour='screen-wrapper']",
      body: "Solve these clues to the location of a rendezvous and go to there",
    },
    {
      target: "[data-tour='location-relay']",
      body: "Relay your location at when at the rendezvous to unlock the cipher",
      popperConfig: {
        placment: 'left'
      }
    }
  ]);
  const tourOptions = ref({
    labels: {
      buttonNext: "Next up"
    }
  })

  //watch for $event.startTour and start tour
  $event.$on('startTour', () => {
    if (firstRunStore.isFirstRun) {
      tour.value?.startTour();
    }
  });
</script>

<style lang="scss" scoped>
  .deviceContainer {
    width: 100%;
    height: 100%;
    background-color: #000000;
  }
  .deviceWrapper {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: minmax(20px,40px) 1fr;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-left: 6vw;
    padding-right: 6vw;
    grid-row: 1 / 2;
    grid-column: 1/-1;
    gap: 20px;
  }
  .body {
    grid-row: 2/3;
    grid-column: 1/-1;
    z-index: 10;
    border-radius: 24px;
    background: linear-gradient(166deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%), url('/assets/images/HammeredMetalSeamlessTile.png');
    background-blend-mode: overlay, overlay, normal;
    background-size: cover, cover, 200px;
    background-repeat: no-repeat, no-repeat, repeat;
    box-shadow: 0px 0px 40px 0px rgba(255, 255, 255, 0.15) inset;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto min-content;
    min-width: 0px;
    min-height: 0px;
    overflow: hidden;
  }
  .edge {
    grid-row: 2/3;
    grid-column: 1/-1;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), url('/assets/images/HammeredMetalSeamlessTile.png');
    background-blend-mode: overlay, normal;
    z-index: 9;
    border-radius: 24px 24px 0px 0px;
  }
  .battery {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    img {
      height: 100%;
      display: block;
      max-width: 220px;
    }
  }
  .screenContainer {
    grid-row: 1 / 2;
    grid-column: 1/-1;
    background-color: red;
    border-radius: 18px;
    margin: 10px;
    overflow: hidden;
    background: linear-gradient(0deg, rgba(246, 246, 246, 0.80) 0%, rgba(246, 246, 246, 0.80) 100%), url('/assets/images/BrushedMetalBlackBackground.jpeg');
    background-blend-mode: overlay, normal;
    background-size: cover, cover;
    box-shadow: 12px 12px 32px 0px #000 inset;
    display: grid;
    padding: 10px;
    grid-template-columns: 26px 1fr 26px;
    grid-template-rows: 26px 1fr 26px;
    overflow: hidden;  /* NEW */
    min-width: 0;
  }
  .screw {
    height: 100%;
    width: 100%;
  }
  .screenWrapper {
    grid-row: 1 / 3;
    grid-column: 1 / -1;
    background-color: #94AE32;
    margin-bottom: 10px;
    border-radius: 50% 50% 10px 10px / 30% 30% 10px 10px;
    box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.45) inset;
    position: relative;
    overflow: hidden;
  }
  .noiseOverlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: url('/assets/images/NoiseTextureSeamless.jpg');
    mix-blend-mode: color-burn;
    background-size: 200px;
    z-index: 1;
    pointer-events: none;
  }

  .screenContent {
    mix-blend-mode: multiply;
    filter: drop-shadow(0px 7px 11px #000000);
  }
  .screenLabel {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    color: #ffffff;
    opacity: .6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Eurostile';
    font-weight: 500;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 1px;

  }
  .light {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .bulb {
    height: 10px;
    width: 20px;
    border-radius: 10px 10px 0 0;
    background: radial-gradient(50% 50% at 50% 50%, #FC9B9B 0%, #FF4646 80%);

    .isOff & {
      background: radial-gradient(50% 50% at 50% 50%, #BA5E5E 0%, #552828 80%);
    }

    .isOn & {
      background: radial-gradient(50% 50% at 50% 50%, #FC9B9B 0%, #FF4646 80%);
    }
    .isBlinking & {
      animation: bulbBlinking 1s infinite steps(2);
    }
  }
  @keyframes bulbBlinking {
    from {
      background: radial-gradient(50% 50% at 50% 50%, #BA5E5E 0%, #552828 80%);
    }
    to {
      background: radial-gradient(50% 50% at 50% 50%, #FC9B9B 0%, #FF4646 80%);
    }
  }
  @keyframes glowBlinking {
    from {
      opacity: 0;
    }
    to {
      opacity: .6;
    }
  }

  .base {
    height: 5px;
    width: 30px;
    border-radius: 5px 5px 0 0;
    background: radial-gradient(53.82% 53.82% at 50% 46.15%, #A7A7A7 58.46%, #757575 100%);
  }
  .glow {
    position: absolute;
    height: 120px;
    width: 120px;
    border-radius: 100%;
    background-color: #FF2F2F;
    opacity: 0.3;
    filter: blur(27px);
    top: -40px;
    .isOff & { 
      opacity: 0;
    }
    .isBlinking & {
      animation: glowBlinking 1s infinite steps(2);
    }
  }
  .punchOuts {
    grid-row: 2/3;
    grid-column: 1/-1;
    text-align: center;
    img {
      max-width: 100%;
      padding: 0 10px;
    }

    @media (min-height: 800px) {
      display: block;
    }
    display: none;
  }
  .controlsContainer {
    display: grid;
    grid-row: 3/4;
    grid-column: 1/-1;
    grid-template-columns: 2fr minmax(auto, 100px);
    padding: 15px;
    gap: 15px;
  }
  .rightRail {
    grid-column: 2/3;
    display: grid;
    grid-template-rows: 3fr 2fr 1fr;
    gap: 15px;
  }
  .dial {
    position: relative;
    color: white;
    display: flex;
    justify-content: space-between;
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    font-size: 8px;
    letter-spacing: 1px;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .label {
      mix-blend-mode: difference;
    }

    &.numerals {
      .indicator {
        transform: rotate(30deg);
      }
    }
    &.letters {
      .indicator {
        transform: rotate(-30deg);
      }
    }
  }
  .indicator {
    position: absolute;
    aspect-ratio: 1 / 1;
    width: 100%;
    border-radius: 100%;
    transform: rotate(30deg);
    transition-duration: 500ms;

    &:before {
      content: '';
      position: absolute;
      height: 10px;
      width: 10px;
      background-color: white;
      display: block;
      left: 50%;
      transform: translate(-50%, 10px);
      border-radius: 50%;
    }
  }
  .locationButton {
    width: 80%;
    height: 100%;
    justify-self: center;
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Eurostile';
    font-weight: 700;
    text-transform: uppercase;
    font-size: 8px;
    line-height: 12px;
    letter-spacing: 1px;
    text-align: center;
    gap: 6px;
    color: #C3C3C3;
    fill: #C3C3C3;
    border-radius: 12px;
    background: linear-gradient(138deg, rgba(255, 255, 255, 0.10) 3.36%, rgba(255, 255, 255, 0.00) 96.99%), url('/assets/images/PlasticTextureTile.png');
    background-repeat: no-repeat, repeat;
    background-size: cover, 200px;
    box-shadow: -4px -4px 4px 2px rgba(0, 0, 0, 0.45), 4px 4px 12px 2px rgba(255, 255, 255, 0.10), 4px 4px 8px 0px rgba(255, 255, 255, 0.20) inset, -4px 4px 4px 0px rgba(0, 0, 0, 0.65) inset;
  }
  .cordContainer {
    position: relative;
  }
  .cord {
    position: absolute;
    height: 300%;
    left: 64%;
    transform: translate(-25%, 10%);
    bottom: 0;
    pointer-events: none;
  }
  .isPeeking {
    position: relative;
    z-index: 10;
  }
</style>