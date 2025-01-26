import { Link } from 'react-router-dom';
import Header from "../sections/Header.jsx";
import Footer from "../sections/Footer.jsx";

const NotFound = () => {
  return (
    <div>
      <Header />
      <main className="text-center p-8">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page youre looking for doesnt exist.</p>
        <Link to="/" className="text-blue-500 underline">Go Back Home</Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
