import { Outlet, Link } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <>
        <div className="absolute flex gap-20 pt-4 justify-end font-medium w-full pr-20 text-white">
          <ul className="flex gap-20 pt-4 justify-end font-medium w-full pr-12 text-white ">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About Us</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/signup'>Sign Up</Link>
              </li>
              <li>
                <Link to='/contact'>Contact Us</Link>
              </li>
          </ul>
        </div>
        <Outlet />
    </>
  )
}

export default Header