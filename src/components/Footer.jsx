import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <p>
        Made using{' '}
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          React
        </a>{' '}
        by Jeremi Friggit, 2021
      </p>
      <p>
        <Link to="/about">About</Link>
      </p>
    </footer>
  )
}

export default Footer
