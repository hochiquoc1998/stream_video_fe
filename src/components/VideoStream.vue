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
        const devices = await navigator.mediaDevices.enumerateDevices();
        let videoSource = null;

        devices.forEach((device) => {
          if (device.kind === 'videoinput') {
            if (device.label.toLowerCase().includes('back')) {
              videoSource = device.deviceId;
            }
          }
        });

        const constraints = {
          video: {
            deviceId: videoSource ? { exact: videoSource } : undefined,
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
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
