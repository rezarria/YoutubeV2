import { Box, Button, Input, ScrollView, Text, VStack } from 'native-base'
import { useState } from 'react'
import { TextInput } from 'react-native'
import { DocumentPickerResponse, pickSingle } from 'react-native-document-picker'
import { upload } from '@core/utils/upload'

export default function UploadTabScreen() {
	const [file, setFile] = useState<DocumentPickerResponse>()
	const [picture, setPicture] = useState<DocumentPickerResponse>()
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	return (
		<Box
			flex={1}
			padding={'16px'}
			backgroundColor={'#fff'}
		>
			<ScrollView flex={1}>
				<VStack space={'6px'}>
					<SelectThumnalButton setFile={setPicture} />
					<SelectVideoButton setFile={setFile} />
					{file && (
						<Text
							textAlign={'center'}
							marginTop={'8px'}
							fontSize={'2xl'}
						>
							{file?.name}
						</Text>
					)}
					<Box>
						<Text>Tiêu đề</Text>
						<Input
							value={name}
							onChangeText={setName}
						/>
					</Box>
					<Box>
						<Text>Mô tả</Text>
						<Box
							borderWidth={'1px'}
							borderStyle={'solid'}
							borderColor={'#cececeef'}
							borderRadius={'4px'}
						>
							<TextInput
								value={description}
								numberOfLines={12}
								textAlign={'left'}
								textAlignVertical={'top'}
								onChangeText={setDescription}
							/>
						</Box>
					</Box>
					<UploadButton {...{ file, name, description, picture }} />
				</VStack>
			</ScrollView>
		</Box>
	)
}

function UploadButton(props: {
	file: DocumentPickerResponse | undefined
	picture: DocumentPickerResponse | undefined
	name: string
	description: string
}) {
	return (
		<Button
			backgroundColor={'red.500'}
			onPress={() => {
				if (props.file != null && props.name.length !== 0) {
					console.debug('bắt đầu upload')
					upload({
						name: props.name,
						videoUri: props.file.uri,
						thumbnailUri: props.picture?.uri,
						description: props.description.length === 0 ? undefined : props.description,
						onVideoProgress: info => {
							console.info(`video tải lên ${(100 * info.bytesTransferred) / info.totalBytes} %`)
						},
						onThumbnailProgress: info => {
							console.info(`thumbnail tải lên ${(100 * info.bytesTransferred) / info.totalBytes} %`)
						},
					})
				}
			}}
		>
			Upload
		</Button>
	)
}

const SelectVideoButton = createSelectFileButton('Chọn video', 'video/mp4')
const SelectThumnalButton = createSelectFileButton('Chọn thumbnail', 'image/*')

function createSelectFileButton(title: string, type: string) {
	return (props: { setFile: React.Dispatch<React.SetStateAction<DocumentPickerResponse | undefined>> }) => {
		return (
			<Button
				backgroundColor={'red.500'}
				onPress={() => {
					pickSingle({
						allowMultiSelection: false,
						type,
					})
						.then(i => {
							console.debug(JSON.stringify(i))
							props.setFile(i)
						})
						.catch()
				}}
			>
				{title}
			</Button>
		)
	}
}
