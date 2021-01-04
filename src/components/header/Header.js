import { Navbar, NavbarBrand, Nav, NavLink } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
	const history=useHistory();
	const handleClick=()=>{
		history.push('/github-rest-api-v3/compare');
	}
	return (
		<header>
			<Navbar color="primary" dark>
				<NavbarBrand href="https://adityabisoi.github.io/github-rest-api-v3/" data-testid="header-text">GitHub API Playground
				</NavbarBrand>
				<Nav className="mr-auto" navbar>
				<NavLink href="https://github.com/adityabisoi/github-rest-api-v3" className="border border-white rounded p-1 d-flex justify-content align-items-center text-white">
						<FontAwesomeIcon className="" icon={faStar} size="lg"/>
						 <div className="ml-1 bg-white">.</div>
						<FontAwesomeIcon className="ml-2" icon={faCodeBranch} size="lg" />
				</NavLink>
				</Nav>
				<button className="btn btn-success" onClick={handleClick}>Compare Users</button>
			</Navbar>
		</header>
	);
};

export default Header;
