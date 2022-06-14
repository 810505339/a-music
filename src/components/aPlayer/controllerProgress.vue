<script setup lang='ts'>
import type { CSSProperties } from 'vue'

const props = defineProps<{
  duration: string
  currentTime: string
  percent: number
  isMove: boolean
}>()
const emits = defineEmits(['update:percent'])
const sliderBar = $ref<HTMLElement | null>(null) // slider bar
const handle = $ref<HTMLElement | null>(null) // 点点
let progress = $ref<number>(Number(props.percent)) // 进度条的备份
// https://vueuse.org/core/usePointerSwipe/#usage
const { isSwiping, distanceX } = usePointerSwipe($$(handle), {
  onSwipe(e: PointerEvent) {

  },
  onSwipeEnd(e: PointerEvent) {
    // 完成拖拽
    emits('update:percent', progress)
  },
}) // 使用

watch(distanceX, () => {
  const distance = -distanceX.value
  const percent = (distance / sliderBar!.offsetWidth) * 100
  progress = Number(props.percent) + percent
  if (progress >= 100)
    progress = 100
  if (progress <= 0)
    progress = 0
})

// const { pressed } = useMousePressed({ target: $$(handle) }) // 是否一直按着点点

const widthLeft = $computed(() => isSwiping.value ? `${progress}` : props.percent) // 按着点点的时候，歌曲不影响进度条

const sliderStyle = $computed<CSSProperties>(() => {
  return {
    width: `${widthLeft}%`,
    left: '0%',
  }
})
const handleStyle = $computed<CSSProperties>(() => {
  return {
    left: `${widthLeft}%`,
  }
})
function handleClick(e: MouseEvent) {
  const { clientX } = e
  if (!sliderBar)
    return

  const railRect = sliderBar!.getBoundingClientRect()
  progress = (clientX - railRect.left) / railRect.width * 100
  emits('update:percent', progress)
}

// BUG 不能绑定在进度条上面，会导致不流畅
// function mousemove(e: MouseEvent) {
//   if (!pressed)
//     return

//   const { clientX } = e
//   if (!sliderBar)
//     return
//   const railRect = sliderBar.getBoundingClientRect()
//   console.log(pressed)

//   if (pressed.value)
//     progress = `${(clientX - railRect.left) / railRect.width * 100}`
//   emits('update:percent', progress)
// }
</script>

<template>
  <div flex items-center pr2>
    <div ref="sliderBar" relative bg="gray-200/300" h-4px inline-block w-full transition @click="handleClick($event)">
      <div absolute bg-green-500 top-0 bottom-0 :style="sliderStyle" />
      <div ref="handle" h-10px w-10px absolute rounded-full bg-white transition border="~ gray-800" shadow-md
        hover:scale-150 top="50%" translate-y="-50%" :style="handleStyle" />
    </div>
    <div text-12px ml2>
      -<span>{{ currentTime }}</span>/<span>{{ duration }}</span>
    </div>
  </div>
</template>
