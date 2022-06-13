<script setup lang="ts">
import Thumbnail1 from './thumbnail.vue'
import type MusicPlayerProps from '~/type/song'
import { useSongStore } from '~/store'

const props = defineProps<{
  music: MusicPlayerProps[]
}>()
const songStore = useSongStore()
songStore.init(props.music)
const audio = $ref<HTMLAudioElement | null>(null)
const currentSrc = $computed(() => songStore.currentMusic.src)
function onTimeupdate() {

}
function play() {
  audio!.play()
}
function canPlay() {

}
</script>

<template>
  <div rounded ma bg-white shadow-md max-w-500px>
    <controller />
    <song-list />
    <audio ref="audio" name="media" :src="currentSrc" preload="auto" @timeupdate="onTimeupdate"
      @canplaythrough="canPlay" @play="play" />
  </div>
</template>
