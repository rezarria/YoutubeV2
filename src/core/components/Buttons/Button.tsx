import { ImageSVG } from '@shopify/react-native-skia'

import useSVG from '@core/hooks/useSVG'
import { HStack, Pressable, Text } from 'native-base'
import { NBCanvas } from '../type'

type ButtonProps = {
	title?: string
	icon?: string
	main?: boolean
	border?: boolean
}

const Button = (props: ButtonProps) => {
	const icon = useSVG(props.icon)
	return (
		<Pressable>
			<HStack
				space={'10px'}
				variant={'buttonIcon'}
				backgroundColor={props.main ? '#3B3B3B' : undefined}
				paddingX={!props.icon ? '12px' : undefined}
				borderRadius={!props.icon ? '24px' : undefined}
				borderWidth={props.border ? '1px' : undefined}
				borderColor={props.border ? '#CECECE' : undefined}
			>
				{props.icon && (
					<NBCanvas
						width={'24px'}
						height={'24px'}
					>
						<ImageSVG
							svg={icon}
							width={24}
							height={24}
						/>
					</NBCanvas>
				)}
				<Text
					variant={'buttonTitle'}
					color={props.main ? '#fff' : undefined}
				>
					{props.title}
				</Text>
			</HStack>
		</Pressable>
	)
}

export default Button
