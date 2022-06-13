<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import {useSongStore} from "~/store"
const songStore = useSongStore()
// const sliderBar = $ref<HTMLElement | null>(null)
const sliderStyle = $computed<CSSProperties>(() => {
  return {
    width: `${props.leftWidth}`,
    left: '0%',
  }
})
const handleStyle = $computed<CSSProperties>(() => {
  return {
    left: `${props.leftWidth}`,
  }
})
const props = defineProps<{
  duration: string,
  currentTime: string,
  leftWidth: Number,
}>()
// function mousedown(e: MouseEvent) {
//   const { clientX } = e
//   if (!sliderBar)
//     return
//   const railRect = sliderBar.getBoundingClientRect()

//   const percent = (clientX - railRect.left) / railRect.width * 100
//   left = percent
//   console.log(left)
// }
// function mouseup(e: MouseEvent) {

// }
const emit = defineEmits<{
  (e: 'changePlayStatus', palying:boolean): void
}>()
function changeMusicState(){
     emit("changePlayStatus",songStore.playing)
}
</script>

<template>
<div flex items-center justify-center >
        <i mr-20px :class="songStore.playing ? 'i-ic-round-pause-circle-outline' : 'i-ic-round-play-circle-outline' " icon-btn w-30px h-30px   @click="changeMusicState"></i>
      <div relative bg="gray-200/300" h-2px inline-block w-466px transition >
        <div absolute bg-green-500 top-0 bottom-0 :style="sliderStyle" />
        <div h-10px w-10px absolute rounded-full bg-white transition border="~ gray-800" shadow-md hover:scale-150
          top="50%" translate-y="-50%" :style="handleStyle" />
      </div>
      <span v-if="duration" ml-20px>{{currentTime}} / {{duration}}</span>
  </div>
</template>
