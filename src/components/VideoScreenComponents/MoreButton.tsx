import Svg, { Path } from 'react-native-svg'

export default function MoreButton() {
	return (
		<Svg
			width={'20'}
			height={'20'}
			viewBox={'0 0 20 20'}
			fill={'none'}
		>
			<Path
				d={'M16.25 7.5L10 13.75L3.75 7.5'}
				stroke={'#0A0A0A'}
				stroke-width={'1.5'}
				stroke-linecap={'round'}
				stroke-linejoin={'round'}
			/>
		</Svg>
	)
}
