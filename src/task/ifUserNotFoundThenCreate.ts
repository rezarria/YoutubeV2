import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export default function (user: FirebaseAuthTypes.User) {
	const userRecords = database().ref('user')
	userRecords
		.orderByKey()
		.equalTo(user.uid)
		.once('value', snapshot => {
			if (!snapshot.exists()) {
				console.warn('cần tạo user')
				userRecords.update(
					{
						[user.uid]: {
							avatar: user.photoURL,
							name: user.displayName,
							a: user.updateEmail,
						},
					},
					() => {
						console.log('tạo xong user')
					}
				)
			}
		})
}
