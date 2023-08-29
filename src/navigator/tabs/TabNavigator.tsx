import { Image } from 'native-base'
import HomeTabScreen from './HomeTabScreen'
import UploadTabScreen from './UploadTabScreen'
import { Tab } from './type'
import HomeLogo from '@assets/svg/home.svg'

export default function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={'Home'}
		>
			<Tab.Screen
				name={'Home'}
				component={HomeTabScreen}
				options={{ tabBarIcon: HomeLG }}
			/>
			<Tab.Screen
				name={'Upload'}
				component={UploadTabScreen}
				options={{ tabBarIcon: UploadLG }}
			/>
		</Tab.Navigator>
	)
}

const HomeLG = () => <HomeLogo />
const UploadLG = () => (
	<Image
		source={require('@assets/img/upload.png')}
		alt={'upload icon'}
	/>
)
