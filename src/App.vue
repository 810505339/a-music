<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200" bg-blue-200>
    <a-player  :music="songs" />
  </main>
  
</template>
<script setup lang="ts">
const songs = [
  {
    name: '平凡之路',
    artist: '二狗',
    src: 'http://music.163.com/song/media/outer/url?id=500665346.mp3',
    pic: 'https://p2.music.126.net/IwEI0tFPh4w9OjY6RM2IJQ==/109951163009071893.jpg?param=130y130',
    playing:false
  },
  {
    name: 'カタオモイ',
    artist: '二狗',
    src: 'http://music.163.com/song/media/outer/url?id=431259256.mp3',
    pic: 'http://p2.music.126.net/2QRYxUqXfW0zQpm2_DVYRA==/109951165052089697.jpg?param=130y130',
    playing:false
  },
]
</script>