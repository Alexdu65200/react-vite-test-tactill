import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";

function Header() {
  return (
    <div className="min-h-full sm:px-10">
      <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <img className="h-8 w-auto sm:h-6" src={Logo} alt="Logo SpaceX" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 items-center justify-end md:flex md:flex-1 lg:w-0">
          <NavLink
            to="/"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Accueil
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
