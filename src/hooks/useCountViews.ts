import database from '@react-native-firebase/database'
import { useEffect, useState } from 'react'

export default function useCountViews(videoId?: string) {
	const [views, setViews] = useState(0)
	useEffect(() => {
		if (videoId) {
			const ref = database().ref(`views/${videoId}`)
			const handleAdd = ref.on('child_added', () => {
				setViews(i => i + 1)
			})
			const handleRemove = ref.on('child_removed', () => {
				setViews(i => i - 1)
			})
			return () => {
				ref.off('child_added', handleAdd)
				ref.off('child_removed', handleRemove)
			}
		}
	}, [videoId])
	return views
}
