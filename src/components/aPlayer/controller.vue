<script setup lang='ts'>
import dayjs from 'dayjs'
import { useSongStore } from '~/store'

const songStore = useSongStore()
const audio = $ref<HTMLAudioElement | null>(null)
let allTime = $ref('00:00')
let curTime = $ref('00:00')
let progress = $ref('0')
const current = $computed(() => songStore.currentMusic)

function onTimeupdate(e: Event) {
  const audio = e.target as HTMLAudioElement
  const { duration, currentTime } = audio
  progress = (currentTime / duration * 100).toFixed(4)
  curTime = dayjs.unix(currentTime).format('mm:ss')
}
// 切换播放
function toggle() {
  if (current.playing)
    play()
  else
    pause()
}
function play() {
  audio?.play()
}
function pause() {
  audio?.pause()
}

function canPlay() {
  if (!audio)
    return

  allTime = dayjs.unix(audio.duration as number).format('mm:ss')
}
</script>

<template>
  <div flex>
    <thumbnail @toggle="toggle" />
    <div basis-full px2 pt2 flex flex-col justify-between>
      <info />
      <lyric />
      <div flex>
        <controller-progress v-model:percent="progress" basis-full :duration="allTime" :current-time="curTime" />
        <player-icons />
      </div>
    </div>
  </div>
  <audio ref="audio" name="media" :src="current.src" preload="auto" @timeupdate="onTimeupdate" @canplay="canPlay"
    @play="play" />
</template>
