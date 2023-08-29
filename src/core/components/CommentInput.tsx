import { HStack, Input, Pressable } from 'native-base'
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'
import SendLogo from '@assets/svg/send.svg'

export default function CommentInput(props: {
	onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
}) {
	return (
		<HStack justifyContent={'space-between'}>
			<Input
				onEndEditing={props.onSubmitEditing}
				flex={1}
			/>
			<Pressable>
				<SendLogo
					width={'20px'}
					height={'20px'}
					fill={'#cecece'}
				/>
			</Pressable>
		</HStack>
	)
}
