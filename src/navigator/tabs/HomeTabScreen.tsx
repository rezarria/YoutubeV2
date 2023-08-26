import CategoriesBar from '@core/components/CategoriesBar'
import { VideoSection } from '@components/VideoSection'
import { Box, FlatList, ScrollView } from 'native-base'
import { useAppSelecter } from '@core/hooks'
import { Header } from '@core/components/Header'

export type HomeTabProps = {}

const HomeTabScreen = () => {
	return (
		<Box
			flex={1}
			backgroundColor={'#ececec'}
		>
			<Header />

			<CategoriesBar />
			<ScrollView>
				<VideoList />
			</ScrollView>
		</Box>
	)
}

export default HomeTabScreen
function VideoList() {
	const videos = useAppSelecter(e => e.videos.data)
	return (
		<FlatList
			scrollEnabled={false}
			data={videos}
			renderItem={({ item }) => <VideoSection data={item} />}
			keyExtractor={item => item.id!}
			ItemSeparatorComponent={Gap()}
		/>
	)
}

function Gap() {
	return () => <Box paddingTop={'6px'} />
}
