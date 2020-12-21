import { Navbar, NavbarBrand } from 'reactstrap';
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
			<Navbar color='primary' dark>
				<NavbarBrand href='https://adityabisoi.github.io/github-rest-api-v3/' data-testid='header-text'>GitHub API Playground
          <NavbarBrand href='https://github.com/adityabisoi/github-rest-api-v3' data-testid='header-text' className="ml-2">
					  <div className="block-example border border-light rounded">
				      <FontAwesomeIcon className="block-example border-right border-light px-1" icon={faStar} size="lg"/>
						  <FontAwesomeIcon className="mx-1 px-1" icon={faCodeBranch} size="lg" />
						</div>
				  </NavbarBrand>
				</NavbarBrand>
				<button className="btn btn-success" onClick={handleClick}>Compare Users</button>
			</Navbar>
		</header>
	);
};

export default Header;
