import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'
import { Video } from '../model'
import auth from '@react-native-firebase/auth'
import uuid from 'react-native-uuid'

export type UploadVideoParams = {
	uri: string
	onProgress?(info: FirebaseStorageTypes.TaskSnapshot): void
}

function uploadFile(path: string) {
	return async ({ uri, onProgress }: UploadVideoParams) => {
		const uploadTask = storage().ref(`${path}/${uuid.v4()}`).putFile(uri)
		uploadTask.on('state_changed', onProgress)
		console.debug(`bắt đầu tải lên ${uri}`)
		return await uploadTask
	}
}

function insertDB(
	name: string,
	result: FirebaseStorageTypes.TaskSnapshot,
	thumbnalResult?: FirebaseStorageTypes.TaskSnapshot,
	description?: string
) {
	const info: Video = {
		name,
		time: Date.now(),
		userId: auth().currentUser?.uid,
		thumbnailUri: thumbnalResult?.metadata.fullPath,
		views: 0,
		like: 0,
		unlike: 0,
		videoUri: result.metadata.fullPath,
		description,
	}
	const videoInfo = database().ref('video').push(info)
	console.debug(`tạo video mới với id ${videoInfo.key}`)
}

export const uploadVideo = uploadFile('video')
export const uploadThumbnail = uploadFile('thumbnail')
export function upload(params: {
	name: string
	description?: string
	videoUri: string
	thumbnailUri?: string
	onVideoProgress?(info: FirebaseStorageTypes.TaskSnapshot): void
	onThumbnailProgress?(info: FirebaseStorageTypes.TaskSnapshot): void
}) {
	const videoTask = uploadVideo({
		uri: params.videoUri,
		onProgress: params.onVideoProgress,
	})

	const thumbnailTask = params.thumbnailUri
		? uploadThumbnail({
				uri: params.thumbnailUri,
				onProgress: params.onThumbnailProgress,
		  })
		: Promise.resolve(undefined)

	return Promise.all([videoTask, thumbnailTask]).then(results => {
		insertDB(params.name, results[0], results[1])
	})
}
