import type SongType from '~/type/song'
export interface songState {
  playing: boolean
  playList: SongType[]
  index: number
  volume: number
  currentMusic: SongType
  init: (playList: SongType[]) => void
  toggle: (index: number) => void
}
