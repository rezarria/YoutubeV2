import CommentList from '@components/CommentList'
import { AvatarPart, Buttons, Title, VideoPart } from '@components/VideoScreenComponents'
import { CommentsSection } from '@core/components'
import { VideoRef } from '@core/components/Video/Video'
import database from '@react-native-firebase/database'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import useVideoInfo from '@src/hooks/useVideoInfo'
import { VStack } from 'native-base'
import { useCallback, useRef } from 'react'
import { StackParamList } from './type'

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
	const handleEnd = useCallback(() => {
		if (data?.id) {
			database()
				.ref('views')
				.update({
					[data.id]: {
						time: Date.now(),
					},
				})
		}
	}, [data?.id])
	return (
		<VStack flex={1}>
			<VideoPart
				ref={videoPartRef}
				videoUri={data?.videoUri}
				onEnd={handleEnd}
			/>
			<Title
				title={data?.name}
				videoId={data?.id}
				like={data?.like}
				time={data?.time}
			/>
			<Buttons data={data} />
			<AvatarPart userId={data?.userId} />
			<CommentsSection>
				<CommentList videoId={data?.id} />
			</CommentsSection>
		</VStack>
	)
}
