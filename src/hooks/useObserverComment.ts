import { CommentType } from '@core/model'
import database from '@react-native-firebase/database'
import { useEffect, useRef, useState } from 'react'

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
					const arr = Object.keys(data).map(key => ({ ...data[key], id: key } as CommentType))
					const timeArr = arr.filter(i => i.time != null).map(i => i.time) as number[]
					timestamp.current = Math.max(...timeArr)
					setComments(i => i.concat(arr))
				}
				const handleAdd = ref.on('child_added', _snapshot => {
					const _data = _snapshot.toJSON() as CommentType
					if (_data.time && _data.time > timestamp.current) {
						console.debug('có comment mới')
						timestamp.current = _data.time
						setComments(i =>
							i.concat({
								..._data,
								id: _snapshot.key!,
							})
						)
					}
				})

				const handleRemove = ref.on('child_removed', _snapshot => {
					setComments(i => i.filter(x => x.id !== _snapshot.key))
				})
				const handleUpdate = ref.on('child_changed', _snapshot => {
					const deleteComment = _snapshot.toJSON() as CommentType
					setComments(i =>
						i
							.filter(x => x.id !== _snapshot.key)
							.concat({ ...deleteComment, id: _snapshot.key! })
							.sort((a, b) => (b.time ?? 0) - (a.time ?? 0))
					)
				})
				return () => {
					ref.off('child_changed', handleUpdate)
					ref.off('child_added', handleAdd)
					ref.off('child_removed', handleRemove)
				}
			})
		}
	}, [videoId])
	return comments
}
