<script setup lang='ts'>
import type { CSSProperties } from 'vue'

const props = defineProps<{
  duration: string
  currentTime: string
  percent: string
}>()
const emits = defineEmits(['update:percent'])
const sliderBar = $ref<HTMLElement | null>(null)
const handle = $ref<HTMLElement | null>(null)

const { pressed } = useMousePressed({ target: $$(handle) })
function mousedown(e: MouseEvent) {
  const { clientX } = e
  if (!sliderBar)
    return
  const railRect = sliderBar?.getBoundingClientRect()

  emits('update:percent', `${(clientX - railRect.left) / railRect.width * 100}`)
}
// BUG 不能绑定在进度条上面，会导致不流畅
function mousemove(e: MouseEvent) {
  const { clientX } = e
  if (!sliderBar)
    return
  const railRect = sliderBar.getBoundingClientRect()

  if (pressed.value)
    emits('update:percent', `${(clientX - railRect.left) / railRect.width * 100}`)
}

const sliderStyle = $computed<CSSProperties>(() => {
  return {
    width: `${props.percent}%`,
    left: '0%',
  }
})
const handleStyle = $computed<CSSProperties>(() => {
  return {
    left: `${props.percent}%`,
  }
})
</script>

<template>
  <div flex items-center pr2>
    <div ref="sliderBar" relative bg="gray-200/300" h-4px inline-block w-full transition @mousedown="mousedown"
      @mousemove="mousemove">
      <div absolute bg-green-500 top-0 bottom-0 :style="sliderStyle" />
      <div ref="handle" h-10px w-10px absolute rounded-full bg-white transition border="~ gray-800" shadow-md
        hover:scale-150 top="50%" translate-y="-50%" :style="handleStyle" />
    </div>
    <div text-12px ml2>
      -<span>{{ currentTime }}</span>/<span>{{ duration }}</span>
    </div>
  </div>
</template>
