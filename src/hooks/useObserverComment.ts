import { CommentType } from '@core/model'
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database'
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'

const sortByTime = (a: CommentType, b: CommentType) => (b.time ?? 0) - (a.time ?? 0)

export default function useObserverComment(videoId?: string) {
	const [comments, setComments] = useState<CommentType[]>([])
	const timestamp = useRef(0)
	useEffect(() => {
		if (videoId) {
			console.debug(`lấy comment từ videoId ${videoId}`)
			const ref = database().ref(`comments/${videoId}`).orderByChild('level').equalTo(0)

			ref.once('value', snapshot => {
				if (snapshot.exists()) {
					const data = snapshot.toJSON() as { [key: string]: CommentType }
					const commentArray = Object.keys(data).map(key => ({ ...data[key], id: key } as CommentType))
					const timeArray = commentArray.filter(i => i.time != null).map(i => i.time) as number[]
					timestamp.current = Math.max(...timeArray)
					setComments(previousData => previousData.concat(commentArray).sort(sortByTime))
				}
				const handleAdded = createHandleAdded(ref, timestamp, setComments)

				const handleDeleted = createHandleDeleted(ref, setComments)
				const handleChanged = createHandleChanged(ref, setComments)
				return () => {
					ref.off('child_changed', handleChanged)
					ref.off('child_added', handleAdded)
					ref.off('child_removed', handleDeleted)
				}
			})
		}
	}, [videoId])
	return comments
}
function createHandleChanged(ref: FirebaseDatabaseTypes.Query, setComments: Dispatch<SetStateAction<CommentType[]>>) {
	return ref.on('child_changed', snapshot => {
		const deleteComment = snapshot.toJSON() as CommentType
		setComments(previousData =>
			previousData
				.filter(item => item.id !== snapshot.key)
				.concat({ ...deleteComment, id: snapshot.key! })
				.sort(sortByTime)
		)
	})
}

function createHandleDeleted(ref: FirebaseDatabaseTypes.Query, setComments: Dispatch<SetStateAction<CommentType[]>>) {
	return ref.on('child_removed', snapshot => {
		setComments(previousData => previousData.filter(item => item.id !== snapshot.key))
	})
}

function createHandleAdded(
	ref: FirebaseDatabaseTypes.Query,
	timestamp: MutableRefObject<number>,
	setComments: Dispatch<SetStateAction<CommentType[]>>
) {
	return ref.on('child_added', snapshot => {
		const data = snapshot.toJSON() as CommentType
		if (data.time && data.time > timestamp.current) {
			console.debug('có comment mới')
			timestamp.current = data.time
			setComments(previousData =>
				previousData
					.concat({
						...data,
						id: snapshot.key!,
					})
					.sort(sortByTime)
			)
		}
	})
}
