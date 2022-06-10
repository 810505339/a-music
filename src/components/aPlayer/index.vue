<script setup lang="ts">
import type MusicPlayerProps from './type'
const props = defineProps<{
  music: MusicPlayerProps
}>()

const video = $ref<HTMLAudioElement | null>(null)
let currentMusicSrc = $ref('')  //nowPlayTime
let currentTime = $ref('')  //nowPlayTime
let duration = $ref('')  //allPlayTime
let allSecondTimes = $ref('')  //allPlaySecondTimes
let percent = $ref('')
let leftWidth = $ref(0)
// const playing:boolean = $ref(false)
// provide('playing', $$(playing))

 function play() {
     video?.play()
}
 function pause() {
     video?.pause()
}
function canPlay(){
  allSecondTimes = video.duration
  duration = handleTime(video.duration)
  currentTime = "00:00"
  
}
function handleTime(val){
  let min = String(Math.floor(val/60) % 60).padStart(2,"0");
  let sec = String(parseInt(val % 60)).padStart(2,"0");
  return `${min}:${sec}`
}
function onTimeupdate(e){
  currentTime = handleTime(e.target.currentTime);
  percent = e.target.currentTime / allSecondTimes
  leftWidth = (percent * 100).toFixed(4) + "%"
}
// function audioEnd(){
//   playing = false
// }
function playMusic(item,playing){
  if(video.src == item.src){
    playing ? pause() : play()
  }else{
    video.src = item.src
     play()
  } 
}
</script>

<template>
<div w-466px m-a>
    <thumbnail v-for="item in music" :music="item" @playMusic="playMusic" />
  <video ref="video" @ended="audioEnd" @timeupdate="onTimeupdate"  name="media" @canplaythrough="canPlay"><source :src="currentMusicSrc" type="audio/mpeg"></video>
  <controller-progress :duration="duration" :currentTime="currentTime" :leftWidth="leftWidth" />
  </div>
</template>
