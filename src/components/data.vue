<template>
  <div :style="computedStyles">
    Data, Props, and Computed values
    <select v-model="size">
      <option value="sm">Small></option>
      <option value="md">Medium</option>
      <option value="lg">Large</option>
    </select>
  </div>
</template>
<script>
export default {
  name : 'data-component',
  // The theme is passed in as a prop and used by the computedStyles property
  props : ['theme'],
  data(){
    return {
      // size is a data property and can be updated by the user within the component
      size : 'md'
    };
  },
  computed : {
    computedStyles(){
      // returns a style object with a color and width based on both data and props
      const result = {};

      switch(this.theme){
      // These colors are acceptable
      case 'blue':
      case 'green':
      case 'red':
        result.backgroundColor = this.theme;
        break;
      // A dark theme returns a specific hex
      case 'dark':
        result.backgroundColor = '#4d4a4a';
        break;
      // Any other value (including null) defaults to white
      default:
        result.backgroundColor = 'white';
        break;
      }

      switch(this.size){
      case 'sm':
        result.width = '25%';
        break;
      case 'md':
        result.width = '50%';
        break;
      case 'lg':
        result.width = '75%';
        break;
      }

      return result;
    }
  }
}
</script>
