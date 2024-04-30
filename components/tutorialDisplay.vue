<template>
  <div class="tutorialWrapper" ref="tutorialDisplay">
    <img :src="props.image" alt="" class="tutorialImage" v-if="props.image">
    <div class="tutorialContent">
      <component v-for="(content,index) in contents" :key="index" :ref="content.id" :id="content.id" :is="content.tag">
      </component> 
    </div>
    <div class="tutorialAction" :id="'cta-' + props.index" @click="actionClick">
    </div>
  </div>
</template>

<script setup>
  const { $gsap, $TextPlugin } = useNuxtApp()
  const props = defineProps(['image', 'cta', 'data','index'])
  const emit = defineEmits(['advance']);
  const tutorialDisplay = ref(null)

  if (process.client) { 
    $gsap.registerPlugin($TextPlugin)
  }

  function actionClick() {
    emit('advance')
  }

  const contents = props.data.body.children.map((tutorial, index) => ({
    tag: tutorial.tag,
    text: tutorial.children[0].value,
    id: tutorial.props.id,
  }))

  const typeIn = $gsap.timeline({paused: true});
  onMounted(() => {
  contents.forEach((content, index) => {
    // Assuming each content will be targeted by its `id`. Ensure IDs are unique and valid selectors.
    const selector = `#${content.id}`;
    // Adjust the duration and ease as needed.
    if (content.id == 'you-have-until-6pm-the-team-with-the-most-points-gets-to-live') {
      typeIn.to(selector, {
        onStart: () => {
          document.querySelector(selector).classList.add('typing-cursor');
        },
        text: content.text,
        duration: content.text.length * 0.1, // Adjust duration as needed
        ease: 'none',
      },"+=1")
      typeIn.to(selector, {
        text: 'You have until 6pm. The team with the most points gets',
        duration: 1, // Adjust duration as needed
        ease: 'none',
      },"+=.5")
      typeIn.to(selector, {
        text: 'You have until 6pm. The team with the most points gets a prize',
        duration: 1, // Adjust duration as needed
        ease: 'none',
        onComplete: () => {
          document.querySelector(selector).classList.remove('typing-cursor');
        }
      },"+=.5")
    } if (content.tag == 'h2') {
      typeIn.to(selector, {
        onStart: () => {
          document.querySelector(selector).classList.add('typing-cursor');
        },
        text: content.text,
        duration: content.text.length * 0.05, // Adjust duration as needed
        onComplete: () => {
          document.querySelector(selector).classList.remove('typing-cursor');
        }
      },"+=1");
    } else {
      typeIn.to(selector, {
        onStart: () => {
          document.querySelector(selector).classList.add('typing-cursor');
        },
        text: content.text,
        duration: content.text.length * 0.1, // Adjust duration as needed
        onComplete: () => {
          document.querySelector(selector).classList.remove('typing-cursor');
        }
      },"+=1");
    }
  });
  typeIn.to(`#cta-${props.index}`, {
    onStart: () => {
      document.querySelector(`#cta-${props.index}`).classList.add('typing-cursor');
    },
    text: props.cta,
    duration: props.cta.length * 0.1, // Adjust duration as needed
    onComplete: () => {
      document.querySelector(`#cta-${props.index}`).classList.remove('typing-cursor');
    }
    }, "+=.5");
})
const buildTypeIn = () => {
  typeIn.play();
}
defineExpose({ buildTypeIn, tutorialDisplay });
</script>

<style lang="scss" scoped>
.tutorialWrapper {
  background-color: black;
  font-family: 'Offbit';
  font-weight: 700;
  text-transform: uppercase;
  height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  padding: 12% 6%;
}

h1 {
  font-size: 22px;
  line-height: 28px;
  letter-spacing: .1rem;
}
h2 {
  font-size: 18px;
  line-height: 26px;
  letter-spacing: .1rem;
}
.tutorialImage {
  grid-row: 1/2;
  height: 80px;
  margin-bottom: 20px;
  &[src*="gif"] {
    width: 100%;
    height: auto;
  }
}

.tutorialAction {
  grid-row: 4/-1;
  font-size: 22px;
  line-height: 28px;
  letter-spacing: .1rem;
}
.typing-cursor::after {
  content: '';
  display: inline-block;
  height: 16px;
  width: 12px;
  background-color: #00E593;
  opacity: 1;
}

h2.typing-cursor::after {
  height: 16px;
  width: 8px;
}
h1 + h1 {
  margin-top: 30px;
}
h1 + h2 {
  margin-top: 30px;
}

h2 + h2 {
  margin-top: 20px;
}

.tutorialWrapper:has(.tutorialContent #here-is-your-tranciever-use-it-to-complete-todays-operation) {
  .tutorialAction {
    padding-bottom: 200px;
  }
}


</style>