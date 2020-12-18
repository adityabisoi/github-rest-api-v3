import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import Main from '../Main'

it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Main />, div)
})

it('renders text', () => {
    const { getByTestId } = render(<Main />)
    expect(getByTestId('main-text')).toHaveTextContent('Username')
})