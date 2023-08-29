import { HStack, Input, Pressable } from 'native-base'
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'
import SendLogo from '@assets/svg/send.svg'
import { forwardRef, useImperativeHandle, useState } from 'react'

export type CommentInputRef = {
	clearText: () => void
}
export type CommentInputProps = {
	onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
}

export default forwardRef<CommentInputRef, CommentInputProps>(function CommentInput(props, ref) {
	const [text, setText] = useState('')
	useImperativeHandle(
		ref,
		() => ({
			clearText: () => {
				console.debug('clear text')
				setText('')
			},
		}),
		[]
	)
	return (
		<HStack justifyContent={'space-between'}>
			<Input
				value={text}
				onChangeText={setText}
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
})
