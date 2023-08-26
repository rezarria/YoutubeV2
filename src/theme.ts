import { extendTheme } from 'native-base'

const CustomTheme = extendTheme({
	components: {
		Text: {
			variants: {
				buttonTitle: {
					color: '#000',
					fontFamily: 'Roboto',
					fontSize: '14px',
					fontStyle: 'normal',
					fontWeight: '800',
				},
				videoButtonTitle: {
					fontSize: '12px',
					fontWeight: '400',
				},
			},
		},
		HStack: {
			baseStyle: {},
			defaultProps: {},
			variants: {
				buttonIcon: {
					padding: '8px',
					backgroundColor: '#ECECEC',
					borderRadius: 4,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
			},
		},
	},
})

export default CustomTheme
