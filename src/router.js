import Vue from 'vue';
import Router from 'vue-router';
import VideoStream from './components/VideoStream.vue';
import VideoView from './components/VideoView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: VideoStream,
    },
    {
      path: '/video-view',
      component: VideoView,
    },
  ],
});
