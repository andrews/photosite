import { HomeLink } from './Home';

function Admin() {
  return (
    <div>
      {HomeLink("View Home")}
      <h2>Admin Page</h2>
    </div>
  );
}

export function NotFound() {
  return (
    <div>
      <h1>404 PAGE NOT FOUND</h1>
      <h3>Return to {HomeLink("home")}</h3>
    </div>
    
  )
}

export default Admin;