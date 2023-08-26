import { Text, VStack } from 'native-base'
import Svg, { Path } from 'react-native-svg'
import { Pressable } from 'react-native'

export default function DislikeButton(props: {
	value?: number
	onPress?: () => void
}) {
	return (
		<Pressable onPress={props.onPress}>
			<VStack alignItems={'center'}>
				<Svg
					width={'24px'}
					height={'24px'}
					viewBox={'0 0 24 24'}
					fill={'none'}
				>
					<Path
						d={
							'M17.0001 4H16.0001L6.57007 4C5.50007 4 4.59007 4.67 4.38007 5.61L3.04007 11.61C2.77007 12.85 3.82007 14 5.23007 14H9.46007L7.94007 18.94C7.62007 19.97 8.46007 21 9.62007 21C10.2001 21 10.7601 20.76 11.1401 20.35L17.0001 14H21.0001V4H17.0001ZM10.4001 19.67C10.2101 19.88 9.92007 20 9.62007 20C9.36007 20 9.12007 19.89 8.99007 19.7C8.92007 19.6 8.84007 19.44 8.90007 19.23L10.4201 14.29L10.8201 13L9.46007 13H5.23007C4.82007 13 4.43007 12.83 4.20007 12.54C4.08007 12.39 3.95007 12.14 4.02007 11.82L5.36007 5.82C5.46007 5.35 5.97007 5 6.57007 5L16.0001 5V13.61L10.4001 19.67ZM20.0001 13H17.0001V5H20.0001V13Z'
						}
						fill={'#0A0A0A'}
					/>
				</Svg>
				<Text variant={'videoButtonTitle'}>{props.value}</Text>
			</VStack>
		</Pressable>
	)
}
