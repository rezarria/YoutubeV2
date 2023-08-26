import {
	ForwardedRef,
	ReactNode,
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import { Box } from 'native-base'
import { NBVideo } from '@core/components/type'
import Thumbnail, { ThumbnailRef } from './Thumbnail'
import { Pressable } from 'react-native'

export type VideoProps = {
	videoUri?: string
	title?: string
	time?: number
	thumbnailUri?: string
	avatarUri?: string
	children?: ReactNode
}

export type VideoRef = {
	play(): void
	stop(): void
}

function VideoSection(props: VideoProps, ref: ForwardedRef<VideoRef>) {
	const [play, setPlay] = useState(false)
	const thumbnalRef = useRef<ThumbnailRef>(null)
	const videoRef = useRef<VideoRef>(null)

	useImperativeHandle(
		ref,
		() => ({
			play() {
				setPlay(true)
			},
			stop() {
				setPlay(false)
			},
		}),
		[]
	)

	return (
		<Box
			paddingTop={'6px'}
			backgroundColor={'#fff'}
		>
			<VideoPart
				{...props}
				setPlay={setPlay}
				thumbnalRef={thumbnalRef}
				videoRef={videoRef}
				play={play}
			/>
			{props.children}
		</Box>
	)
}

export default forwardRef<VideoRef, VideoProps>(VideoSection)

function VideoPart(
	props: VideoProps & {
		setPlay: React.Dispatch<React.SetStateAction<boolean>>
		thumbnalRef: React.RefObject<ThumbnailRef>
		videoRef: React.RefObject<VideoRef>
		play: boolean
	}
) {
	return (
		<Pressable
			onPress={() => {
				if (props.videoUri) {
					props.setPlay(i => {
						props.thumbnalRef.current?.toggle()
						return !i
					})
				}
			}}
		>
			<Box
				height={'215px'}
				width={'100%'}
			>
				{props.videoUri && (
					<NBVideo
						ref={props.videoRef}
						repeat={true}
						source={{ uri: props.videoUri }}
						muted={true}
						paused={!props.play}
						resizeMode={'cover'}
						zIndex={0}
						flex={1}
					/>
				)}
				<Thumbnail
					ref={props.thumbnalRef}
					uri={props.thumbnailUri}
				/>
			</Box>
		</Pressable>
	)
}
