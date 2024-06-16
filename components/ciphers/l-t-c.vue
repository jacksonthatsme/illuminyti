<template>
  <div class="screen">
    <div class="homeButton" @click="handleHomePress">
      <svg width="66" height="72" viewBox="0 0 66 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 39H18V33H21V39Z" fill="#5E5940"/>
        <path d="M24 42H21V39H24V42Z" fill="#5E5940"/>
        <path d="M27 48H24V42H27V48Z" fill="#5E5940"/>
        <path d="M27 48H30V51H27V48Z" fill="#5E5940"/>
        <path d="M26.9522 62.339H26.3351V63.2609H26.9522V64.4724H27.5694V65.0895H28.457V64.4724H29.0742V63.2609H29.6913V62.339H29.0742V61.1276H28.457V60.5105H27.5694V61.1276H26.9522V62.339Z" fill="#5E5940"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 0V3H15V6H12V9H9V12H6V15H3V21H0V33H3V36H6V39H9V42H12V45H15V48H18V51H21V54H12V72H54V54H45V51H48V48H51V45H54V42H57V39H60V36H63V33H66V21H63V15H60V12H57V9H54V6H51V3H45V0H21ZM48 33H51V30H57V33H60V36H57V39H54V42H51V45H48V48H45V51H42V54H36V51H39V48H42V42H45V39H48V33ZM18 33H15V30H9V33H6V36H9V39H12V42H15V45H18V48H21V51H24V54H30V51H36V48H39V42H42V39H45V33H48V27H45V24H21V27H18V33ZM17.6872 58.3238H15.5234V67.2762H17.6872V64.2019H19.8206V67.2762H22.0072V58.3238H19.8206V62.0152H17.6872V58.3238ZM24.1484 64.819V60.7809H24.7656V59.5581H25.3827V58.9409H25.9999V58.3238H30.0265V58.9409H30.6322V59.5581H31.2494V60.7809H31.8665V64.819H31.2494V66.0419H30.6322V66.659H30.0265V67.2762H25.9999V66.659H25.3827V66.0419H24.7656V64.819H24.1484ZM36.2003 58.3238H34.0137V67.2762H36.2003V63.5847H36.4822V64.819H37.0994V66.0305H39.2861V64.819H39.9032V63.5847H40.1851V67.2762H42.3718V58.3238H40.1851V58.9409H39.568V60.1752H38.9508V61.3981H38.3337V62.6324H38.0518V61.3981H37.4346V60.1752H36.8175V58.9409H36.2003V58.3238ZM51.0109 58.3238H44.5156V67.2762H51.0109V65.0895H46.7023V63.5847H50.3937V61.3981H46.7023V60.5105H51.0109V58.3238Z" fill="#5E5940"/>
      </svg>
    </div>
    <div class="hint">
      Locate the marked lock box to collect the 10 point mission. The code is the year of our glorious founding.
    </div>
    <div class="asterisk">
      *Please close and reset the lock when you’re done
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    inputCount: Number,
    code: String
  })

  //define emit
  const emit = defineEmits(['homePress'])

  const handleHomePress = () => {
    console.log('home press')
    emit('homePress')
  }
</script>

<style lang="scss" scoped>
  .screen {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    mix-blend-mode: multiply;
    font-family: 'Offbit';
  }
  .tag {
    font-size: 20px;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: .1em;
  }
  .hint {
    font-size: 24px;
    line-height: 1.2;
    text-align: center;
  }
  .asterisk {
    font-size: 18px;
    line-height: 1;
    text-align: center;
  }
</style>