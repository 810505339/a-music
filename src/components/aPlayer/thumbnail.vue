<script setup lang="ts">
import type MusicPlayerProps from './type'
import {useSongStore} from "~/store"
const songStore = useSongStore()
const props = defineProps<{
  music: MusicPlayerProps
}>()
let style = $computed(()=>{
  return {
    backgroundImage: `url(${props.music.pic})`
  }
})

const playMusic = ()=>{
  songStore.setplaySong(props.music)
}
</script>

<template>
 <div rounded m5 bg-white shadow-md  display-flex items-center>
  <div h-66px w-66px  relative :style="style" bg-no-repeat bg-contain>
  <div absolute top-0 left-0 w-full h-full bg-black-500 opacity-50 ></div>
    <button @click="playMusic()" class="a-player-play" transition absolute z-1>
      <i class="i-ic-round-play-circle" icon-btn w-full h-full   />
    </button>
  </div>
  <div flex-1>{{music.name}} / {{music.artist}}</div>
  </div>
</template>
