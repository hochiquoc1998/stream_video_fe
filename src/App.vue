<template>
  <div id="app">
    <VideoStream />

    <hr />
    <VideoView />
  </div>
</template>

<script>
import VideoStream from './components/VideoStream.vue';
import VideoView from './components/VideoView.vue';

export default {
  name: 'App',
  components: {
    VideoStream,
    VideoView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
