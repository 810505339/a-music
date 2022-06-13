import { defineStore } from "pinia"

interface songState {
    playing: boolean;
    playSong: object | string;
}

export const useSongStore = defineStore("songs",{
    state: ():songState => {
        return {
          playing: false,
          playSong: '',
        }
    },
    actions: {
        setPlaying(val:boolean){
         this.playing = val
        },
        setplaySong(val:object){
         this.playSong = val
        }
    }
})