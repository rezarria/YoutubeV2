import { Box, Button } from 'native-base'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import ifUserNotFoundThenCreate from '@src/task/ifUserNotFoundThenCreate'
import { StackParamList } from './type'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export default function LoginScreen(
	props: NativeStackScreenProps<StackParamList, 'LoginScreen'>
) {
	return (
		<Box>
			<Button
				onPress={() => {
					onGoogleButtonPress().then(i => {
						ifUserNotFoundThenCreate(i.user)
						props.navigation.reset({
							index: 0,
							routes: [{ name: 'MainScreen' }],
						})
					})
				}}
			>
				LOGIN
			</Button>
			<Button
				onPress={() => {
					auth().signOut()
				}}
			>
				Logout
			</Button>
		</Box>
	)
}

async function onGoogleButtonPress() {
	await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
	const { idToken } = await GoogleSignin.signIn()
	const googleCredential = auth.GoogleAuthProvider.credential(idToken)
	return auth().signInWithCredential(googleCredential)
}
