<template>
  <div class="deep-parent">
    <deep-child @click="e => onClick()"/>
  </div>
</template>
<script>
import deepChild from './deep-child';

export default {
  name : 'deep-parent',
  components : { deepChild },
  methods : {
    onClick(){}
  }
}
</script>
