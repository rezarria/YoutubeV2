import { ImageSVG } from '@shopify/react-native-skia'
import useSVG from '@core/hooks/useSVG'
import { Box } from 'native-base'
import { NBCanvas } from '@core/components/type'

export default function More() {
	const svg = useSVG('custom/more.svg')
	return (
		<Box
			width={'24px'}
			height={'24px'}
		>
			<NBCanvas flex={1}>
				<ImageSVG svg={svg} />
			</NBCanvas>
		</Box>
	)
}
