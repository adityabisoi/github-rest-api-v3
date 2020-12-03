import { useState } from 'react';
import { Input, Form, FormGroup, Label,
	Col, 
	Button,
	InputGroup,
	InputGroupAddon} from 'reactstrap';
import api from '../services/GitHub';
import Visualization from './visualization';
import './main.css';

const Main = () => {
	const [username, setUsername] = useState('');
	const [info, setInfo] = useState(null);

	const updateUsername = (e) => setUsername(e.target.value);

	const sendUsername = (e) => {
		e.preventDefault();
		api.getDetails(username)
			.then(data => {
				setInfo(data);
				return data;
			})
			.then(data => console.log(data))
			.catch(err => console.log(err));
	};

	return (
		<div className='w-100'>
			<main className="Main border container-fluid bg-light p-md-5 pt-3 align-items-center">
				<Form onSubmit={sendUsername}>
					<FormGroup row>
						<Label for='username' className='offset-md-1' xs={12} md={1}>
							<span className='float-left float-md-right'>Username: </span>
						</Label>
						<Col xs={12} md={8} className='mb-2 mb-md-0'>
							<InputGroup>
								<InputGroupAddon addonType='prepend'>
									<Button className='bg-light text-dark font-weight-bold border'>@</Button>
								</InputGroupAddon>
								<Input type='text' required
									value={username} onChange={updateUsername}/>
							</InputGroup>
						</Col>
						<Col xs={12} md={2} className='mb-1 mb-md-0' >
							<Button block type='submit' className='w-md-50' color='primary'>Submit</Button>
						</Col>
					</FormGroup>
				</Form>
				<Visualization data={info}/>
			</main>
		</div>
	);
};

export default Main;