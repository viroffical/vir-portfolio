<template>
  <div class="relative right-0 h-content-window flex flex-col overflow-y-auto bg-white video-container">
    <div class="w-full flex-1 font-trebuchet-pixel flex flex-col">
      <div class="w-full flex-1 overflow-x-hidden flex flex-col">
        <!-- Header -->
        <div>
          <div class="flex items-center gap-5 p-1.5">
            <img src="/img/icons/video-logo.webp" alt="Videos" class="w-24" />
            <div>
              <h2 class="text-xl font-bold">Selected Work</h2>
              <p class="text-sm mb-1">A selction of work by <a href="https://x.com/Thevirofficial" target="_blank" class="text-blue-600 underline hover:text-blue-800">me</a> And <a href="https://x.com/DholakiaJaydeep" target="_blank" class="text-blue-600 underline hover:text-blue-800">JD</a></p>
            </div>
          </div>
          <div class="w-full h-px bg-gray-300 mb-2 mt-1"></div>
        </div>

        <!-- Video grid -->
        <div class="video-grid flex-1">
          <div
            v-for="video in videos"
            :key="video.id"
            class="flex gap-3 p-3 cursor-pointer hover:bg-blue-50"
            @click="playVideo(video)"
          >
            <img :src="video.thumbnail" :alt="video.name" class="w-72 h-48 object-cover rounded-sm flex-shrink-0" />
            <div class="flex flex-col min-w-0">
              <p class="text-lg font-bold font-trebuchet-pixel text-blue-700">{{ video.name }}</p>
              <p class="text-sm font-trebuchet-pixel text-gray-600 mt-0.5 line-clamp-3">{{ video.text }}</p>
              <p class="text-sm font-trebuchet-pixel text-gray-400 mt-auto">{{ formatViews(video.views_count) }} views | {{ formatLikes(video.likes_count) }} likes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useVideoStore } from '@/stores/videoStore'
import videosData from '@/data/videos-data.json'

const videos = videosData
const videoStore = useVideoStore()
const openWindow = inject('openWindow')

const formatViews = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n
}

const formatLikes = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n
}

const playVideo = (video) => {
  videoStore.setVideo(video)
  openWindow('mediaPlayer')
}
</script>

<style scoped>
.video-container {
  container-type: inline-size;
}

.video-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

@container (min-width: 700px) {
  .video-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
