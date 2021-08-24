import { Link } from 'react-router-dom'

function Home() {
  return <h2>Home</h2>;
}

export function HomeLink(text) {
  return (
    <Link to="/">{text}</Link>
  )
}

export default Home