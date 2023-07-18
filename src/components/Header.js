import { Link } from "react-router-dom";

const Header = () => (
  <nav className="bg-white p-6 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="font-bold text-gray-900 text-2xl">
        Address Book App
      </Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-900 hover:text-gray-600">
          Home
        </Link>
      </div>
    </div>
  </nav>
);

export default Header;
