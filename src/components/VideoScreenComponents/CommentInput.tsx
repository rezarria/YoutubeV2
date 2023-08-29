import { CommentInput as CoreCommentInput, CommentInputRef as CoreCommentInputRef } from '@core/components'
import { CommentType } from '@core/model'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import { useRef } from 'react'

export default function CommentInput(props: { videoId?: string }) {
	const inputRef = useRef<CoreCommentInputRef>(null)
	return (
		<CoreCommentInput
			ref={inputRef}
			onSubmitEditing={e => {
				if (e.nativeEvent.text.length !== 0 && props.videoId) {
					const newComment: CommentType = {
						level: 0,
						content: e.nativeEvent.text,
						time: Date.now(),
						userId: auth().currentUser?.uid,
					}
					database()
						.ref(`comments/${props.videoId}`)
						.push(newComment, () => {
							inputRef.current?.clearText()
						})
					console.debug(`tạo bình luận mới cho video ${props.videoId}`)
					e.nativeEvent.text = ''
				}
			}}
		/>
	)
}
