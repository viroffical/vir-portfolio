import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    currentVideo: null,
    autoFullscreen: false
  }),
  actions: {
    setVideo(video, { autoFullscreen = false } = {}) {
      this.currentVideo = video
      this.autoFullscreen = autoFullscreen
    },
    consumeAutoFullscreen() {
      const v = this.autoFullscreen
      this.autoFullscreen = false
      return v
    },
    clearVideo() {
      this.currentVideo = null
      this.autoFullscreen = false
    }
  }
})
