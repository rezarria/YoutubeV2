import { Box, Factory, Image } from 'native-base'
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'
import None from '@assets/svg/none.svg'

export type ThumbnailProps = { uri?: string }
export type ThumbnailRef = {
	show(): void
	hide(): void
	toggle(): void
}

const NBNoneSvg = Factory(None)

function Thumbnail(props: ThumbnailProps, ref: ForwardedRef<ThumbnailRef>) {
	const [show, setShow] = useState(true)
	useImperativeHandle(
		ref,
		() => ({
			show() {
				setShow(true)
			},
			hide() {
				setShow(false)
			},
			toggle() {
				setShow(v => !v)
			},
		}),
		[]
	)
	return (
		<Box
			display={show ? 'flex' : 'none'}
			position={'absolute'}
			zIndex={1}
			width={'100%'}
			height={'100%'}
		>
			{props.uri ? (
				<Image
					source={{ uri: props.uri }}
					alt={'thumbnail'}
					flex={1}
				/>
			) : (
				<Box
					flex={1}
					backgroundColor={'#fff'}
				>
					<NBNoneSvg flex={1} />
				</Box>
			)}
		</Box>
	)
}

export default forwardRef<ThumbnailRef, ThumbnailProps>(Thumbnail)
