import { ImageSVG } from '@shopify/react-native-skia'
import { memo } from 'react'
import useSVG from '@core/hooks/useSVG'
import { Box } from 'native-base'
import { NBCanvas } from '@core/components/type'

type SectionType = { uri: any }

function Section(props: SectionType) {
	const svg = useSVG(props.uri)
	return (
		<Box
			width={'24px'}
			height={'24px'}
		>
			<NBCanvas flex={1}>
				<ImageSVG
					svg={svg}
					width={24}
					height={2}
				/>
			</NBCanvas>
		</Box>
	)
}

export default memo(Section)
