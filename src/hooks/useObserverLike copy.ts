import database, {
	FirebaseDatabaseTypes,
} from '@react-native-firebase/database'
import { useEffect, useMemo, useState } from 'react'

export default function useObserverDislike(
	videoId?: string
): [number?, FirebaseDatabaseTypes.Reference?] {
	const [dislike, setDislike] = useState(0)
	const ref = useMemo<FirebaseDatabaseTypes.Reference | undefined>(
		() => (videoId ? database().ref(`dislike/${videoId}`) : undefined),
		[videoId]
	)
	useEffect(() => {
		if (ref) {
			ref
				.once('value')
				.then(result => {
					if (result.exists()) {
						setDislike(result.numChildren())
					}
				})
				.then(() => {
					ref.off()
					console.debug(`theo dõi việc giảm giảm của like của video ${videoId}`)
					ref.on('child_added', context => {
						setDislike(context.numChildren())
					})
					ref.on('child_removed', context => {
						setDislike(context.numChildren())
					})
				})
			return () => {
				console.log(`hủy theo dõi ${videoId}`)
				ref.off()
			}
		}
	}, [ref, videoId])
	return [dislike, ref]
}
