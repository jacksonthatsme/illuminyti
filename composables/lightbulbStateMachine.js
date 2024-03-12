import { ref } from 'vue';

export const useLightbulbStateMachine = (initialState = 'off') => {
  const ElementState = {
    OFF: 'off',
    ON: 'on',
    BLINKING: 'blinking',
  };

  const transitions = {
    [ElementState.OFF]: {
      turnOn: ElementState.ON,
      startBlink: ElementState.BLINKING,
    },
    [ElementState.ON]: {
      turnOff: ElementState.OFF,
      startBlink: ElementState.BLINKING,
    },
    [ElementState.BLINKING]: {
      turnOff: ElementState.OFF,
    },
  };

  const currentState = ref(initialState);

  const getState = () => {
    return currentState.value;
  };

  const setState = (nextState) => {
    if (transitions[currentState.value][nextState]) {
      currentState.value = transitions[currentState.value][nextState];
    } else {
      console.warn('Invalid state transition:', nextState, 'from', currentState.value);
    }
  };

  const turnOn = () => {
    setState(ElementState.ON);
  };

  const turnOff = () => {
    setState(ElementState.OFF);
  };

  const startBlink = () => {
    setState(ElementState.BLINKING);
  };

  return { getState, turnOn, turnOff, startBlink };
};
