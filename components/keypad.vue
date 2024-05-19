<template>
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
    <keypad-button :keySub="'ent'" @click="handleEnter">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0002 12.5V4H20.0002V14.5H9.00015V18.9142L3.58594 13.5L9.00015 8.08579V12.5H18.0002Z" />
      </svg>
    </keypad-button>
  </div>
</template>
<script setup>
  const props = defineProps({isNum: Boolean})
  const emit = defineEmits(['keyPress', 'backspace', 'enter'])
  const keyPresses = new Map()
  const lastKeyPressed = ref(null) // Keep track of the last key pressed
  const resetKeypressesTimeout = ref(null)
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
  }
  // const handleKeyPress = (key) => {
  //   if (props.isNum) {
  //     emit('keyPress', key);
  //     return;
  //   }

  //   const currentKeyIndex = keyPresses.get(key) || 0;
  //   const nextIndex = (currentKeyIndex + 1) % keyMappings[key].length;
  //   keyPresses.set(key, nextIndex);

  //   const character = keyMappings[key][currentKeyIndex];

  //   clearTimeout(resetKeypressesTimeout);
  //   resetKeypressesTimeout.value = setTimeout(() => {
  //     keyPresses.clear();
  //     // Emit a clear signal to reset state in device.vue
  //     emit('keyPress', '');
  //   }, 800);

  //   emit('keyPress', character, true); // Emit with override flag
  // }

  const handleKeyPress = (key) => {
    console.log('keyPressed')
    if (props.isNum) {
      emit('keyPress', key);
      console.log('Number keyPress emitted')
      return;
    } else {
      const currentKeyIndex = keyPresses.get(key) || 0;
      const nextIndex = (currentKeyIndex + 1) % keyMappings[key].length;
      keyPresses.set(key, nextIndex);

      const character = keyMappings[key][currentKeyIndex];

      if (character) {
        if (lastKeyPressed.value === key) {
          // Replace the last character (mutable character) if the same key is pressed
          // code.value = code.value.slice(0, -1) + character;
          // console.log('emit with override flag')
          emit('keyPress', character, true); // Emit with override flag
        } else {
          // Add a new character if a different key is pressed or if it's the first character
          
          // code.value += character;
          // console.log('emit without override flag')
          emit('keyPress', character)
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
    emit('backspace');
  }

  const handleEnter = () => {
    emit('enter');
  }
</script>
<style lang="scss" scoped>
  .keypad {
    grid-column: 1/2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 64px;
    grid-gap: 8px 12px;
  }
</style>