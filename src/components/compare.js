import { useState } from 'react';
import { Input, Form, FormGroup, Label,
	Col, 
	Button,
	InputGroup,
	InputGroupAddon} from 'reactstrap';
import api from '../services/GitHub';
import Visualization from './visualization';
import './main.css';

const Compare =()=>{

    const [username1,setUsername1]=useState('');
    const [username2,setUsername2]=useState('');
    const [info1,setInfo1]=useState('');
    const [info2,setInfo2]=useState('');

    const updateUsername1 =(e)=>setUsername1(e.target.value);
    const updateUsername2 =(e)=>setUsername2(e.target.value);

    const getData = (e) =>{
        e.preventDefault();
        api.getDetails(username1)
			.then(data => {
				setInfo1(data);
				return data;
			})
			.then(data => console.log("data 1",data))
            .catch(err => console.log(err));
        api.getDetails(username2)
			.then(data => {
				setInfo2(data);
				return data;
			})
			.then(data => console.log("data2",data))
			.catch(err => console.log(err));

    }

    return(
        <div className="main">
            <div className="form">
            <Form onSubmit={getData}>
					<FormGroup row>
						<Label for='username1' className='offset-md-1' xs={12} md={1}>
							<span className='float-left float-md-right'>Username 1: </span>
						</Label>
						<Col xs={12} md={8} className='mb-2 mb-md-0'>
							<InputGroup>
								<InputGroupAddon addonType='prepend'>
									<Button className='bg-light text-dark font-weight-bold border'>@</Button>
								</InputGroupAddon>
								<Input type='text' required
									value={username1} onChange={updateUsername1}/>
							</InputGroup>
						</Col>
                        <Label for='username2' className='offset-md-1' xs={12} md={1}>
							<span className='float-left float-md-right'>Username 2: </span>
						</Label>
						<Col xs={12} md={8} className='mb-2 mb-md-0'>
							<InputGroup>
								<InputGroupAddon addonType='prepend'>
									<Button className='bg-light text-dark font-weight-bold border'>@</Button>
								</InputGroupAddon>
								<Input type='text' required
									value={username2} onChange={updateUsername2}/>
							</InputGroup>
						</Col>
						<Col xs={12} md={2} className='mb-1 mb-md-0' >
							<Button block type='submit' color='primary'>Submit</Button>
						</Col>
					</FormGroup>
				</Form>
                <div className="comparisonTable">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Feature :</th>
                                <th>{username1}</th>
                                <th>{username2}</th>
                            </tr>

                        </thead>
                        <tbody>
                            {console.log({info1}.count())}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    );

};
export default Compare;