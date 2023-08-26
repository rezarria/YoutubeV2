import { Video as VideoModel } from '@core/model'
import LikeButton from './LikeButton'
import DislikeButton from './DislikeButton'
import { useObserverDislike, useObserverLike } from '@src/hooks'
import { useCallback } from 'react'
import auth from '@react-native-firebase/auth'

export default function LikeGroup(props: { data?: VideoModel }) {
	const [like, likeRef] = useObserverLike(props.data?.id)
	const [dislike, dislikeRef] = useObserverDislike(props.data?.id)
	const user = auth().currentUser
	const handleLike = useCallback(() => {
		if (user) {
			likeRef?.ref.child(user.uid).once('value', snapshot => {
				if (snapshot.exists()) {
					if (snapshot.val().type !== 1) {
						snapshot.ref.update({ type: 1 })
					} else {
						snapshot.ref.remove()
					}
				} else {
					snapshot.ref.set({ type: 1, time: Date.now() })
				}
			})
		}
	}, [likeRef, user])
	const handleDislike = useCallback(() => {
		if (user) {
			dislikeRef?.ref.child(user.uid).once('value', snapshot => {
				if (snapshot.exists()) {
					if (snapshot.val().type !== 0) {
						snapshot.ref.update({ type: 0 })
					} else {
						snapshot.ref.remove()
					}
				} else {
					snapshot.ref.set({ type: 0, time: Date.now() })
				}
			})
		}
	}, [dislikeRef, user])
	return (
		<>
			<LikeButton
				value={like}
				onPress={handleLike}
			/>
			<DislikeButton
				value={dislike}
				onPress={handleDislike}
			/>
		</>
	)
}
