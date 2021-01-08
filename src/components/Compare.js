import { useState } from 'react';
import { Input, Form, FormGroup, Label,
	Col,
	Button,
	InputGroup,
	InputGroupAddon} from 'reactstrap';
import api from '../services/Github';
import './main/main.css';

const Compare =()=>{

    const [username1,setUsername1]=useState('');
    const [username2,setUsername2]=useState('');
		const [validUsername1, setValidUsername1] = useState(true);
		const [validUsername2, setValidUsername2] = useState(true);
    const [info1,setInfo1]=useState('');
    const [info2,setInfo2]=useState('');
    const [isloading,setIsloading]=useState('0');

    const updateUsername1 =(e)=>setUsername1(e.target.value);
    const updateUsername2 =(e)=>setUsername2(e.target.value);

    // const features=["followers","following","gists","repos","starred"];

    const getData = (e) =>{
        setIsloading('1');

        e.preventDefault();
        console.log("isloading",isloading);
        api.getDetails(username1)
			    .then(data => {
						setInfo1(nullToEmptyArr(data));
						setValidUsername1(true)
						return data;
			    })
			    .then(data => console.log("data 1",data))
			    .catch(err => {
				  console.log(err)
				  if(err.response.status === 403) {
					  console.log('Rate limit exceeded');
						setValidUsername1(true)
				  } else if (err.response.status === 404) {
						setValidUsername1(false)
				  }
			});

        api.getDetails(username2)
			  .then(data => {
				  setInfo2(nullToEmptyArr(data));
					setValidUsername2(true)
				  setIsloading('0');
				  return data;
		    })
			  .then(data => console.log("data2",data))
			  .catch(err => {
				  console.log(err)
				  if(err.response.status === 403) {
					  console.log('Rate limit exceeded');
						setValidUsername2(true)
				  } else if (err.response.status === 404) {
						setValidUsername2(false)
				  }
					setIsloading('0');
			});

    }

    // Because Compare.js is working with arr only (No null var)
		const nullToEmptyArr = (data) => {
			for (const prop in data) {
				if (data[prop] === null) {
					data[prop] = []
				}
			}
			return data
		}

    return(
        <div className="main m-4 p-4" style={{background:"#fff",boxShadow:"1px solid #333","padding-top":"15px", "padding-bottom":"1px"}}>
					<div className="form">
            <Form onSubmit={getData} >
							<FormGroup row>
								<Label xs={12} md={2} for='username1'>
									<span className='float-left float-md-right'>Username 1: </span>
								</Label>
								<Col xs={12} md={3}>
									<InputGroup>
										<InputGroupAddon addonType='prepend'>
											<Button className='bg-light text-dark font-weight-bold border'>@</Button>
										</InputGroupAddon>
										{
											validUsername1? <Input type='text' id="username1" required
												value={username1} onChange={updateUsername1}/> :
												<Input type='text' id="username1" className="form-control is-invalid" required
													value={username1} onChange={updateUsername1}/>
										}
									</InputGroup>
								</Col>
								<Label xs={12} md={2} for='username2'>
									<span className='float-left float-md-right'>Username 2: </span>
								</Label>
								<Col xs={12} md={3}>
									<InputGroup>
										<InputGroupAddon addonType='prepend'>
											<Button className='bg-light text-dark font-weight-bold border'>@</Button>
										</InputGroupAddon>
										{
											validUsername2? <Input type='text' id="username2" required
												value={username2} onChange={updateUsername2}/> :
												<Input type='text' id="username2" className="form-control is-invalid" required
													value={username2} onChange={updateUsername2}/>
										}
									</InputGroup>
								</Col>
								<Col xs={12} md={2}>
									<Button block type='submit' color='primary'>Submit</Button>
								</Col>
								{
									validUsername1 && validUsername2? "" :
									<Col xs={8} md={6} className='alert alert-danger offset-md-3 offset-2 mb-0 mt-2' >
										<span>Username doesn't exist.</span>
									</Col>
								}
							</FormGroup>
						</Form>

						{isloading==='1'?
							<div className="d-flex justify-content-center">
								<div className="spinner-border" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						:

							info1 && info2 ?
                <div className="comparisonTable" style={{textAlign:"center"}}>
<<<<<<< HEAD
									<table className="table table-hover " style={{textAlign:"left"}}>
										<thead>
											<tr>
												<th>Feature :</th>
												<th>{info1.username}</th>
												<th>{info2.username}</th>
											</tr>

										</thead>
										<tbody style={{fontSize:"1.4em"}}>
											{info1.followers.length-info2.followers.length>0
												?
													<tr>
														<td>Followers</td>
														<td>{info1.followers.length} <span className="text-success">&emsp;+test{Math.abs(info1.followers.length-info2.followers.length)}<i>&uarr;</i></span></td>
														<td>{info2.followers.length}</td>
													</tr>
												:
												<tr>
													<td>Followers</td>
													<td>{info1.followers.length}</td>
													<td>{info2.followers.length} <span className="text-success">&emsp;+{Math.abs(info1.followers.length-info2.followers.length)}<i>&uarr;</i></span></td>
												</tr>
											}
											{info1.following.length-info2.following.length>0
												?
													<tr>
														<td>Following</td>
														<td>{info1.following.length} <span className="text-success">&emsp;+{Math.abs(info1.following.length-info2.following.length)}<i>&uarr;</i></span></td>
														<td>{info2.following.length}</td>
													</tr>
												:
												<tr>
													<td>Following</td>
													<td>{info1.following.length}</td>
													<td>{info2.following.length} <span className="text-success">&emsp;+{Math.abs(info1.following.length-info2.following.length)}<i>&uarr;</i></span></td>
												</tr>
											}
											{info1.gists.length-info2.gists.length>0
												?
													<tr>
														<td>Gists</td>
														<td>{info1.gists.length} <span className="text-success">&emsp;+{Math.abs(info1.gists.length-info2.gists.length)}<i>&uarr;</i></span></td>
														<td>{info2.gists.length}</td>
													</tr>
												:
												<tr>
													<td>Gists</td>
													<td>{info1.gists.length}</td>
													<td>{info2.gists.length} <span className="text-success">&emsp;+{Math.abs(info1.gists.length-info2.gists.length)}<i>&uarr;</i></span></td>
												</tr>
											}
											{info1.repos.length-info2.repos.length>0
												?
													<tr>
														<td>Repositories</td>
														<td>{info1.repos.length} <span className="text-success">&emsp;+{Math.abs(info1.repos.length-info2.repos.length)}<i>&uarr;</i></span></td>
														<td>{info2.repos.length}</td>
													</tr>
												:
												<tr>
													<td>Repositories</td>
													<td>{info1.repos.length}</td>
													<td>{info2.repos.length} <span className="text-success">&emsp;+{Math.abs(info1.repos.length-info2.repos.length)}<i>&uarr;</i></span></td>
												</tr>
											}
											{info1.starred.length-info2.starred.length>0
												?
													<tr>
														<td>Starred</td>
														<td>{info1.starred.length} <span className="text-success">&emsp;+{Math.abs(info1.starred.length-info2.starred.length)}<i>&uarr;</i></span></td>
														<td>{info2.starred.length}</td>
													</tr>
												:
												<tr>
													<td>Starred</td>
													<td>{info1.starred.length}</td>
													<td>{info2.starred.length} <span className="text-success">&emsp;+{Math.abs(info1.starred.length-info2.starred.length)}<i>&uarr;</i></span></td>
												</tr>
											}
=======
                    <table className="table table-hover " style={{textAlign:"left"}}>
                        <thead>
                            <tr>
                                <th>Feature :</th>
                                <th>{info1.username}</th>
                                <th>{info2.username}</th>
                            </tr>

                        </thead>
                        <tbody style={{fontSize:"1.4em"}}>
                                {info1.followers.length-info2.followers.length>0
                                ?
                                <tr>
                                    <td>Followers</td>
                                    <td>{info1.followers.length} <span className="text-success">&emsp;+{Math.abs(info1.followers.length-info2.followers.length)}<i>&uarr;</i></span></td>
                                    <td>{info2.followers.length}</td>
                                </tr>
                                :
                                <tr>
                                    <td>Followers</td>
                                    <td>{info1.followers.length}</td>
                                    <td>{info2.followers.length} <span className="text-success">&emsp;+{Math.abs(info1.followers.length-info2.followers.length)}<i>&uarr;</i></span></td>
                                </tr>
                                }
                                {info1.following.length-info2.following.length>0
                                ?
                                <tr>
                                    <td>Following</td>
                                    <td>{info1.following.length} <span className="text-success">&emsp;+{Math.abs(info1.following.length-info2.following.length)}<i>&uarr;</i></span></td>
                                    <td>{info2.following.length}</td>
                                </tr>
                                :
                                <tr>
                                    <td>Following</td>
                                    <td>{info1.following.length}</td>
                                    <td>{info2.following.length} <span className="text-success">&emsp;+{Math.abs(info1.following.length-info2.following.length)}<i>&uarr;</i></span></td>
                                </tr>
                                }
                                {info1.gists.length-info2.gists.length>0
                                ?
                                <tr>
                                    <td>Gists</td>
                                    <td>{info1.gists.length} <span className="text-success">&emsp;+{Math.abs(info1.gists.length-info2.gists.length)}<i>&uarr;</i></span></td>
                                    <td>{info2.gists.length}</td>
                                </tr>
                                :
                                <tr>
                                    <td>Gists</td>
                                    <td>{info1.gists.length}</td>
                                    <td>{info2.gists.length} <span className="text-success">&emsp;+{Math.abs(info1.gists.length-info2.gists.length)}<i>&uarr;</i></span></td>
                                </tr>
                                }
                                {info1.repos.length-info2.repos.length>0
                                ?
                                <tr>
                                    <td>Repositories</td>
                                    <td>{info1.repos.length} <span className="text-success">&emsp;+{Math.abs(info1.repos.length-info2.repos.length)}<i>&uarr;</i></span></td>
                                    <td>{info2.repos.length}</td>
                                </tr>
                                :
                                <tr>
                                    <td>Repositories</td>
                                    <td>{info1.repos.length}</td>
                                    <td>{info2.repos.length} <span className="text-success">&emsp;+{Math.abs(info1.repos.length-info2.repos.length)}<i>&uarr;</i></span></td>
                                </tr>
                                }
                                {info1.starred.length-info2.starred.length>0
                                ?
                                <tr>
                                    <td>Starred</td>
                                    <td>{info1.starred.length} <span className="text-success">&emsp;+{Math.abs(info1.starred.length-info2.starred.length)}<i>&uarr;</i></span></td>
                                    <td>{info2.starred.length}</td>
                                </tr>
                                :
                                <tr>
                                    <td>Starred</td>
                                    <td>{info1.starred.length}</td>
                                    <td>{info2.starred.length} <span className="text-success">&emsp;+{Math.abs(info1.starred.length-info2.starred.length)}<i>&uarr;</i></span></td>
                                </tr>
                                }
>>>>>>> e409ac5b764d06dab1905c6955e664b1ede7b2b1




<<<<<<< HEAD
										</tbody>
									</table>
=======
                        </tbody>
                    </table>
>>>>>>> e409ac5b764d06dab1905c6955e664b1ede7b2b1

                </div>
							:""
						}
					</div>
        </div>
);

};
export default Compare;
