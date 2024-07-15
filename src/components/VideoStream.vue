<template>
  <div>
    <video ref="video" autoplay></video>
    <button @click="startCamera">Start Camera</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      WS_URL: 'wss://localhost:8090/wsout/user1',
      FPS: 12,
      ws: null,
      currentUser: 'user1',
    };
  },
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

        let constraints;

        if (backCamera) {
          constraints = {
            video: {
              deviceId: { exact: backCamera },
            },
          };
        } else {
          constraints = {
            video: {
              facingMode: 'user',
            },
          };
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.$refs.video.srcObject = stream;
        this.handleStream(stream);
      } catch (error) {
        console.error('Error accessing the camera: ', error);
      }
    },
    handleStream(stream) {
      const video = this.$refs.video;
      video.srcObject = stream;

      // Create WebSocket connection with user-specific information
      this.ws = new WebSocket(`${this.WS_URL}`);

      // Send frames at specified FPS
      this.ws.onopen = () => {
        setInterval(() => {
          this.ws.send(this.getFrame());
        }, 1000 / this.FPS);
      };
    },
    getFrame() {
      const canvas = document.createElement('canvas');
      const video = this.$refs.video;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const data = canvas.toDataURL('image/png');
      return data;
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
