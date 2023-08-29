import { CommentInput as CoreCommentInput } from '@core/components'
import { CommentType } from '@core/model'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

export default function CommentInput(props: { videoId?: string }) {
	return (
		<CoreCommentInput
			onSubmitEditing={e => {
				if (e.nativeEvent.text.length !== 0 && props.videoId) {
					const newComment: CommentType = {
						level: 0,
						content: e.nativeEvent.text,
						time: Date.now(),
						userId: auth().currentUser?.uid,
					}
					database().ref(`comments/${props.videoId}`).push(newComment)
					console.debug(`tạo bình luận mới cho video ${props.videoId}`)
				}
			}}
		/>
	)
}
