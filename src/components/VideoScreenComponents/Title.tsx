import { HStack, Text, VStack } from 'native-base'
import MoreButton from './MoreButton'

export default function Title(props: {
	title?: string
	like?: number
	views?: number
	time?: number
}) {
	return (
		<HStack
			width={'100%'}
			paddingX={'12px'}
			paddingY={'16px'}
			space={'8px'}
			justifyContent={'space-between'}
		>
			<VStack flex={1}>
				<Text
					lineBreakMode={'clip'}
					fontSize={'16px'}
					fontWeight={'500'}
				>
					{props.title}
				</Text>
				<Text>
					{`${props.views} views - Premiered ${new Date(
						props.time ?? 0
					).toLocaleDateString()}`}
				</Text>
			</VStack>
			<MoreButton />
		</HStack>
	)
}
