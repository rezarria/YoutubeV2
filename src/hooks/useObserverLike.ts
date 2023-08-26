import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function useObserverLike(
	videoId?: string
): [number?, FirebaseDatabaseTypes.Query?] {
	const [like, setLike] = useState(0)
	const ref = useMemo(
		() =>
			videoId
				? database().ref(`like/${videoId}`).orderByChild('type').equalTo(1)
				: undefined,
		[videoId]
	)
	const first = useRef(true)
	useEffect(() => {
		if (ref) {
			console.debug(`theo dõi việc tăng của like của video ${videoId}`)
			const handleAdd = ref.on('child_added', () => {
				console.log('+l')
				setLike(i => i + 1)
			})
			const handleRemove = ref.on('child_removed', () => {
				setLike(i => i - 1)
			})
			if (first.current) {
				ref.once('value')
				first.current = false
			}
			return () => {
				console.log(`hủy theo dõi việc giảm của like của video ${videoId}`)
				ref.off('child_added', handleAdd)
				ref.off('child_removed', handleRemove)
			}
		}
	}, [ref, videoId])
	return [like, ref]
}
