import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Videos from '../state'
import { Video } from '@core/model'

const VideosInit: Videos = { data: [], time: 0 }

const videosSilce = createSlice({
	name: 'videos',
	initialState: VideosInit,
	reducers: {
		remove: (state, action: PayloadAction<string>) => {
			state.data = state.data
				.filter(i => i.id !== action.payload)
				.sort((a, b) => (a?.time ?? 0) - (b?.time ?? 0))
		},
		update: (state, action: PayloadAction<{ id: string; video: Video }>) => {
			state.data = state.data
				.filter(i => i.id !== action.payload.id)
				.concat({ ...action.payload.video, id: action.payload.id })
				.sort((a, b) => (a?.time ?? 0) - (b?.time ?? 0))
		},
		add: (state, action: PayloadAction<{ id: string; video: Video }[]>) => {
			state.data = state.data
				.concat(
					action.payload
						.filter(i => !state.data.map(g => g.id).includes(i.id))
						.map(i => ({ ...i.video, id: i.id }))
				)
				.sort((a, b) => (a?.time ?? 0) - (b?.time ?? 0))
		},
	},
})

export const { add, update, remove } = videosSilce.actions
export default videosSilce.reducer
