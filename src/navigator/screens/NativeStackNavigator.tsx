import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackParamList } from './type'
import MainScreen from './MainScreen'
import VideoScreen from './VideoScreen'
import LoginScreen from './LoginScreen'
import auth from '@react-native-firebase/auth'

const Stack = createNativeStackNavigator<StackParamList>()

export default function StackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={auth().currentUser ? 'MainScreen' : 'LoginScreen'}
		>
			<Stack.Screen
				name={'MainScreen'}
				component={MainScreen}
			/>
			<Stack.Screen
				name={'VideoScreen'}
				component={VideoScreen}
			/>
			<Stack.Screen
				name={'LoginScreen'}
				component={LoginScreen}
			/>
		</Stack.Navigator>
	)
}
