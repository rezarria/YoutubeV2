import { useObserverComment } from '@src/hooks'
import { FlatList, HStack, Text, VStack } from 'native-base'
import { ReactNode } from 'react'
import CommentCount from './CommentCount'
import Comment from './Comment'
import Svg, { Path } from 'react-native-svg'

export default function CommentsSection(props: { children?: ReactNode; videoId?: string }) {
	const data = useObserverComment(props.videoId)
	return (
		<VStack
			padding={'12px'}
			borderTopWidth={'1px'}
			borderTopColor={'#cecece'}
		>
			<HStack justifyContent={'space-between'}>
				<Text
					fontSize={'12px'}
					fontWeight={'400'}
					lineHeight={'14px'}
					color={'#0A0A0A'}
				>
					Comments <CommentCount value={data.length} />
				</Text>
				<Svg
					width={'10px'}
					height={'16px'}
					viewBox={'0 0 10 16'}
					fill={'none'}
				>
					<Path
						d={'M8.125 9.75006L5 12.8751L1.875 9.75006'}
						stroke={'#6C6C6C'}
						stroke-width={'1.5px'}
						stroke-linecap={'round'}
						stroke-linejoin={'round'}
					/>
					<Path
						d={'M1.875 6.25006L5 3.12506L8.125 6.25006'}
						stroke={'#6C6C6C'}
						stroke-width={'1.5px'}
						stroke-linecap={'round'}
						stroke-linejoin={'round'}
					/>
				</Svg>
			</HStack>
			<FlatList
				paddingY={'8px'}
				data={data}
				renderItem={({ item }) => <Comment comment={item} />}
				keyExtractor={i => i.id!}
			/>
		</VStack>
	)
}
