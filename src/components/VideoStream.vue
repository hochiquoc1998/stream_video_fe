<template>
  <div>
    <h1>PHÁT LIVE</h1>
    <video ref="video" autoplay></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      WS_URL: 'wss://localhost:8090/wsout/user1',
      FPS: 12,
      ws: null,
      currentUser: 'user1', // Thêm biến để lưu trữ thông tin người dùng hiện tại
    };
  },
  mounted() {
    // Get video DOM element
    const constraints = {
      video: {
        width: 426,
        height: 240,
      },
    };

    this.getCamera({
      ...constraints,
      video: { ...constraints.video, facingMode: { exact: 'environment' } },
    })
      .then((stream) => {
        this.handleStream(stream);
      })
      .catch((error) => {
        console.warn(
          'Rear camera not found, switching to front camera: ',
          error
        );
        this.getCamera({
          ...constraints,
          video: { ...constraints.video, facingMode: 'user' },
        })
          .then((stream) => {
            this.handleStream(stream);
          })
          .catch((err) => {
            console.error('Error accessing any camera: ', err);
          });
      });
  },
  methods: {
    getCamera(constraints) {
      return navigator.mediaDevices.getUserMedia(constraints);
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
    // Returns a frame encoded in base64
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

<style scoped>
/* Your component-specific styles here */
</style>
