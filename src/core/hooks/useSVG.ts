import { SkSVG, Skia } from '@shopify/react-native-skia'
import { useEffect, useState } from 'react'
import * as fs from 'react-native-fs'

const useSVG = (uri: string | undefined) => {
	const [svg, setSvg] = useState<SkSVG | null>(null)
	useEffect(() => {
		if (uri != null) {
			fs.readFileAssets(uri).then(data => {
				setSvg(Skia.SVG.MakeFromString(data))
			})
		}
	}, [uri])
	return uri ? svg : null
}

export default useSVG
