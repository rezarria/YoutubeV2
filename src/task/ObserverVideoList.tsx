import { useEffect, useRef } from 'react'
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database'
import { useAppDispatch } from '@core/hooks'
import { add, remove, update } from '@core/store/reducer/videosReducer'
import { Video } from '@core/model'

export default function ObserverVideoList() {
	const reduxDispatch = useAppDispatch()
	const subs = useRef<FirebaseDatabaseTypes.Query[]>([])
	//first load
	useEffect(() => {
		database()
			.ref('video')
			.orderByChild('time')
			.limitToLast(40)
			.once('value')
			.then(snapshot => {
				if (snapshot.exists()) {
					const obj = snapshot.toJSON() as { [key: string]: Video }
					const arr = Object.keys(obj).map(key => ({
						id: key,
						video: obj[key],
					}))
					reduxDispatch(add(arr))
					return arr.at(0)?.video.time ?? Date.now()
				}
			})
			.then(() => {
				const query = database().ref('video')

				subs.current.push(query)
				query
					.orderByChild('time')
					.limitToFirst(1)
					.on('child_added', context => {
						reduxDispatch(add([{ id: context.key!, video: context.toJSON() as Video }]))
					})
				query.on('child_changed', context => {
					if (context.key == null) {
						throw new Error('no key')
					}
					console.info(`id: ${context.key} thay đổi`)
					reduxDispatch(update({ id: context.key, video: context.toJSON() as Video }))
				})
				query.on('child_removed', context => {
					if (context.key == null) {
						throw new Error('no key')
					}
					console.info(`id: ${context.key} xóa`)
					reduxDispatch(remove(context.key))
				})
			})
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			subs.current.forEach(q => q.off())
		}
	}, [reduxDispatch])
	return <></>
}
