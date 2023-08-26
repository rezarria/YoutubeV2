import database from '@react-native-firebase/database'
import { useEffect, useState } from 'react'

export default function useGetViewsNow(videoId?: string) {
	const [views, setViews] = useState(0)
	useEffect(() => {
		if (videoId) {
			database()
				.ref(`views/${videoId}`)
				.once('value', snapshot => {
					setViews(snapshot.numChildren())
				})
		}
	}, [videoId])
	return views
}
