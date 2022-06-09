<script setup lang="ts">
const playing = inject<boolean>('playing')
</script>

<template>
  <div h-66px w-66px bg-green-500 relative>
    <button :class="playing ? 'a-player-pause' : `a-player-play`" transition absolute z-1>
      <i :class="playing ? 'i-ic-round-pause-circle' : 'i-ic-round-play-circle'" icon-btn w-full h-full />
    </button>
  </div>
</template>
