const Visualization = (props) => {

	return <pre className='text-left'>{JSON.stringify(props.data, null, '    ')}</pre>; // TODO
}

export default Visualization;