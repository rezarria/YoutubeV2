import { useObserverComment } from '@src/hooks'
import { FlatList } from 'native-base'

export default function CommentList(props: { videoId?: string }) {
	const data = useObserverComment(props.videoId)
	return (
		<FlatList
			data={data}
			renderItem={({}) => <></>}
			keyExtractor={i => i.id}
		/>
	)
}
