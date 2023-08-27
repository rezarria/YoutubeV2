import { Text } from 'native-base'

export default function CommentCount(props: { value?: number }) {
	return <Text color={'#6C6C6C'}>{props.value}</Text>
}
