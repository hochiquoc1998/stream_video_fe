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
        let backCamera = null;

        devices.forEach((device) => {
          if (
            device.kind === 'videoinput' &&
            device.label.toLowerCase().includes('back')
          ) {
            backCamera = device.deviceId;
          }
        });

        const constraints = {
          video: {
            deviceId: backCamera ? { exact: backCamera } : undefined,
            facingMode: backCamera ? undefined : { exact: 'environment' },
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
