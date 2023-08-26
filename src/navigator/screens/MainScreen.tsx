import { useEffect } from 'react'
import ObserverVideoList from '@src/task/ObserverVideoList'
import { TabNavigator } from '../tabs'

export default function MainScreen() {
	useEffect(() => {}, [])
	return (
		<>
			<ObserverVideoList />
			<TabNavigator />
		</>
	)
}
