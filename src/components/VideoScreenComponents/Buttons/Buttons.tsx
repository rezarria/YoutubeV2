import { Box, HStack, Pressable, Text, VStack } from 'native-base'
import { Video as VideoModel } from '@core/model'
import Svg, { Path } from 'react-native-svg'
import Share from '@assets/svg/share.svg'
import AddToList from '@assets/svg/addToList.svg'
import LikeGroup from './LikeGroup'

export default function Buttons(props: { data?: VideoModel }) {
	return (
		<Box
			borderColor={'#cecece'}
			paddingX={'28px'}
			paddingTop={'28px'}
			paddingBottom={'12px'}
			borderTopWidth={'0.5px'}
			borderBottomWidth={'0.5px'}
			width={'100%'}
		>
			<HStack
				width={'100%'}
				justifyContent={'space-between'}
				alignItems={'center'}
				alignContent={'stretch'}
				height={'42px'}
			>
				<LikeGroup data={props.data} />
				<Pressable>
					<VStack
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Svg
							width={'25'}
							height={'24'}
							viewBox={'0 0 25 24'}
							fill={'none'}
						>
							<Path
								d={
									'M15.5 5.63L21.16 12L15.5 18.37V15V14H14.5C10.54 14 7.36 15 4.75 17.09C6.59 13.02 9.86 10.69 14.64 9.99L15.5 9.86V9V5.63ZM14.5 3V9C6.72 10.13 3.61 15.33 2.5 21C5.28 17.03 8.94 15 14.5 15V21L22.5 12L14.5 3Z'
								}
								fill={'#0A0A0A'}
							/>
						</Svg>
						<Text variant={'videoButtonTitle'}>Share</Text>
					</VStack>
				</Pressable>
				<Pressable>
					<VStack
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Share />
						<Text variant={'videoButtonTitle'}>Download</Text>
					</VStack>
				</Pressable>
				<Pressable>
					<VStack
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<AddToList />
						<Text variant={'videoButtonTitle'}>Save</Text>
					</VStack>
				</Pressable>
			</HStack>
		</Box>
	)
}
