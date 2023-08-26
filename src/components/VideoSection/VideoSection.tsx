import { ForwardedRef, forwardRef } from 'react'

import {
	VideoSection as CoreVideoSection,
	VideoSectionRef as CoreVideoSectionRef,
} from '@core/components/VideoSection'
import { useFile, useUser } from '@src/hooks'
import { Video } from '@core/model'
import { TitlePart } from '@src/navigator/screens'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabParamLists } from '@src/navigator/tabs/type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '@src/navigator/screens/type'
import { GestureResponderEvent } from 'react-native'

export type VideoSectionProps = {
	data?: Video
}

function VideoSection(
	{ data }: VideoSectionProps,
	ref: ForwardedRef<CoreVideoSectionRef>
) {
	const videoUri =
		useFile(data?.videoUri) ??
		'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
	const thumbnailUri = useFile(data?.thumbnailUri)
	const userInfo = useUser(data?.userId)
	const avatarUri = userInfo?.avatar
	const navigation =
		useNavigation<
			CompositeNavigationProp<
				BottomTabNavigationProp<TabParamLists, 'Home'>,
				NativeStackNavigationProp<StackParamList>
			>
		>()
	return (
		<CoreVideoSection
			ref={ref}
			videoUri={videoUri}
			thumbnailUri={thumbnailUri}
			avatarUri={avatarUri}
			views={data?.views}
			time={data?.time}
		>
			<TitlePart
				avatarUri={avatarUri}
				time={data?.time}
				title={data?.name}
				views={data?.views}
				onPress={handlePress(navigation, data)}
			/>
		</CoreVideoSection>
	)
}

function handlePress(
	navigation: CompositeNavigationProp<
		BottomTabNavigationProp<TabParamLists, 'Home'>,
		NativeStackNavigationProp<StackParamList>
	>,
	data?: Video
) {
	return (_event: GestureResponderEvent) => {
		navigation.navigate('VideoScreen', { videoId: data?.id })
	}
}

export default forwardRef<CoreVideoSectionRef, VideoSectionProps>(VideoSection)
