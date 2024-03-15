<template>
  <div>
    <h1>XEM LIVE</h1>
    <img :src="imageSrc" alt="" />
  </div>
</template>

<script>
export default {
  name: 'VideoView',
  data() {
    return {
      imageSrc: '',
      WS_URL: 'ws://localhost:8090/wsin',
      ws: null,
    };
  },
  mounted() {
    // Get img DOM element
    const img = this.$el.querySelector('img');
    console.log(img);

    this.imageSrc = img;

    // Create WebSocket connection
    this.ws = new WebSocket(this.WS_URL);
    this.ws.onopen = () => console.log(`Connected to ${this.WS_URL}`);

    // Update image source when receiving message from WebSocket
    this.ws.onmessage = (message) => {
      this.imageSrc = message.data;
    };
  },
};
</script>

<style scoped>
/* Your component-specific styles here */
</style>
