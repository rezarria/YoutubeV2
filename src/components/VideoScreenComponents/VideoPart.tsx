import { forwardRef } from 'react'
import { VideoRef } from '@core/components/Video/Video'
import { useFile } from '@components/VideoSection/hook'
import { Video } from '@core/components/Video'

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
