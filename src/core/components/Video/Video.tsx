import { Box, Factory, Pressable, Progress, Text } from 'native-base'
import { default as RNVideo } from 'react-native-video'
import { Dimensions } from 'react-native'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

export type VideoProps = {
	size?: { width: number; height: number }
	uri?: string
	thumbnailUri?: string
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
						muted={false}
						source={{
							uri: props.uri,
						}}
						poster={props.thumbnailUri}
						paused={pause}
						flex={1}
						onProgress={e => {
							videoProgressRef.current?.set(
								(e.currentTime / e.seekableDuration) * 100
							)
							videoTimeRef.current?.setText(
								timeStyle(e.seekableDuration - e.currentTime)
							)
						}}
					/>
					<VideoTime ref={videoTimeRef} />
				</Box>
			</Pressable>
			<VideoProgress ref={videoProgressRef} />
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

type VideoProgressRef = {
	set(v: number): void
}

const VideoProgress = forwardRef<VideoProgressRef>(function VideoProgress(
	props,
	ref
) {
	const [progress, setProgress] = useState(0)
	useImperativeHandle(
		ref,
		() => ({
			set: setProgress,
		}),
		[]
	)
	return (
		<Progress
			height={'3px'}
			rounded={'0px'}
			colorScheme={'red'}
			value={progress}
		/>
	)
})
