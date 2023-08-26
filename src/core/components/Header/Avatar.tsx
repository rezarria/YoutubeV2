import { Box, Image } from 'native-base'

export default function Avatar(props: { avatarUri?: string }) {
	return (
		<Box
			width={'24px'}
			height={'24px'}
			borderRadius={'12px'}
			overflow={'hidden'}
			backgroundColor={'#000'}
		>
			{props.avatarUri && (
				<Image
					flex={1}
					source={{ uri: props.avatarUri }}
					alt={'avatar'}
				/>
			)}
		</Box>
	)
}
