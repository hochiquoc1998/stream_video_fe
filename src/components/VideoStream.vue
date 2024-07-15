<template>
  <div>
    <video ref="video" autoplay></video>
    <button @click="startCamera">Start Camera</button>
  </div>
</template>

<script>
export default {
  methods: {
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.video.srcObject = stream;
      } catch (error) {
        console.error('Error accessing the camera: ', error);
      }
    },
  },
};
</script>

<style>
video {
  width: 100%;
  height: auto;
}
</style>
