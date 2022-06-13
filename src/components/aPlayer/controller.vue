<script setup lang='ts'>
</script>

<template>
  <div flex>
    <thumbnail />
    <div basis-full px2 pt2 flex flex-col justify-between>
      <info />
      <lyric />
      <div flex>
        <controller-progress basis-full />
        <player-icons />
      </div>
    </div>
  </div>
</template>
