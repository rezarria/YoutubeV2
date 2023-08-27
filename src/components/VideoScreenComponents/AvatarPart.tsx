import { HStack, Text, VStack } from 'native-base'
import { Pressable } from 'react-native'
import { useUser } from '@src/hooks'
import AvatarSection from './AvatarSection'

export default function AvatarPart(props: { userId?: string }) {
	const user = useUser(props.userId)
	return (
		<HStack
			paddingY={'12.5px'}
			borderColor={'#cecece'}
			borderWidth={'0.5px'}
			paddingX={'12px'}
			width={'100%'}
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<HStack
				space={'16px'}
				alignItems={'center'}
			>
				<AvatarSection avatar={user?.avatar} />
				<VStack space={'4px'}>
					<Text
						fontSize={'16px'}
						fontWeight={'400'}
						color={'#0a0a0a'}
					>
						{user?.name}
					</Text>
					<Text
						fontSize={'12px'}
						fontWeight={'400'}
						color={'#6c6c6c'}
					>
						{user?.sub}
					</Text>
				</VStack>
			</HStack>
			<Pressable>
				<Text
					color={'#f00'}
					fontSize={'14px'}
					fontWeight={'500'}
					paddingRight={'16px'}
				>
					SUBSCRIBLE
				</Text>
			</Pressable>
		</HStack>
	)
}
