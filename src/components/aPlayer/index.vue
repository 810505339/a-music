<script setup lang="ts">
import type MusicPlayerProps from './type'
import {useSongStore} from "~/store"
const songStore = useSongStore()

defineProps<{
  music: MusicPlayerProps
}>()

const video:any = $ref<HTMLAudioElement | null>(null)
let currentMusicSrc = $ref('')  //nowPlayTime
let currentTime = $ref('')  //nowPlayTime
let duration = $ref('')  //allPlayTime
let allSecondTimes = $ref('')  //allPlaySecondTimes
let percent = $ref('')
let leftWidth = $ref(0)


 function play() {
     video?.play()
}
 function pause() {
     video?.pause()
     songStore.setPlaying(false)
}
function canPlay(){
  allSecondTimes = video.duration
  duration = handleTime(video.duration)
  currentTime = "00:00"
  songStore.setPlaying(true)
}
function handleTime(val:any){
  let min = String(Math.floor(val/60) % 60).padStart(2,"0");
  let sec = String(parseInt(val % 60)).padStart(2,"0");
  return `${min}:${sec}`
}
function onTimeupdate(e){
  currentTime = handleTime(e.target.currentTime);
  percent = e.target.currentTime / allSecondTimes
  leftWidth = (percent * 100).toFixed(4) + "%"
}

function playMusic(item:object){ 
   video.src = item.src
   play()
}

watch(() => songStore.playSong, () => {
  playMusic(songStore.playSong)
})
function changePlayStatus(status:boolean){
  if(status){
    pause()
  }else{
    play()
    songStore.setPlaying(true)
  }
}
</script>

<template>
<div  m-a>
  <thumbnail v-for="item in music" :music="item" @playMusic="playMusic" />
  <video ref="video"  @timeupdate="onTimeupdate"  name="media" @canplaythrough="canPlay"><source :src="currentMusicSrc" type="audio/mpeg"></video>
  <controller-progress v-if="songStore.playSong" @changePlayStatus="changePlayStatus" :duration="duration" :currentTime="currentTime" :leftWidth="leftWidth" />
</div>
</template>
