import { CommentType } from '@core/model'
import database from '@react-native-firebase/database'
import { useEffect, useState } from 'react'

export default function useObserverComment(videoId?: string) {
	const [comments] = useState<CommentType[]>([])
	useEffect(() => {
		if (videoId) {
			database()
				.ref(`comments/${videoId}`)
				.orderByChild('level')
				.equalTo(0)
				.once('value', snapshot => {
					if (snapshot.exists()) {
						console.debug(JSON.stringify(snapshot.toJSON()))
					}
				})
		}
	}, [videoId])
	return comments
}
