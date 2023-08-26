import { Box, Image } from 'native-base'

export default function Avatar(props: { userUri?: string }) {
	return (
		<Box
			backgroundColor={'#000'}
			width={'36px'}
			height={'36px'}
			borderRadius={'18px'}
			overflow={'hidden'}
		>
			{props.userUri && (
				<Image
					flex={1}
					source={{ uri: props.userUri }}
					alt={'avatar'}
				/>
			)}
		</Box>
	)
}
