<script setup lang='ts'>
import type { CSSProperties } from 'vue'
let left = $ref(21)
const sliderBar = $ref<HTMLElement | null>(null)
const sliderStyle = $computed<CSSProperties>(() => {
  return {
    width: `${left}%`,
    left: '0%',
  }
})
const handleStyle = $computed<CSSProperties>(() => {
  return {
    left: `${left}%`,
  }
})
function mousedown(e: MouseEvent) {
  const { clientX } = e
  if (!sliderBar)
    return
  const railRect = sliderBar.getBoundingClientRect()

  const percent = (clientX - railRect.left) / railRect.width * 100
  left = percent
  console.log(left)
}
function mouseup(e: MouseEvent) {

}
</script>

<template>
  <div>
    <button @click="left++">
      +
    </button>
    <div ref="sliderBar" bg-gray-50 cursor-pointer block w-full transition @mousedown="mousedown" @mouseup="mouseup">
      <div relative bg="gray-200/300" w-full h-2px>
        <div absolute bg-green-500 top-0 bottom-0 :style="sliderStyle" />
        <div h-10px w-10px absolute rounded-full bg-white transition border="~ gray-800" shadow-md hover:scale-150
          top="50%" translate="-50%, -50%" :style="handleStyle" />
      </div>
    </div>
  </div>
</template>
