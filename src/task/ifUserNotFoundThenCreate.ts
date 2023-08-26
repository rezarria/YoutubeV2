import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export default function (user: FirebaseAuthTypes.User) {
	const userRecords = database().ref('user')
	userRecords
		.orderByKey()
		.equalTo(user.uid)
		.once('value', snapshot => {
			if (!snapshot.exists()) {
				console.debug(`tạo user ${user.uid}`)
				userRecords.update(
					{
						[user.uid]: {
							avatar: user.photoURL,
							name: user.displayName,
						},
					},
					() => {
						console.debug('tạo xong user')
					}
				)
			}
		})
}
