import ReactDOM from 'react-dom'
import {render} from '@testing-library/react'
import Footer from '../Footer'

it('renders',()=>{
    const div=document.createElement('div')
    ReactDOM.render(<Footer/>,div)
})

it('renders text',()=>{
    const {getByTestId} =render(<Footer/>)
    expect(getByTestId('footer-text')).toHaveTextContent(/^© Aditya Bisoi$/)
})