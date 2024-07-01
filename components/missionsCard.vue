<template>
  <div class="missionsCard">
    <div class="missionBlock" v-for="(mission, index) in props.missions" :key="index">
      <div class="label">
        <div class="type">
          {{ missionLabel(mission) }}
        </div>
        <div class="points">
          {{ mission.points }} Point<template v-if="mission.points > 1">s</template>
        </div>
      </div>
      <div class="missionContent" :ref="setMissionContentRefs"><p>{{ mission.content }}</p></div>
    </div>
    <div class="emblemOverlay"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch, computed } from 'vue';
import { useResizeText } from '~/composables/useResizeText'; // Import the composable

const props = defineProps(['missions']);
const missionContentRefs = reactive([]);

// Use the composable
const { resizeText } = useResizeText({ maxSize: 24, minSize: 12 });

const missionLabel = computed(() => {
  return (mission) => {
    const points = mission.points;
    if (points === 1) {
      return 'Reconaissance';
    } else if (points === 2) {
      return 'Infiltration';
    } else if (points === 3) {
      return 'Propaganda';
    } else {
      return 'Mission';
    }
  }
});

const setMissionContentRefs = (el) => {
  if (el && !missionContentRefs.includes(el)) {
    missionContentRefs.push(el);
  }
};

const runResizeText = () => {
  nextTick(() => {
    if (missionContentRefs.length) {
      console.log('runningResizeText');
      resizeText({ elements: missionContentRefs });
    }
  });
};

onMounted(runResizeText);

// Watch for changes in missions and rerun resizeText
watch(() => props.missions, () => {
  missionContentRefs.length = 0; // Reset the refs array
  nextTick(runResizeText);
}, { immediate: true });
</script>

<style lang="scss" scoped>
  .missionsCard {
    height: 100%;
    width: 100%;
    // display: grid;
    // grid-auto-rows: minmax(0, 1fr);
    display: flex;
    flex-direction: column;
    padding: 30px 10px;
    border-image-source: url('/assets/images/missionBG.png');
    border-image-slice: 25 30 fill;
    border-width: 8px;
    border-image-repeat: stretch;
    border-style: solid;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: perspective(999px);
    transform: perspective(999px);
    font-family: 'Eurostile';
    position: relative;
  }
  .missionBlock {
    border-bottom: 1px solid #272727;
    border-right: 1px solid #272727;
    border-left: 1px solid #272727;
    color: #1C1C1C;
    flex: 1;
    overflow: hidden;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;

    &:first-child {
      border-top: 1px solid #272727;
    }
  }
  .label {
    display: flex;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px; 
  }
  .type {
    padding: 10px 8px 8px 8px;
    background-color: #272727;
    color: #E7E5D9;
    font-weight: 700;
  }
  .points {
    padding: 10px 8px 8px 8px;
    border-bottom: 1px solid #272727;
    border-right: 1px solid #272727;
    border-left: 1px solid #272727;
    font-weight: 300;
  }
  .missionContent {
    padding: 16px 16px;
    font-size: 20px;
    line-height: 24px;
    font-weight: 300;
    text-transform: none;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }
  .emblemOverlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url('/assets/images/emblem-overlay.png');
    background-size: 80% auto;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
