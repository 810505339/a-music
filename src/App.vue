<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200" bg-blue-200>
    <router-view />
    <Footer />
    <a-player autoplay :music="{
      title: 'secret base~君がくれたもの~',
      artist: 'Silent Siren',
      src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
      pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
    }" />
  </main>
</template>
