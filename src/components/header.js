import { Jumbotron } from 'reactstrap';
import './header.css';

const Header = () => {
	return (
		<header >
			<Jumbotron className='m-0 bg-dark text-white text-left rounded-0'>
				<a href='./'><h1 className='display-3 font-weight-normal'>GitHub API Playground</h1></a>
				<p className='d-none d-md-block lead font-weight-normal'>A playground for GitHub's REST API.</p>
			</Jumbotron>
		</header>
	);
};

export default Header;