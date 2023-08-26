import { useEffect, useState } from 'react'
import storage from '@react-native-firebase/storage'
import config from '@src/../config'

export default function useFile(fileUri?: string) {
	const [fileUrl, setFileUrl] = useState<string>()
	useEffect(() => {
		if (config.download && fileUri) {
			storage().ref(fileUri).getDownloadURL().then(setFileUrl)
		}
	}, [fileUri])
	return fileUrl
}
