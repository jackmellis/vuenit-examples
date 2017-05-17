<template>
  <div class="create-a-thing-form">
    <!-- User enters a name for their new thing here -->
    <label for="name">Enter a Name for your new thing:</label>
    <input id="name" type="text" v-model="name">
    <!-- User clicks this button which creates a new thing -->
    <button @click="submit">Create it!</button>
  </div>
</template>
<script>
// note that $http would have been injected into the component somehow, either by using a vue plugin, or setting Vue.prototype.$http, or using provide/inject, or a DI library like vue-inject
export default {
  name : 'create-a-thing',
  data(){
    return {
      name : ''
    };
  },
  methods : {
    submit(){
      // send an ajax request to create a new thing on the backend
      // the backend will return the fully-created thing
      return this.$http.post('/thing-creator', { name : this.name })
        .then(response => {
          let newThing = response.data;
          // send a dispatch request to the store to add the new thing to our state object
          return this.$store.dispatch('things/addThing', newThing);
        })
        .then(thing => {
          // once we've finished, let's navigate to the new thing's page
          this.$router.push('/things/' + thing.id);
        });
    }
  }
}
</script>
