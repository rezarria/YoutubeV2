module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@components': './src/components',
					'@core': './src/core',
					'@assets': './assets',
					'@src': './src',
				},
			},
		],
	],
}
