const Visualization = (props) => {

	return(
		<div>
			<h2>{props.data && props.data.username}</h2>
			<div className="row">
				<div className="col-sm">
					<h4>Total Repos: {props.data && props.data.repos.length}</h4>					
					<table className="table table-responsive">
						<thead>
							<tr>
								<th>S.No</th>
								<th>Name of the Repo</th>
								<th>Open Issues</th>
								<th>Language</th>
								<th>Forks</th>
							</tr>
							

						</thead>
						<tbody>
						{props.data && props.data.repos.map((key,index)=>{
							
							return(<tr>
								<td>{index}</td>
								<td><a href={key.html_url}>{key.name}</a></td>
								<td>{key.open_issues_count}</td>
								<td><a href={key.languages_url}>{key.language}</a></td>
								<td>{key.forks_count}</td>
							</tr>)

						})}
						</tbody>
					</table>
					

				</div>
				<div className="col-sm">
					<h4>Total Following :{props.data && props.data.following.length}</h4>
					<table className="table table-responsive">
						<thead>
							<tr>
								<th>S.No</th>
								<th>User</th>
								<th>Name</th>
							</tr>

						</thead>
						<tbody>
							{props.data && props.data.following.map((key,index)=>{
								return(
									<tr>
										<td>{index}</td>
										<td><img src={key.avatar_url} style={{width:"40px",height:"40px"}}/></td>
										<td><a href={key.html_url}>{key.login}</a></td>
									</tr>
								)
							})}

						</tbody>
					</table>

					<h4>Total Followers: {props.data && props.data.followers.length}</h4>
					<table className="table table-responsive">
						<thead>
							<tr>
								<th>S.No</th>
								<th>User</th>
								<th>Name</th>
							</tr>

						</thead>
						<tbody>
							{props.data && props.data.followers.map((key,index)=>{
								return(
									<tr>
										<td>{index}</td>
										<td><img src={key.avatar_url} style={{width:"40px",height:"40px"}}/></td>
										<td><a href={key.html_url}>{key.login}</a></td>
									</tr>
								)
							})}

						</tbody>
					</table>
					<hr></hr>
					<table className="table table-responsive">
						<thead>
							<tr>
								<th>Total Starred</th>
								<th>Total Gists</th>
							</tr>

						</thead>
						<tbody>
							<tr>
								<td>{props.data && props.data.starred.length}</td>
								<td>{props.data && props.data.gists.length}</td>
							</tr>
						</tbody>
					</table>
					
				</div>
				
			</div>
		</div>

	);
	 // TODO
}

export default Visualization;