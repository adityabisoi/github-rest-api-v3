import { Navbar, NavbarBrand } from 'reactstrap';
import {useHistory } from 'react-router-dom';

const Header = () => {
	const history=useHistory();
	const handleClick=()=>{
		history.push('/github-rest-api-v3/compare');
	}
	return (
		<header >
			<Navbar color='primary' dark>
				<NavbarBrand href='./'>GitHub API Playground</NavbarBrand>
				<button className="btn btn-success" onClick={handleClick}>Compare Users</button>
			</Navbar>
		</header>
	);
};

export default Header;