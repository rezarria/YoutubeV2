import { Text, VStack } from 'native-base'
import Svg, { Path } from 'react-native-svg'
import { Pressable } from 'react-native'

export default function LikeButton(props: { value?: number; onPress?: () => void }) {
	return (
		<Pressable onPress={props.onPress}>
			<VStack
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Svg
					width={'25px'}
					height={'24px'}
					viewBox={'0 0 25 24'}
					fill={'none'}
				>
					<Path
						d={
							'M7.49993 20L8.49993 20L17.9299 20C18.9999 20 19.9099 19.33 20.1199 18.39L21.4599 12.39C21.7299 11.15 20.6799 10 19.2699 10L15.0399 10L16.5599 5.06C16.8799 4.03 16.0399 3 14.8799 3C14.2999 3 13.7399 3.24 13.3599 3.65L7.49993 10L3.49993 10L3.49993 20L7.49993 20ZM14.0999 4.33C14.2899 4.12 14.5799 4 14.8799 4C15.1399 4 15.3799 4.11 15.5099 4.3C15.5799 4.4 15.6599 4.56 15.5999 4.77L14.0799 9.71L13.6799 11L15.0399 11L19.2699 11C19.6799 11 20.0699 11.17 20.2999 11.46C20.4199 11.61 20.5499 11.86 20.4799 12.18L19.1399 18.18C19.0399 18.65 18.5299 19 17.9299 19L8.49993 19L8.49993 10.39L14.0999 4.33ZM4.49993 11L7.49993 11L7.49993 19L4.49993 19L4.49993 11Z'
						}
						fill={'#0A0A0A'}
					/>
				</Svg>
				<Text variant={'videoButtonTitle'}>{props.value}</Text>
			</VStack>
		</Pressable>
	)
}
