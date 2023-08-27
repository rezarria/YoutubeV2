/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

GoogleSignin.configure({
	webClientId: '173561227608-vha0jtdn25oq9eh4ot37scnl4jug3rs5.apps.googleusercontent.com',
})

import { StackNavigator } from './src/navigator/screens'
import { AppContainer } from './AppContainer'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

function App() {
	return (
		<AppContainer>
			<StackNavigator />
		</AppContainer>
	)
}

export default App
