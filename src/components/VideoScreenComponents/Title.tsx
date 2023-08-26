import { HStack, Text, VStack } from 'native-base'
import MoreButton from './MoreButton'
import ViewsCount from './ViewsCount'

export default function Title(props: {
	title?: string
	like?: number
	videoId?: string
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
					<ViewsCount videoid={props.videoId} />
					{` views - Premiered ${new Date(
						props.time ?? 0
					).toLocaleDateString()}`}
				</Text>
			</VStack>
			<MoreButton />
		</HStack>
	)
}
