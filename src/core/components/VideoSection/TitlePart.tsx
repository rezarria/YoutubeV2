import { HStack, VStack, Text, Pressable } from 'native-base'
import Avatar from './Avatar'
import More from './More'
import { GestureResponderEvent } from 'react-native'

export type TitlePartProps = {
	avatarUri?: string
	title?: string
	views?: number
	time?: number
	onPress?: ((event: GestureResponderEvent) => void) | null
}

export default function TitlePart(props: TitlePartProps) {
	return (
		<Pressable onPress={props.onPress}>
			<HStack
				paddingY={'14px'}
				paddingX={'12px'}
				space={'12px'}
				backgroundColor={'#fff'}
			>
				<Avatar userUri={props.avatarUri} />
				<VStack
					space={'8px'}
					flex={1}
				>
					<Text
						fontWeight={700}
						color={'#0A0A0A'}
					>
						{props.title}
					</Text>
					<HStack space={'4px'}>
						<Text
							fontWeight={500}
							color={'#0A0A0A'}
						>
							{props.views ?? 0} views
						</Text>
						<Text
							fontWeight={500}
							color={'#0A0A0A'}
						>
							{new Date(props.time ?? 0)
								.toLocaleDateString()
								.replace('//', ' . ')}
						</Text>
					</HStack>
				</VStack>
				<More />
			</HStack>
		</Pressable>
	)
}
