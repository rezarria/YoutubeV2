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
		if (user && likeRef?.orderByKey().equalTo(user.uid)) {
			likeRef?.push(user.uid)
		}
	}, [likeRef, user])
	const handleDislike = useCallback(() => {
		if (user) {
			dislikeRef?.push(user.uid)
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
