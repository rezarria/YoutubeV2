import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
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
					<NavigationContainer>{props.children}</NavigationContainer>
				</SafeAreaView>
			</NativeBaseProvider>
		</Provider>
	)
}
