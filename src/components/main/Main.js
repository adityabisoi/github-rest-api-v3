import { useState } from 'react';
import { Input, Form, FormGroup, Label,
	Col,
	Button,
	InputGroup,
	InputGroupAddon} from 'reactstrap';
import api from '../../services/Github';
import Visualization from '../Visualization';
import './main.css';
const Main = () => {
	const [username, setUsername] = useState('');
	const [info, setInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [validUsername, setValidUsername] = useState(true);

	const updateUsername = (e) => setUsername(e.target.value);

	const sendUsername = (e) => {
		e.preventDefault();
		setLoading(true);
		api.getDetails(username)
			.then(data => {
				setInfo(data);
				setValidUsername(true);
				setLoading(false);
				return data;
			})
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
				if(err.response.status === 403) {
					console.log('Rate limit exceeded');
				} else if (err.response.status === 404) {
					setValidUsername(false);
					setLoading(false);
				}
			});
	};

	return (
		<div className='w-100'>
			<main className="Main border container-fluid bg-light p-md-5 pt-3 align-items-center">
				<Form onSubmit={sendUsername}>
					<FormGroup row>
						<Label data-testid='main-text' for='username' className='offset-md-1' xs={12} md={1}>
							<span className='float-left float-md-right'>Username: </span>
						</Label>
						<Col xs={12} md={8} className='mb-2 mb-md-0'>
							<InputGroup>
								<InputGroupAddon addonType='prepend'>
									<Button className='bg-light text-dark font-weight-bold border'>@</Button>
								</InputGroupAddon>
								{
									validUsername?
										<Input type='text' required value={username} onChange={updateUsername}/> :
										<Input type='text' className="form-control is-invalid" required value={username} onChange={updateUsername}/>
								}
							</InputGroup>
						</Col>
						<Col xs={12} md={2} className='mb-1 mb-md-0' >
							<Button block type='submit' color='primary'>Submit</Button>
						</Col>
						{/*Alert box for wrong username*/
							validUsername? "" :
							<Col xs={8} md={6} className='alert alert-danger offset-md-3 offset-2' >
								<span>Username doesn't exist.</span>
							</Col>
						}
					</FormGroup>
				</Form>
				{
					loading?
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div> :
						<Visualization data={info}/>
				}
			</main>
		</div>
	);
};

export default Main;
