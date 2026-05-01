<template>
  <div class="relative right-0 wmp" style="height: calc(100% - 0rem);" :class="{ 'wmp-fs': isFullscreen, 'hide-cursor': isFullscreen && !showControls }" ref="wmpRoot" @mousemove="onMouseMove">
    <!-- Main body -->
    <div class="wmp-body">
      <!-- Left Sidebar -->
      <div v-show="!isFullscreen" class="wmp-sidebar">
        <div
          v-for="(item, i) in sidebarItems"
          :key="i"
          class="wmp-sb-item"
          :class="{ 'wmp-sb-active': activeSidebar === i }"
          @click="activeSidebar = i"
        >
          <span>{{ item.label }}</span>
          <span v-if="item.arrow" class="wmp-sb-arrow">&#9654;</span>
        </div>
      </div>

      <!-- Center column -->
      <div class="wmp-center">
        <!-- Video area -->
        <div class="wmp-video" @click="onVideoClick" @dblclick="onVideoDblClick">
          <video
            ref="videoEl"
            class="wmp-video-el"
            :style="{ display: currentVideo ? 'block' : 'none' }"
            @timeupdate="onTimeUpdate"
            @loadedmetadata="onLoaded"
            @ended="onEnded"
          ></video>
          <div v-if="!currentVideo" class="wmp-splash">
            <img src="/img/icons/Windows-Media-Player-9.webp" alt="WMP" class="wmp-splash-logo" />
          </div>
        </div>

        <!-- Status bar -->
        <div class="wmp-status" v-show="!isFullscreen">
          <div class="wmp-status-left">
            <div class="wmp-status-icon-sm">
              <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0" y="0" width="3" height="3" fill="#566"/><rect x="4" y="0" width="3" height="3" fill="#566"/><rect x="0" y="4" width="3" height="3" fill="#566"/><rect x="4" y="4" width="3" height="3" fill="#566"/></svg>
            </div>
            <div class="wmp-status-icon-sm">
              <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0" y="0" width="3.5" height="8" fill="none" stroke="#566" stroke-width="0.8"/><rect x="4.5" y="0" width="3.5" height="8" fill="none" stroke="#566" stroke-width="0.8"/></svg>
            </div>
            <div class="wmp-status-icon-sm">
              <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0" y="0" width="8" height="8" fill="none" stroke="#566" stroke-width="0.8"/></svg>
            </div>
          </div>
          <div class="wmp-status-center">
            <span v-if="currentVideo">{{ isPlaying ? 'Total Time:' : 'Estimated Time:' }} {{ formatTime(duration) }}</span>
          </div>
          <div class="wmp-status-right">
            <!-- Toggle playlist -->
            <button class="icon-btn" @click="showPlaylist = !showPlaylist" title="Toggle Playlist">
              <svg v-if="showPlaylist" viewBox="0 0 14 14">
                <polygon points="4,2 12,7 4,12" fill="#566"/>
              </svg>
              <svg v-else viewBox="0 0 14 14">
                <polygon points="10,2 2,7 10,12" fill="#566"/>
              </svg>
            </button>
          </div>
          <span class="wmp-status-time">{{ formatTime(currentTime) }}</span>
        </div>

        <!-- Info bar -->
        <div class="wmp-info" v-show="!isFullscreen">
          <svg width="8" height="8" viewBox="0 0 8 8" class="wmp-info-play"><polygon points="0,0 8,4 0,8" fill="#4a8"/></svg>
          <span class="wmp-info-text">{{ currentVideo ? 'Clip: ' + currentVideo.name : 'Ready' }}</span>
        </div>
      </div>

      <!-- Right playlist panel -->
      <div v-show="showPlaylist && !isFullscreen" class="wmp-playlist">
        <!-- Dropdown -->
        <div class="wmp-pl-header">
          <div class="wmp-pl-dropdown">
            <svg width="11" height="9" viewBox="0 0 11 9" fill="#8ab"><rect y="0" width="11" height="2"/><rect y="3.5" width="11" height="2"/><rect y="7" width="11" height="2"/></svg>
            <span>All Video</span>
            <span class="wmp-pl-dd-arrow">&#9660;</span>
          </div>
          <button class="wmp-pl-min">&#8211;</button>
          <button class="wmp-pl-close">&#10005;</button>
        </div>
        <!-- Thumb -->
        <div class="wmp-pl-thumb">
          <img v-if="currentVideo" :src="currentVideo.thumbnail" class="wmp-pl-thumb-img" />
          <svg v-else viewBox="0 0 120 100" class="wmp-pl-thumb-svg">
            <rect x="15" y="5" width="50" height="70" rx="3" fill="#3a3a5a" stroke="#555" stroke-width="1.5"/>
            <rect x="18" y="8" width="7" height="5" rx="1" fill="#222"/><rect x="18" y="16" width="7" height="5" rx="1" fill="#222"/>
            <rect x="18" y="24" width="7" height="5" rx="1" fill="#222"/><rect x="18" y="32" width="7" height="5" rx="1" fill="#222"/>
            <rect x="18" y="40" width="7" height="5" rx="1" fill="#222"/><rect x="18" y="48" width="7" height="5" rx="1" fill="#222"/>
            <rect x="18" y="56" width="7" height="5" rx="1" fill="#222"/><rect x="18" y="64" width="7" height="5" rx="1" fill="#222"/>
            <rect x="55" y="8" width="7" height="5" rx="1" fill="#222"/><rect x="55" y="16" width="7" height="5" rx="1" fill="#222"/>
            <rect x="55" y="24" width="7" height="5" rx="1" fill="#222"/><rect x="55" y="32" width="7" height="5" rx="1" fill="#222"/>
            <rect x="55" y="40" width="7" height="5" rx="1" fill="#222"/><rect x="55" y="48" width="7" height="5" rx="1" fill="#222"/>
            <rect x="55" y="56" width="7" height="5" rx="1" fill="#222"/><rect x="55" y="64" width="7" height="5" rx="1" fill="#222"/>
            <rect x="27" y="10" width="26" height="16" rx="1" fill="#1a1a30"/>
            <rect x="27" y="30" width="26" height="16" rx="1" fill="#1a1a30"/>
            <rect x="27" y="50" width="26" height="16" rx="1" fill="#1a1a30"/>
            <circle cx="85" cy="60" r="12" fill="#5a5a7a" stroke="#777" stroke-width="1.5"/>
            <circle cx="85" cy="60" r="4" fill="#3a3a5a"/>
            <rect x="95" y="18" width="4" height="44" rx="1" fill="#6a6a8a"/>
            <path d="M97 18 Q103 14 109 20 Q103 26 97 22 Z" fill="#6a6a8a"/>
          </svg>
        </div>
        <!-- Thumb label -->
        <div class="wmp-pl-label">{{ currentVideo ? currentVideo.name : '' }}</div>
        <!-- List -->
        <div class="wmp-pl-list">
          <div
            v-for="v in videos"
            :key="v.id"
            class="wmp-pl-item"
            :class="{ 'wmp-pl-item-active': currentVideo && currentVideo.id === v.id }"
            @click="selectVideo(v)"
          >
            <span class="wmp-pl-item-name">{{ v.name }}</span>
            <span class="wmp-pl-item-dur">{{ formatDuration(v.duration_ms) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Seek bar -->
    <div class="player-bar" v-show="!isFullscreen">
      <button class="media-btn left-btn" @click="rewind">
        <span class="arrows">&#9668;&#9668;</span>
      </button>
      <div class="progress-container" @click="seekTo">
        <div class="progress-fill" :style="{ width: seekPercent + '%' }"></div>
        <button class="retro-btn" :style="{ left: seekPercent + '%' }">
          <div class="btn-inner"></div>
        </button>
      </div>
      <button class="media-btn right-btn" @click="fastForward">
        <span class="arrows">&#9658;&#9658;</span>
      </button>
    </div>

    <!-- Transport bar -->
    <div class="wmp-transport" v-show="!isFullscreen">
      <!-- WMP logo -->
      <div class="wmp-logo">
        <img src="/img/icons/Windows-Media-Player-9.webp" alt="" class="wmp-logo-img" />
      </div>

      <!-- Buttons -->
      <div class="wmp-tr-buttons">
        <!-- Pause/Play -->
        <button class="wmp-btn wmp-btn-lg" @click="togglePlay" :title="isPlaying ? 'Pause' : 'Play'">
          <svg v-if="isPlaying" width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="2" width="3" height="10" rx="0.5" fill="#334"/><rect x="8" y="2" width="3" height="10" rx="0.5" fill="#334"/></svg>
          <svg v-else width="14" height="14" viewBox="0 0 14 14"><polygon points="4,2 12,7 4,12" fill="#334"/></svg>
        </button>
        <!-- Stop -->
        <button class="wmp-btn" @click="stopVideo" title="Stop">
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x="2" y="2" width="6" height="6" rx="0.5" fill="#334"/></svg>
        </button>
        <!-- Rewind -->
        <button class="wmp-btn" @click="rewind" title="Rewind">
          <svg width="10" height="10" viewBox="0 0 14 12"><polygon points="7,0 1,6 7,12" fill="#334"/><polygon points="13,0 7,6 13,12" fill="#334"/></svg>
        </button>
        <!-- Previous -->
        <button class="wmp-btn" @click="prevVideo" title="Previous">
          <svg width="10" height="10" viewBox="0 0 12 12"><rect x="1" y="2" width="2" height="8" fill="#334"/><polygon points="10,2 4,6 10,10" fill="#334"/></svg>
        </button>
        <!-- Next -->
        <button class="wmp-btn" @click="nextVideo" title="Next">
          <svg width="10" height="10" viewBox="0 0 12 12"><polygon points="2,2 8,6 2,10" fill="#334"/><rect x="9" y="2" width="2" height="8" fill="#334"/></svg>
        </button>
        <!-- Fast Forward -->
        <button class="wmp-btn" @click="fastForward" title="Fast Forward">
          <svg width="10" height="10" viewBox="0 0 14 12"><polygon points="1,0 7,6 1,12" fill="#334"/><polygon points="7,0 13,6 7,12" fill="#334"/></svg>
        </button>
      </div>

      <!-- Mute + Volume -->
      <div class="wmp-tr-vol">
        <button class="wmp-btn" @click="toggleMute" :title="muted ? 'Unmute' : 'Mute'">
          <svg width="10" height="10" viewBox="0 0 14 14">
            <polygon points="1,5 3.5,5 7,1.5 7,12.5 3.5,9 1,9" :fill="muted ? '#999' : '#334'"/>
            <path v-if="!muted" d="M9 4c1.5 1.2 1.5 5.8 0 7" stroke="#334" stroke-width="1.1" fill="none"/>
            <line v-if="muted" x1="9" y1="4" x2="13" y2="10" stroke="#c33" stroke-width="1.3"/>
            <line v-if="muted" x1="13" y1="4" x2="9" y2="10" stroke="#c33" stroke-width="1.3"/>
          </svg>
        </button>
        <div class="wmp-vol-track" @click="setVolume">
          <div class="wmp-vol-fill" :style="{ width: (muted ? 0 : volumePercent) + '%' }"></div>
          <div class="wmp-vol-thumb" :style="{ left: (muted ? 0 : volumePercent) + '%' }"></div>
        </div>
      </div>

      <!-- Spacer -->
      <div class="wmp-tr-spacer"></div>

      <!-- Right: shuffle, repeat, eq, etc. -->
      <div class="wmp-tr-right">
       <!-- Fullscreen -->
        <button class="wmp-fs-btn" @click="toggleFullscreen" title="Full Screen">
          <svg v-if="!isFullscreen" width="13" height="13" viewBox="0 0 14 14">
            <rect x="1" y="1" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.3"/>
            <line x1="5" y1="9" x2="10" y2="4" stroke="currentColor" stroke-width="1.4"/>
            <polyline points="6,4 10,4 10,8" fill="none" stroke="currentColor" stroke-width="1.4"/>
          </svg>
          <svg v-else width="13" height="13" viewBox="0 0 14 14">
            <rect x="1" y="1" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.3"/>
            <line x1="9" y1="5" x2="4" y2="10" stroke="currentColor" stroke-width="1.4"/>
            <polyline points="8,10 4,10 4,6" fill="none" stroke="currentColor" stroke-width="1.4"/>
          </svg>
          <span>FULL SCREEN</span>
        </button>
        <button class="wmp-btn-sm" :class="{ 'wmp-btn-sm-on': shuffle }" @click="shuffle = !shuffle" title="Shuffle">
          <svg width="11" height="11" viewBox="0 0 12 12"><path d="M1 3h2.5l4 6H10M1 9h2.5l4-6H10" stroke="currentColor" stroke-width="1.2" fill="none"/><polygon points="9,1 11.5,3 9,5" fill="currentColor"/><polygon points="9,7 11.5,9 9,11" fill="currentColor"/></svg>
        </button>
        <button class="wmp-btn-sm" :class="{ 'wmp-btn-sm-on': repeat }" @click="repeat = !repeat" title="Repeat">
          <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 4h8v4H2z" fill="none" stroke="currentColor" stroke-width="1.2"/><polygon points="9,2 11,4 9,6" fill="currentColor"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useVideoStore } from '@/stores/videoStore'
import videosData from '@/data/videos-data.json'

const videoStore = useVideoStore()
const videos = ref(videosData)
const currentVideo = ref(videoStore.currentVideo)
const videoEl = ref(null)
const wmpRoot = ref(null)

const sidebarItems = [
  { label: 'Now Playing', arrow: true },
  { label: 'Media Guide', arrow: false },
  { label: 'Copy from CD', arrow: false },
  { label: 'Media Library', arrow: false },
  { label: 'Radio Tuner', arrow: false },
  { label: 'Copy to CD or Device', arrow: false },
  { label: 'Premium Services', arrow: true },
  { label: 'Skin Chooser', arrow: false },
]

const activeSidebar = ref(0)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volumePercent = ref(70)
const muted = ref(false)
const shuffle = ref(false)
const repeat = ref(false)
const showPlaylist = ref(true)
const isFullscreen = ref(false)
const showControls = ref(true)
let hideControlsTimer = null

function resetHideTimer() {
  showControls.value = true
  clearTimeout(hideControlsTimer)
  if (isFullscreen.value) {
    hideControlsTimer = setTimeout(() => { showControls.value = false }, 2000)
  }
}

const seekPercent = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

function loadAndPlay(video) {
  currentVideo.value = video
  isPlaying.value = false
  currentTime.value = 0
  duration.value = 0
  nextTick(() => {
    if (videoEl.value && video) {
      videoEl.value.src = video.url
      videoEl.value.volume = muted.value ? 0 : volumePercent.value / 100
      videoEl.value.load()
      videoEl.value.play().then(() => { isPlaying.value = true }).catch(() => { isPlaying.value = false })
    }
    if (videoStore.consumeAutoFullscreen()) toggleFullscreen()
  })
}

watch(() => videoStore.currentVideo, (nv) => {
  if (videoEl.value) videoEl.value.pause()
  if (nv) loadAndPlay(nv)
  else currentVideo.value = null
})

function onFSChange() {
  const fs = !!(document.fullscreenElement || document.webkitFullscreenElement)
  isFullscreen.value = fs
  if (fs) {
    resetHideTimer()
  } else {
    clearTimeout(hideControlsTimer)
    showControls.value = true
  }
}

function onMouseMove() {
  if (isFullscreen.value) resetHideTimer()
}

function onKeyDown(e) {
  const t = e.target
  const tag = t && t.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return
  if (!currentVideo.value) return
  if (e.code === 'Space' || e.key === ' ') {
    e.preventDefault()
    togglePlay()
  } else if (e.code === 'KeyF' || e.key === 'f' || e.key === 'F') {
    e.preventDefault()
    toggleFullscreen()
  }
}

onMounted(() => {
  document.addEventListener('fullscreenchange', onFSChange)
  document.addEventListener('webkitfullscreenchange', onFSChange)
  document.addEventListener('keydown', onKeyDown)
  if (currentVideo.value) loadAndPlay(currentVideo.value)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFSChange)
  document.removeEventListener('webkitfullscreenchange', onFSChange)
  document.removeEventListener('keydown', onKeyDown)
  clearTimeout(hideControlsTimer)
  if (videoEl.value) { videoEl.value.pause(); videoEl.value.src = '' }
})

function togglePlay() {
  if (!currentVideo.value || !videoEl.value) return
  if (isPlaying.value) { videoEl.value.pause(); isPlaying.value = false }
  else { videoEl.value.play().then(() => { isPlaying.value = true }).catch(() => {}) }
}

let videoClickTimer = null
let preClickPlayState = null
function onVideoClick() {
  clearTimeout(videoClickTimer)
  if (preClickPlayState === null) preClickPlayState = isPlaying.value
  videoClickTimer = setTimeout(() => {
    togglePlay()
    preClickPlayState = null
  }, 300)
}
function onVideoDblClick() {
  clearTimeout(videoClickTimer)
  if (preClickPlayState !== null && isPlaying.value !== preClickPlayState) togglePlay()
  preClickPlayState = null
  toggleFullscreen()
}

function stopVideo() {
  if (!videoEl.value) return
  videoEl.value.pause(); videoEl.value.currentTime = 0
  isPlaying.value = false; currentTime.value = 0
}

function rewind() {
  if (videoEl.value) videoEl.value.currentTime = Math.max(0, videoEl.value.currentTime - 10)
}

function fastForward() {
  if (videoEl.value && duration.value) videoEl.value.currentTime = Math.min(duration.value, videoEl.value.currentTime + 10)
}

function prevVideo() {
  const i = videos.value.findIndex(v => v.id === currentVideo.value?.id)
  selectVideo(i > 0 ? videos.value[i - 1] : videos.value[videos.value.length - 1])
}

function nextVideo() {
  const i = videos.value.findIndex(v => v.id === currentVideo.value?.id)
  selectVideo(i < videos.value.length - 1 ? videos.value[i + 1] : videos.value[0])
}

function selectVideo(video) {
  if (videoEl.value) videoEl.value.pause()
  videoStore.setVideo(video)
  loadAndPlay(video)
}

function seekTo(e) {
  if (!videoEl.value || !duration.value) return
  const r = e.currentTarget.getBoundingClientRect()
  videoEl.value.currentTime = ((e.clientX - r.left) / r.width) * duration.value
}

function setVolume(e) {
  const r = e.currentTarget.getBoundingClientRect()
  volumePercent.value = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))
  muted.value = false
  if (videoEl.value) videoEl.value.volume = volumePercent.value / 100
}

function toggleMute() {
  muted.value = !muted.value
  if (videoEl.value) videoEl.value.volume = muted.value ? 0 : volumePercent.value / 100
}

function toggleFullscreen() {
  if (!wmpRoot.value) return
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement
  if (fsEl) {
    if (document.exitFullscreen) document.exitFullscreen()
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
  } else {
    if (wmpRoot.value.requestFullscreen) wmpRoot.value.requestFullscreen()
    else if (wmpRoot.value.webkitRequestFullscreen) wmpRoot.value.webkitRequestFullscreen()
  }
}

function onTimeUpdate() { if (videoEl.value) currentTime.value = videoEl.value.currentTime }
function onLoaded() { if (videoEl.value) duration.value = videoEl.value.duration }
function onEnded() {
  isPlaying.value = false
  if (repeat.value && videoEl.value) { videoEl.value.currentTime = 0; videoEl.value.play().then(() => { isPlaying.value = true }) }
  else nextVideo()
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60), sec = Math.floor(s % 60)
  return `${m}:${sec < 10 ? '0' : ''}${sec}`
}

function formatDuration(ms) {
  if (!ms) return ''
  const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}
</script>

<style scoped>
/* ═══ ROOT ═══ */
.wmp {
  display: flex;
  flex-direction: column;
  font-family: Tahoma, Verdana, sans-serif;
  font-size: 11px;
  background: linear-gradient(180deg, #dce4ec 0%, #c4d0dc 15%, #b0bcc8 35%, #9caab8 55%, #8a9aac 75%, #7888a0 100%);
  overflow: hidden;
  user-select: none;
}

.wmp-fs {
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 9999;
  border-radius: 0;
}

.wmp-fs.hide-cursor {
  cursor: none;
}

/* ═══ BODY (sidebar + center + playlist) ═══ */
.wmp-body {
  flex: 1;
  display: flex;
  min-height: 0;
  background: linear-gradient(180deg, #6699cc 0%, #336699 4%, #1a3a5c 100%);
}

/* ═══ SIDEBAR ═══ */
.wmp-sidebar {
  width: 90px;
  min-width: 90px;
  background: linear-gradient(180deg, #4a90c8 0%, #3a7cb8 20%, #3070a8 50%, #286098 80%, #1e5088 100%);
  border-right: 1px solid #1e4870;
  padding: 30px 0 6px 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.wmp-sb-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 6px 8px 6px 10px;
  color: #fff;
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1.25;
  cursor: default;
  border-left: 3px solid transparent;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
  word-wrap: break-word;
}

.wmp-sb-item:hover { background: rgba(255,255,255,0.08); }
.wmp-sb-active { background: linear-gradient(90deg, rgba(255,255,255,0.14) 0%, transparent 100%) !important; border-left-color: #fff; }
.wmp-sb-arrow { font-size: 8px; opacity: 0.7; margin-top: 2px; }

/* ═══ CENTER ═══ */
.wmp-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Video */
.wmp-video {
  flex: 1;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  cursor: pointer;
  overflow: hidden;
}

.wmp-video-el { width: 100%; height: 100%; object-fit: contain; }

.wmp-splash {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, #0a1a3a, #000);
}

.wmp-splash-logo { width: 80px; height: 80px; opacity: 0.6; }

/* Status bar (view icons + total time) */
.wmp-status {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #c0c8d4 0%, #aab4c0 100%);
  border-top: 1px solid #8a94a0;
  padding: 1px 6px;
  height: 20px;
  gap: 4px;
  flex-shrink: 0;
  position: relative;
  z-index: 50;
}

.wmp-status-left { display: flex; gap: 2px; }
.wmp-status-center { flex: 1; text-align: right; color: #334; font-size: 10px; padding-right: 4px; }
.wmp-status-right { display: flex; gap: 2px; }
.wmp-status-time { color: #334; font-size: 10px; font-family: Consolas, monospace; margin-left: 4px; }

.wmp-status-icon-sm {
  width: 14px; height: 14px;
  background: linear-gradient(180deg, #d8dce4 0%, #b8c0cc 100%);
  border: 1px solid #8a94a0;
  border-radius: 1px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}

.icon-btn {
  width: 16px;
  height: 16px;
  background: linear-gradient(180deg, #d8dce4 0%, #b8c0cc 100%);
  border: 1px solid #8a94a0;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-btn:hover { background: #dde2ea; }
.icon-btn svg { width: 10px; height: 10px; }

/* Info bar (clip name + time) */
.wmp-info {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #3a6ea5 0%, #2a5a8a 100%);
  padding: 2px 8px;
  height: 18px;
  gap: 6px;
  flex-shrink: 0;
  position: relative;
  z-index: 50;
}

.wmp-info-play { flex-shrink: 0; }
.wmp-info-text { flex: 1; color: #c0daf0; font-size: 10px; text-shadow: 1px 1px 1px rgba(0,0,0,0.4); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ═══ RIGHT PLAYLIST ═══ */
.wmp-playlist {
  width: 185px;
  min-width: 185px;
  background: #384868;
  border-left: 1px solid #283850;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.wmp-pl-header {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #8898b8 0%, #6878a0 100%);
  padding: 3px;
  gap: 2px;
  flex-shrink: 0;
}

.wmp-pl-dropdown {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #283850;
  border: 1px solid #4a6080;
  border-radius: 2px;
  padding: 2px 6px;
  color: #b0c4e0;
  font-size: 11px;
}

.wmp-pl-dd-arrow { margin-left: auto; font-size: 8px; color: #8aa; }

.wmp-pl-min, .wmp-pl-close {
  width: 16px; height: 16px;
  display: flex; align-items: center; justify-content: center;
  background: #506888;
  border: 1px solid #6880a0;
  border-radius: 2px;
  color: #b0c4e0;
  font-size: 10px;
  cursor: pointer;
}

.wmp-pl-min:hover, .wmp-pl-close:hover { background: #6880a0; }

.wmp-pl-thumb {
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #485878 0%, #384868 50%, #283858 100%);
  border-bottom: 1px solid #283850;
  flex-shrink: 0;
  overflow: hidden;
}

.wmp-pl-thumb-img { width: 100%; height: 100%; object-fit: cover; }
.wmp-pl-thumb-svg { width: 100px; height: 85px; opacity: 0.8; }

.wmp-pl-label {
  text-align: center;
  color: #90a8c8;
  font-size: 10px;
  padding: 3px 4px;
  background: #2c3c58;
  border-bottom: 1px solid #1c2c48;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
}

.wmp-pl-list { flex: 1; overflow-y: auto; background: #283850; }

.wmp-pl-item {
  display: flex;
  align-items: center;
  padding: 3px 8px;
  color: #b0c4e0;
  font-size: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.wmp-pl-item:hover { background: rgba(80,120,180,0.25); }
.wmp-pl-item-active { background: #3868a8 !important; color: #fff; }
.wmp-pl-item-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.wmp-pl-item-dur { margin-left: 8px; color: #7888a8; font-size: 10px; flex-shrink: 0; }
.wmp-pl-item-active .wmp-pl-item-dur { color: #b0d0f0; }

/* ═══ SEEK BAR ═══ */
.player-bar {
  display: flex;
  align-items: center;
  height: 22px;
  padding: 0;
  gap: 0;
  background: linear-gradient(to bottom, #e8e8f0, #d4d4de 30%, #c8c8d8 60%, #b8b8cc);
  border: 1px solid #999;
  border-top-color: #ccc;
  border-radius: 12px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.15);
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  z-index: 50;
}

.media-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(to bottom, #f4f4f4, #e0e0e0 40%, #d0d0d0 60%, #c4c4c4);
  border: none;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
}
.media-btn:active {
  background: linear-gradient(to bottom, #c4c4c4, #d0d0d0 40%, #e0e0e0);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
}

.left-btn {
  border-right: 1px solid #999;
  border-radius: 12px;
}

.right-btn {
  border-left: 1px solid #999;
  border-radius: 12px;
}

.arrows {
  font-size: 12px;
  color: #333;
  letter-spacing: -1px;
  user-select: none;
  line-height: 1;
}

.progress-container {
  flex: 1;
  height: 100%;
  position: relative;
  background: linear-gradient(to bottom, #d0d0d0, #e8e8e8 30%, #f0f0f0 50%, #e8e8e8 70%, #d0d0d0);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.progress-fill {
  width: 0%;
  height: 100%;
  background: linear-gradient(to bottom, #a8e8a8, #60d060 25%, #40c040 50%, #30b830 75%, #50d050);
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.retro-btn {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 20px;
  background: #4caf50;
  border-radius: 3px;
  border: 2px solid #2e7d32;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  padding: 0;
}
.retro-btn:active { transform: translate(-50%, -50%) scale(0.97); }

.btn-inner {
  width: 22px;
  height: 18px;
  background: #f0f0f0;
  border: 1px solid #bbb;
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 1px;
  box-sizing: border-box;
}

/* ═══ TRANSPORT BAR ═══ */
.wmp-transport {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #dce4ec 0%, #c4d0dc 15%, #b0bcc8 35%, #9caab8 55%, #8a9aac 75%, #7888a0 100%);
  border-top: 1px solid #c8d4e0;
  padding: 4px 6px;
  gap: 4px;
  flex-shrink: 0;
  position: relative;
  z-index: 50;
}

/* WMP Logo */
.wmp-logo { width: 28px; height: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.wmp-logo-img { width: 24px; height: 24px; }

/* Button clusters */
.wmp-tr-buttons { display: flex; align-items: center; gap: 2px; }
.wmp-tr-vol { display: flex; align-items: center; gap: 3px; margin-left: 6px; }
.wmp-tr-spacer { flex: 1; }
.wmp-tr-right { display: flex; align-items: center; gap: 2px; }

/* Round transport buttons */
.wmp-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: radial-gradient(circle at 45% 38%, #d0dce8 0%, #a8b8c8 40%, #8a9aac 70%, #6a7a8c 100%);
  border: 1.5px solid #5a6a7c;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3);
}

.wmp-btn:hover {
  background: radial-gradient(circle at 45% 38%, #e0ecf8 0%, #b8c8d8 40%, #9aaaba 70%, #7a8a9c 100%);
}

.wmp-btn:active {
  background: radial-gradient(circle at 45% 38%, #a8b8c8 0%, #8a9aac 40%, #6a7a8c 70%, #5a6a7c 100%);
}

.wmp-btn-lg {
  width: 32px;
  height: 32px;
  background: radial-gradient(circle at 42% 36%, #d8e4f0 0%, #b0c0d4 35%, #8a9eb4 60%, #6a8098 100%);
  border: 2px solid #5a7088;
  box-shadow: 0 1.5px 4px rgba(0,0,0,0.25), inset 0 1px 3px rgba(255,255,255,0.35);
}

.wmp-btn-lg:hover {
  background: radial-gradient(circle at 42% 36%, #e8f0f8 0%, #c0d0e4 35%, #9ab0c4 60%, #7a90a8 100%);
}

/* Small square buttons (shuffle/repeat) */
.wmp-btn-sm {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #c8d4e0 0%, #a0b0c0 100%);
  border: 1px solid #7a8a9a;
  border-radius: 2px;
  cursor: pointer;
  color: #445566;
}

.wmp-btn-sm:hover { background: linear-gradient(180deg, #d8e0ea 0%, #b0c0d0 100%); }
.wmp-btn-sm-on { background: linear-gradient(180deg, #9ab8d8 0%, #5a88b8 100%) !important; border-color: #4070a0; color: #fff; }

/* Fullscreen button */
.wmp-fs-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 32px;
  padding: 0 28px;
  background: #4caf50;
  border: 1px solid #2e7d32;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  font-family: Tahoma, Verdana, sans-serif;
  letter-spacing: 0.5px;
}
.wmp-fs-btn:hover { background: #5cbf60; }
.wmp-fs-btn:active { background: #3d9f41; }

/* Volume */
.wmp-vol-track {
  width: 70px;
  height: 4px;
  background: #5a7a94;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.wmp-vol-fill {
  height: 100%;
  background: linear-gradient(90deg, #2a8a2a, #5cb85c);
  border-radius: 2px;
}

.wmp-vol-thumb {
  position: absolute;
  top: -5px;
  width: 8px;
  height: 14px;
  background: linear-gradient(180deg, #eee, #bbb);
  border: 1px solid #888;
  border-radius: 2px;
  transform: translateX(-50%);
  cursor: pointer;
}
</style>
