import { Text, VStack } from 'native-base'
import { ReactNode } from 'react'

export default function CommentsSection(props: { children?: ReactNode }) {
	return (
		<VStack
			padding={'12px'}
			borderTopWidth={'1px'}
			borderTopColor={'#cecece'}
		>
			<Text
				fontSize={'12px'}
				fontWeight={'400'}
				lineHeight={'14px'}
				color={'#0A0A0A'}
			>
				Comments <Text color={'#6C6C6C'}>{props.children ?? 0}</Text>
			</Text>
		</VStack>
	)
}
