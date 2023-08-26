import useCountViews from '@src/hooks/useCountViews'

export default function ViewsCount(props: { videoid?: string }) {
	const views = useCountViews(props.videoid)
	return <>{views}</>
}
