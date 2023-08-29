import { Progress } from 'native-base'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

export default forwardRef<VideoProgressRef, VideoProgressProps>(function VideoProgress(props, ref) {
	const [progress, setProgress] = useState(0)
	const width = useRef(0)
	useImperativeHandle(
		ref,
		() => ({
			set: setProgress,
		}),
		[]
	)
	return (
		<Progress
			onLayout={e => {
				width.current = e.nativeEvent.layout.width
			}}
			onTouchMove={e => {
				if (width.current !== 0) {
					const ratio = e.nativeEvent.locationX / width.current
					props.onSeek?.(ratio)
				}
			}}
			backgroundColor={'#0000'}
			height={'13px'}
			paddingBottom={'10px'}
			rounded={'0px'}
			colorScheme={'red'}
			value={progress}
		/>
	)
})

export type VideoProgressRef = {
	set(v: number): void
}

export type VideoProgressProps = {
	onSeek?: (v: number) => void
}
