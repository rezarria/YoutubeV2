import CustomTheme from '@src/theme'

type CustomThemeType = typeof CustomTheme

declare module 'native-base' {
	interface ICustomTheme extends CustomThemeType {}
}
