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

    const features=["followers","following","gists","repos","starred"];

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
        <div className="main" style={{background:"#fff",boxShadow:"1px solid #333",margin:"20pt",padding:"20pt"}}>
            <div className="form">
            <Form onSubmit={getData} >
					<FormGroup row>
						<Label for='username1' className='offset-md-1' >
							<span className='float-left float-md-right'>Username 1: </span>
						</Label>
						<Col className='mb-2 mb-md-0'>
							<InputGroup>
								<InputGroupAddon addonType='prepend'>
									<Button className='bg-light text-dark font-weight-bold border'>@</Button>
								</InputGroupAddon>
								<Input type='text' required
									value={username1} onChange={updateUsername1}/>
							</InputGroup>
						</Col>
                        <Label for='username2' className='offset-md-1'>
							<span className='float-left float-md-right'>Username 2: </span>
						</Label>
						<Col className='mb-2 mb-md-0'>
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
                {info1 && info2 ?
                <div className="comparisonTable" style={{textAlign:"center"}}>
                    <table className="table table-responsive table-hover ">
                        <thead>
                            <tr>
                                <th>Feature :</th>
                                <th>{username1}</th>
                                <th>{username2}</th>
                            </tr>

                        </thead>
                        <tbody>
                                <tr>
                                    <td>Followers</td>
                                    <td>{info1.followers.length}</td>
                                    <td>{info2.followers.length}</td>

                                </tr>
                                <tr>
                                    <td>Following</td>
                                    <td>{info1.following.length}</td>
                                    <td>{info2.following.length}</td>

                                </tr>
                                <tr>
                                    <td>Gists</td>
                                    <td>{info1.gists.length}</td>
                                    <td>{info2.gists.length}</td>

                                </tr>
                                <tr>
                                    <td>Repos</td>
                                    <td>{info1.repos.length}</td>
                                    <td>{info2.repos.length}</td>

                                </tr>
                                <tr>
                                    <td>Starred</td>
                                    <td>{info1.starred.length}</td>
                                    <td>{info2.starred.length}</td>

                                </tr>
                            

                        </tbody>
                    </table>

                </div>
                :""}
            </div>
        </div>

    );

};
export default Compare;