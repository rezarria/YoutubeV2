import { Avatar, Image } from 'native-base'

export default function AvatarSection(props: { avatar?: string }) {
	return (
		<Avatar
			height={'36px'}
			width={'36px'}
			overflow={'hidden'}
		>
			{props.avatar && (
				<Image
					resizeMethod={'scale'}
					resizeMode={'contain'}
					height={'36px'}
					width={'36px'}
					source={{ uri: props.avatar }}
					alt={'avatar'}
				/>
			)}
		</Avatar>
	)
}
