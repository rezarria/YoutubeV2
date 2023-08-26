import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export type TabParamLists = {
	Home: {}
	Upload: {}
}

const Tab = createBottomTabNavigator<TabParamLists>()

export { Tab }
