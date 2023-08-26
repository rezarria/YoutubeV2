import { useEffect, useState } from 'react'
import database from '@react-native-firebase/database'
import { Video } from '@core/model'

export default function useVideoInfo(videoId?: string) {
	const [video, setVideo] = useState<Video>()
	useEffect(() => {
		fetchDate(video, videoId, setVideo)
	}, [video, videoId])
	return video
}

function fetchDate(
	video: Video | undefined,
	videoId: string | undefined,
	setVideo: React.Dispatch<React.SetStateAction<Video | undefined>>
) {
	if (video == null) {
		const ref = database().ref(`video/${videoId}`)
		ref.once('value', snapshot => {
			if (snapshot.exists()) {
				setVideo({
					...(snapshot.toJSON() as Video),
					id: videoId,
				})
			}
		})
		ref.on('child_changed', context => {
			const key = context.key
			if (key) {
				setVideo(v => ({ ...v, [key]: context.toJSON() }))
			}
		})
	}
}
