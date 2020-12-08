import { Row, Col } from "reactstrap";
import './footer.css';

const Footer = () => {
	return (
		<footer className='align-items-center bg-primary'>
			<div className='container'>
				<Row className='p-4 text-white'>
					<Col className='offset-md-2' md={8}>
						© <a href='https://adityabisoi.github.io/' rel="noreferrer" target='_blank'>Aditya Bisoi</a>
					</Col>
				</Row>
			</div>
		</footer>
	);
};

export default Footer;