<template>
  <button class="deep-child" @click="$emit('click')">
    {{stuff}}
  </button>
</template>
<script>
export default {
  name : 'deep-parent',
  data(){
    return {
      stuff : null
    };
  },
  created(){
    // the child depends on $http being attached to the instance
    // if it hasn't been set up, it will fail to be created
    this.$http.get('/some-data')
      .then(response => {
        this.stuff = response.data;
      });
  }
}
</script>
