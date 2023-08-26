import { forwardRef } from 'react'
import { VideoRef } from '@core/components/Video/Video'
import { Video } from '@core/components/Video'
import { useFile } from '@src/hooks'

export const VideoPart = forwardRef<VideoRef, { videoUri?: string }>(
	function VideoPart(props, ref) {
		const videoUri =
			useFile(props.videoUri) ??
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
		return (
			<>
				{videoUri && (
					<Video
						ref={ref}
						uri={videoUri}
					/>
				)}
			</>
		)
	}
)
