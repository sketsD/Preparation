import { Link } from "react-router-dom";
import PageNav from "../src/components/PageNav";
import AppNav from "../src/components/AppNav";

function Homepage() {
  return (
    <div>
      <h1> WorldWise</h1>
      {/* <h1 className="test"> WorldWise</h1> */}
      <PageNav />
      <AppNav />
      <Link to="/app">Go to the App</Link>
      {/* <Link to="/pricing">Pricing</Link> */}
    </div>
  );
}

export default Homepage;
