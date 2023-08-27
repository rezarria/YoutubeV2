import { CommentType } from '@core/model'
import { useUser } from '@src/hooks'
import { Avatar, HStack, Image, Text } from 'native-base'

export default function Comment(props: { comment: CommentType }) {
	const user = useUser(props.comment.userId)
	return (
		<HStack
			space={'13px'}
			marginY={'8px'}
		>
			<Avatar
				width={'36px'}
				height={'36px'}
				overflow={'hidden'}
			>
				{user?.avatar && (
					<Image
						width={'100%'}
						height={'100%'}
						source={{ uri: user.avatar }}
						alt={'avatar'}
					/>
				)}
			</Avatar>
			<Text
				fontSize={'12px'}
				color={'#0a0a0a'}
			>
				{props.comment.content}
			</Text>
		</HStack>
	)
}
