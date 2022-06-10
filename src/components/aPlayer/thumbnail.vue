<script setup lang="ts">
import type MusicPlayerProps from './type'
const playing:boolean = $ref(false)
const props = defineProps<{
  music: MusicPlayerProps
}>()
let style = $computed(()=>{
  return {
    backgroundImage: `url(${props.music.pic})`
  }
})
const emit = defineEmits<{
  (e: 'playMusic', value: object,palying:boolean): void
}>()
const playMusic = (value:object)=>{
  emit("playMusic",value,playing)
  playing = !playing
}
</script>

<template>
 <div rounded m5 bg-white shadow-md  display-flex items-center>
  <div h-66px w-66px  relative :style="style" bg-no-repeat bg-contain>
  <div absolute top-0 left-0 w-full h-full bg-black-500 opacity-50 ></div>
    <button @click="playMusic(props.music)" :class="playing ? 'a-player-pause' : `a-player-play`" transition absolute z-1>
      <i :class="playing ? 'i-ic-round-pause-circle' : 'i-ic-round-play-circle'" icon-btn w-full h-full   />
    </button>
  </div>
  <div flex-1>{{music.name}} / {{music.artist}}</div>
  </div>
</template>
