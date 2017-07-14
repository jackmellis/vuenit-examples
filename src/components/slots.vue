<template>
  <div class="generic-component">
    <slot name="header">
      <h1>{{header}}</h1>
    </slot>
    <slot>
      <div id="default_content">Content</div>
    </slot>
    <slot name="footer">
      <h5>{{footer}}</h5>
    </slot>
  </div>
</template>
<script>
export default {
  name : 'slots',
  props : ['header', 'footer']
}
</script>
