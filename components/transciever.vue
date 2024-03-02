
<template>
  <div class="container">
    <div class="wrapper">
      <div class="top">
        <div class="light">
          <div class="bulb"></div>
          <div class="base"></div>
          <div class="glow"></div>
        </div>
        <div class="battery">
          <img src="/images/transciever/BatteryCoil.png" />
        </div>
      </div>
      <div class="body">
        <div class="screenContainer">
          <img src="/images/transciever/Screw.png" class="screw" style="grid-row: 1 / 2; grid-column: 1 / 2;" />
          <img src="/images/transciever/Screw.png" class="screw" style="grid-row: 1 / 2; grid-column: 3 / 4; transform: rotate(45deg);" />
          <img src="/images/transciever/Screw.png" class="screw" style="grid-row: 3 / 4; grid-column: 1 / 2; transform: rotate(98deg);" />
          <img src="/images/transciever/Screw.png" class="screw" style="grid-row: 3 / 4; grid-column: 3 / 4; transform: rotate(18deg);" />
          <div class="screenWrapper">
            <screen-content :code="code"></screen-content>
          </div>
          <div class="screenLabel">
            Transciever
          </div>
        </div>
        <div class="punchOuts">
          <img src="/images/transciever/PunchOuts.png" />
        </div>
        <div class="controlsContainer">
          <div class="keypad">
            <template v-for="(characters, key) in keyMappings" :key="key">
              <keypad-button :keySub="characters.join('')" @click="handleKeyPress(key)">
                {{ key }}
              </keypad-button>
            </template>
            <keypad-button :keySub="'del'" @click="handleBackspace">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.62939 4C6.99463 4 6.39893 4.30133 6.02002 4.81198L1.59033 10.812C1.06885 11.5182 1.06885 12.4818 1.59033 13.188L6.02002 19.188C6.39893 19.6987 6.99463 20 7.62939 20H19.7134C20.8188 20 21.7134 19.1046 21.7134 18V6C21.7134 4.89542 20.8188 4 19.7134 4H7.62939ZM9.35986 8.35355L13.0063 12L9.35986 15.6465L10.0669 16.3536L13.7134 12.7071L17.3599 16.3536L18.0669 15.6465L14.4204 12L18.0669 8.35355L17.3599 7.64645L13.7134 11.2929L10.0669 7.64645L9.35986 8.35355Z"/>
              </svg>
            </keypad-button>
            <keypad-button @click="handleKeyPress(0)">0</keypad-button>
            <keypad-button :keySub="'ent'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0002 12.5V4H20.0002V14.5H9.00015V18.9142L3.58594 13.5L9.00015 8.08579V12.5H18.0002Z" />
              </svg>
            </keypad-button>
          </div>
          <div class="rightRail">
            <div class="dial" @click="dialClick" :class="isNum ? 'numerals' : 'letters'">
              <img src="/images/transciever/Dial.png" alt="">
              <div class="label">Let</div>
              <div class="label">Num</div>
              <div class="indicator"></div>
            </div>
            <div class="locationButton" @click="handleRelayLocation">
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
</template>
<script setup>
  import { ref } from 'vue'
  const resetKeypressesTimeout = ref(null);
  import { useGeofencing } from '~/composables/useGeofencing'
  const { isRelayingLocation, locations, isWithinGeofence, errorMessage, checkLocation } = useGeofencing()

  function dialClick() {
    isNum.value = !isNum.value
  }

  function handleRelayLocation() {
    console.log("relay location")
    checkLocation()
  }

  watch(isWithinGeofence, (newValue, oldValue) => {
  if (newValue) {
    console.log(`User is now within geofence: ${newValue.id}`);
    // Perform actions based on the specific location ID
  } else if (oldValue) {
    console.log('User exited the geofence.');
  }
}, { immediate: true });

  const keyMappings = {
    '1': ['a', 'b', 'c'],
    '2': ['d', 'e', 'f'],
    '3': ['g', 'h', 'i'],
    '4': ['j', 'k', 'l'],
    '5': ['m', 'n', 'o'],
    '6': ['p', 'q', 'r'],
    '7': ['s', 't', 'u'],
    '8': ['v', 'w', 'x'],
    '9': ['y', 'z'],
  };

  const isNum = ref(false);
  const code = ref('');
  const keyPresses = new Map();
  const lastKeyPressed = ref(null); // Keep track of the last key pressed


  const handleKeyPress = (key) => {
    if (isNum.value) {
      code.value += key;
    } else {
      const currentKeyIndex = keyPresses.get(key) || 0;
      const nextIndex = (currentKeyIndex + 1) % keyMappings[key].length;
      keyPresses.set(key, nextIndex);

      const character = keyMappings[key][currentKeyIndex];

      if (character) {
        if (lastKeyPressed.value === key) {
          // Replace the last character (mutable character) if the same key is pressed
          code.value = code.value.slice(0, -1) + character;
        } else {
          // Add a new character if a different key is pressed or if it's the first character
          code.value += character;
        }
      }

      // Update the last key pressed
      lastKeyPressed.value = key;

      // Clear existing timeout
      clearTimeout(resetKeypressesTimeout.value);
      // Set a new timeout to reset the key presses
      resetKeypressesTimeout.value = setTimeout(() => {
        keyPresses.clear();
        lastKeyPressed.value = null; // Reset the last key pressed
      }, 800);
    }
  };

  const handleBackspace = () => {
    // Ensure there's something to backspace
    if (code.value.length > 0) {
      code.value = code.value.slice(0, -1); // Remove the last character
    }
  };
      

</script>


<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100dvh;
    background-color: #000000;
    overflow-x: hidden;
    overflow-y: visible;
  }
  .wrapper {
    width: 100%;
    height: 100dvh;
    display: grid;
    grid-template-rows: minmax(40px,60px) 1fr;
    // pointer-events: none;
    // user-select: none;
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
    grid-template-rows: 1fr auto min-content;
  }
  .edge {
    grid-row: 2/3;
    grid-column: 1/-1;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), url('/assets/images/HammeredMetalSeamlessTile.png');
    background-blend-mode: overlay, normal;
    z-index: 9;
  }
  .battery {
    flex: 1;
    max-width: 220px;
    img {
      max-width:100%;
      display: block;
      align-self: center;
    }
  }
  .screenContainer {
    grid-row: 1 / 2;
    grid-column: 1/-1;
    background-color: red;
    border-radius: 18px;
    margin: 10px;
    background: linear-gradient(0deg, rgba(246, 246, 246, 0.80) 0%, rgba(246, 246, 246, 0.80) 100%), url('/assets/images/BrushedMetalBlackBackground.jpeg');
    background-blend-mode: overlay, normal;
    background-size: cover, cover;
    box-shadow: 12px 12px 32px 0px #000 inset;
    display: grid;
    padding: 10px;
    grid-template-columns: 26px 1fr 26px;
    grid-template-rows: 26px 1fr 26px;
  }
  .screw {
    height: 100%;
    width: 100%;
  }
  .screenWrapper {
    grid-row: 1 / 3;
    grid-column: 1 / -1;
    background: url('/assets/images/NoiseTextureSeamless.jpg'), #94AE32;
    background-blend-mode: multiply;
    margin-bottom: 10px;
    border-radius: 45% 45% 10px 10px;
    box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.45) inset;
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
    top: -60px;
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
  .keypad {
    grid-column: 1/2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 64px;
    grid-gap: 8px 12px;
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
</style>