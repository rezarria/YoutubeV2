import { useEffect, useState } from 'react'
import database from '@react-native-firebase/database'
import { User } from '@core/model'

export default function useUser(userId?: string) {
	const [user, setUser] = useState<User>()
	useEffect(() => {
		console.debug(`truy vấn thông tin về user ${userId}`)
		database()
			.ref(`user/${userId}`)
			.once('value')
			.then(result => {
				if (result.exists()) {
					const userInfo = result.toJSON() as User
					setUser(userInfo)
				}
			})
	}, [userId])
	return user
}
