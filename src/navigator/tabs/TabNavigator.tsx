import HomeTabScreen from './HomeTabScreen'
import UploadTabScreen from './UploadTabScreen'
import { Tab } from './type'

export default function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={'Home'}
		>
			<Tab.Screen
				name={'Home'}
				component={HomeTabScreen}
			/>
			<Tab.Screen
				name={'Upload'}
				component={UploadTabScreen}
			/>
		</Tab.Navigator>
	)
}
