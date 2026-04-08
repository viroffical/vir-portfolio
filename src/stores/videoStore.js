import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    currentVideo: null
  }),
  actions: {
    setVideo(video) {
      this.currentVideo = video
    },
    clearVideo() {
      this.currentVideo = null
    }
  }
})
