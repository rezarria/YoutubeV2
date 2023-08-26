import Avatar from './Avatar'
import Section from './Section'
import { Box, HStack, Image } from 'native-base'
import auth from '@react-native-firebase/auth'
import { useUser } from '@components/VideoSection/hook'

export default function Header() {
	const user = useUser(auth().currentUser?.uid)
	return (
		<Box
			backgroundColor={'#fff'}
			padding={'12px'}
		>
			<HStack justifyContent={'space-between'}>
				<Image
					width={'90px'}
					height={'20px'}
					alt={'youtube logo'}
					source={require('@assets/img/youtube.png')}
				/>
				<HStack space={'12px'}>
					<Section uri={'custom/chromecast.svg'} />
					<Section uri={'custom/notification.svg'} />
					<Section uri={'custom/search.svg'} />
					<Avatar avatarUri={user?.avatar} />
				</HStack>
			</HStack>
		</Box>
	)
}
