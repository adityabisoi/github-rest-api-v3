// import {useHistory } from 'react-router-dom';
import { Form, FormGroup, CustomInput } from 'reactstrap';
import { useState } from 'react';

const Visualization = (props) => {
	// const history=useHistory();
	// const handleClick=()=>{
	// 	history.push('/github-rest-api-v3/compare');
	// }
	//console.log(props.data)
  const [filterState, setFilterState] = useState({
    repos: true,
    following: true,
    followers: true,
  })
  const toggleCheckbox = (e) => {
    switch(e.target.id) {
      case 'reposCheck':
      setFilterState((prevState) => ({
        ...prevState,
        repos: e.target.checked
      }))
      break
      case 'followingCheck':
      setFilterState((prevState) => ({
        ...prevState,
        following: e.target.checked
      }))
      break
      case 'followersCheck':
      setFilterState((prevState) => ({
        ...prevState,
        followers: e.target.checked
      }))
      break
      default:
    }
  }
  
	//Can handle following and followers because of the same table
  const hasFollow = (ep, str) => {
		if(ep === null) {
			return (<h4 className="m-0 p-2 border-top border-bottom">No {str}</h4>)
		} else {
			return(
        <div>
          <h4 className="m-0 p-2">Total {str}: {ep.length}</h4>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>S.No</th>
                <th>User</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {ep.map((key,index)=>{
                return(
                  <tr>
                    <td>{index + 1}</td>
                    <td><img src={key.avatar_url} style={{width:"40px",height:"40px"}} alt=""/></td>
                    <td><a href={key.html_url}>{key.login}</a></td>
                  </tr>
                )
              })}
					</tbody>
				</table>
				</div>
			)
		}
	}

  const hasRepos = (ep) => {
    if(ep === null)
    return(<h4 className="m-0 p-2 border-top border-bottom">No Repos</h4>)
    else {
      return(
        <div>
          <h4 className="m-0 p-2">Total Repos: {props.data && props.data.repos.length}</h4>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name of the Repo</th>
                <th>Open Issues</th>
                <th>Stars</th>
                <th>Forks</th>
              </tr>
            </thead>
            <tbody>
              {props.data && props.data.repos.map((key,index)=>{

                return(<tr>
                  <td>{index + 1}</td>
                  <td><a href={key.html_url}>{key.name}</a></td>
                  <td><a href={key.html_url+'/issues'}>{key.open_issues_count}</a></td>
                  <td>{key.stargazers_count}</td>
                  <td>{key.forks_count}</td>
                </tr>)

              })}
            </tbody>
          </table>
        </div>
      )
    }
  }

	return(
		props.data ?
		<div>
			<img src={props.data.profile[0].avatar_url} style={{width:"100px",height:"100px",borderRadius:"50%"}} alt=""/>
			<h2>{props.data && props.data.profile[0].name}</h2>
			<div className="row justify-content-center">
        <Form className="col-sm-12 mt-2 mb-2">
          <FormGroup check inline>
            <CustomInput
              id="reposCheck"
              type="switch"
              label="Repos"
              onChange={(e) => {
                toggleCheckbox(e)
              }}
              defaultChecked
            />
          </FormGroup>
          <FormGroup check inline>
            <CustomInput
              id="followingCheck"
              type="switch"
              label="Following"
              onChange={(e) => {
                toggleCheckbox(e)
              }}
              defaultChecked
            />
          </FormGroup>
          <FormGroup check inline>
            <CustomInput
              id="followersCheck"
              type="switch"
              label="Followers"
              onChange={(e) => {
                toggleCheckbox(e)
              }}
              defaultChecked
            />
          </FormGroup>
        </Form>
        {filterState.repos?
          <div className="col-sm-auto">
            {hasRepos(props.data.repos)}
          </div>
        : ''}
				<div className="col-sm-auto">
					{filterState.following?
            hasFollow(props.data.following, "Following")
          : ''}
          {filterState.followers?
            hasFollow(props.data.followers, "Followers")
          : ''}
				</div>
			</div>
		</div>
		:
		<div className="jumbotron">
      <h1 className="display-4">Hey, User!</h1>
      <p className="lead">Please Enter Your Username For Getting Stats!</p>
    </div>
	);
}

export default Visualization;
