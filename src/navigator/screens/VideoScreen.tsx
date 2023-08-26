import { VStack } from 'native-base'
import { StackParamList } from './type'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import useVideoInfo from '@src/hooks/useVideoInfo'
import { useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { VideoRef } from '@core/components/Video/Video'
import { AvatarPart, Buttons, Title } from '@components/VideoScreenComponents'
import { VideoPart } from '@components/VideoScreenComponents/VideoPart'

export default (
	props: NativeStackScreenProps<StackParamList, 'VideoScreen'>
) => {
	const data = useVideoInfo(props.route.params.videoId)
	const videoPartRef = useRef<VideoRef>(null)
	useFocusEffect(
		useCallback(() => {
			videoPartRef.current?.play()
			return () => {
				videoPartRef.current?.pause()
			}
		}, [])
	)
	return (
		<VStack flex={1}>
			<VideoPart
				ref={videoPartRef}
				videoUri={data?.videoUri}
			/>
			<Title
				title={data?.name}
				views={data?.views}
				like={data?.like}
				time={data?.time}
			/>
			<Buttons data={data} />
			<AvatarPart userId={data?.userId} />
		</VStack>
	)
}
