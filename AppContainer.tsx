import { NavigationContainer } from '@react-navigation/native'
import { KeyboardAvoidingView, NativeBaseProvider } from 'native-base'
import { SafeAreaView } from 'react-native'
import CustomTheme from './src/theme'
import AppStyle from './src/AppStyle'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/core/store'

export function AppContainer(props: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<NativeBaseProvider theme={CustomTheme}>
				<SafeAreaView style={AppStyle.expand}>
					<KeyboardAvoidingView flex={1}>
						<NavigationContainer>{props.children}</NavigationContainer>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</NativeBaseProvider>
		</Provider>
	)
}
