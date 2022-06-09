<script setup lang="ts">
import type MusicPlayerProps from './type'
const props = defineProps<{
  music: MusicPlayerProps
}>()

const audio = $ref<HTMLAudioElement | null>(null)

const playing = $ref(false)
provide('playing', $$(playing))

async function play() {
  try {
    await audio?.play()
  }
  catch (e) {
    console.warn(e)
  }
}

function pause() {

}
</script>

<template>
  <button @click="playing = !playing">
    {{ playing ? '暂停' : '播放' }}
  </button>
  <div rounded m5 bg-white shadow-md>
    <thumbnail />
  </div>
  <audio ref="audio" />
  <controller-progress />
</template>
