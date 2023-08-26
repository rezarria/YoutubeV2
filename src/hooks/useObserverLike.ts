import database, {
	FirebaseDatabaseTypes,
} from '@react-native-firebase/database'
import { useEffect, useMemo, useState } from 'react'

export default function useObserverLike(
	videoId?: string
): [number?, FirebaseDatabaseTypes.Reference?] {
	const [like, setLike] = useState(0)
	const ref = useMemo<FirebaseDatabaseTypes.Reference | undefined>(
		() => (videoId ? database().ref(`like/${videoId}`) : undefined),
		[videoId]
	)
	useEffect(() => {
		if (ref) {
			ref
				.once('value')
				.then(result => {
					if (result.exists()) {
						setLike(result.numChildren())
					}
				})
				.then(() => {
					ref.off()
					console.debug(`theo dõi việc tăng giảm của like của video ${videoId}`)
					ref.on('child_added', context => {
						setLike(context.numChildren())
					})
					ref.on('child_removed', context => {
						setLike(context.numChildren())
					})
				})
			return () => {
				console.log(`hủy theo dõi ${videoId}`)
				ref.off()
			}
		}
	}, [ref, videoId])
	return [like, ref]
}
