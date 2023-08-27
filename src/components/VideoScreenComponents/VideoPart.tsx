import { forwardRef } from 'react'
import { Video, VideoRef } from '@core/components/Video'
import { useFile } from '@src/hooks'

const VideoPart = forwardRef<VideoRef, { videoUri?: string; onEnd?: () => void }>(function VideoPart(props, ref) {
	const videoUri =
		useFile(props.videoUri) ?? 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
	return (
		<>
			{videoUri && (
				<Video
					ref={ref}
					uri={videoUri}
					onEnd={props.onEnd}
				/>
			)}
		</>
	)
})

export default VideoPart
