import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
	return (
		<header >
			<Navbar color='primary' dark>
				<NavbarBrand href='./'>GitHub API Playground</NavbarBrand>
			</Navbar>
		</header>
	);
};

export default Header;