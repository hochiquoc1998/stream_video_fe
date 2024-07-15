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
      WS_URL: 'ws://localhost:8090/wsout/user1',
      FPS: 12,
      ws: null,
      currentUser: 'user1', // Thêm biến để lưu trữ thông tin người dùng hiện tại
    };
  },
  mounted() {
    // Get video DOM element
    const video = this.$refs.video;

    // Request access to webcam
    navigator.mediaDevices
      .getUserMedia({ video: { width: 426, height: 240 } })
      .then((stream) => {
        video.srcObject = stream;

        // Create WebSocket connection with user-specific information
        this.ws = new WebSocket(`${this.WS_URL}`);

        // Send frames at specified FPS
        this.ws.onopen = () => {
          setInterval(() => {
            this.ws.send(this.getFrame());
          }, 1000 / this.FPS);
        };
      });
  },
  methods: {
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
