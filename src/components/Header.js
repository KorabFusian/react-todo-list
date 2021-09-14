import Button from './Button'

const Header = ({ title, onShow, show }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={show ? 'red' : 'green'}
        text={show ? 'Close' : 'Add'}
        onClick={onShow}
      />
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

export default Header
