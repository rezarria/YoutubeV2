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

			ref.on('value', snapshot => {
				if (snapshot.exists()) {
					const data = snapshot.toJSON() as { [key: string]: CommentType }
					const arr = Object.keys(data).map(key => ({ ...data[key], id: key } as CommentType))
					const arr2 = arr.filter(i => i.time != null).map(i => i.time)

					timestamp.current = Math.max(...(arr2 as number[]))
					setComments(i => i.concat(arr))
					ref.on('child_added', _snapshot => {
						const _data = _snapshot.toJSON() as CommentType
						if (_data.time && _data.time > timestamp.current) {
							timestamp.current = _data.time
							setComments(i =>
								i.concat({
									..._data,
									id: _snapshot.key!,
								})
							)
						}
					})
				}
			})
		}
	}, [videoId])
	return comments
}
