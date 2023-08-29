import { Box, Factory, Pressable, Text } from 'native-base'
import { default as RNVideo } from 'react-native-video'
import { Dimensions } from 'react-native'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import VideoProgress, { VideoProgressRef } from './VideoProgress'

export type VideoProps = {
	size?: { width: number; height: number }
	uri?: string
	thumbnailUri?: string
	onEnd?: () => void
}

const NBRNVideo = Factory(RNVideo)

export type VideoRef = {
	play(): void
	pause(): void
}

const Video = forwardRef<VideoRef, VideoProps>(function Video(props, ref) {
	const [pause, setPause] = useState(false)
	const videoProgressRef = useRef<VideoProgressRef>(null)
	const videoTimeRef = useRef<VideoTimeRef>(null)
	const [secondSeek, setSecondSeek] = useState(0)
	const [duration, setDuration] = useState(0)
	useImperativeHandle(
		ref,
		() => ({
			play() {
				setPause(false)
			},
			pause() {
				setPause(true)
			},
		}),
		[]
	)
	return (
		<Box
			width={'100%'}
			height={`${(Dimensions.get('window').width / 16) * 9} px`}
		>
			<Pressable
				flex={1}
				onPress={() => {
					setPause(i => !i)
				}}
			>
				<Box flex={1}>
					<NBRNVideo
						onLoad={e => {
							console.debug('lấy thông tin video')
							setDuration(e.duration)
						}}
						muted={false}
						source={{
							uri: props.uri,
						}}
						seek={secondSeek}
						poster={props.thumbnailUri}
						paused={pause}
						flex={1}
						resizeMode={'cover'}
						onProgress={e => {
							videoProgressRef.current?.set((e.currentTime / e.seekableDuration) * 100)
							videoTimeRef.current?.setText(timeStyle(e.seekableDuration - e.currentTime))
						}}
						onEnd={props.onEnd}
					/>
					<VideoTime ref={videoTimeRef} />
				</Box>
			</Pressable>
			<VideoProgress
				ref={videoProgressRef}
				onSeek={v => {
					setSecondSeek(v * duration)
				}}
			/>
		</Box>
	)
})

export default Video

function timeStyle(a: number) {
	const minutes = Math.floor(a / 60)
	const seconds = Math.floor(a % 60)
	return `${minutes}:${seconds}`
}

type VideoTimeRef = {
	setText(text: string): void
}

const VideoTime = forwardRef<VideoTimeRef>(function VideoTime(props, ref) {
	const [text, setText] = useState('')
	useImperativeHandle(
		ref,
		() => ({
			setText,
		}),
		[]
	)
	return (
		<Box
			position={'absolute'}
			bottom={'13px'}
			right={'12px'}
			backgroundColor={'rgba(0, 0, 0, 0.70)'}
			paddingX={'8px'}
			paddingY={'2px'}
			rounded={'4px'}
		>
			<Text
				fontSize={'10px'}
				color={'#fff'}
			>
				{text}
			</Text>
		</Box>
	)
})
