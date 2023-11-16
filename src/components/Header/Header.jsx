import { Link, useNavigate } from "react-router-dom"
import {Container, LogoutBtn} from "../index"
import { useSelector } from "react-redux"

const Header = () => {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      link: "Home",
      path: "/",
      active: true,
    },
    {
      link: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      link: "Singup",
      path: "/singup",
      active: !authStatus,
    },
    {
      link: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      link: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center justify-between">
          <div>
            <Link to={"/"}>
              logo
            </Link>
          </div>
          <ul className="flex items-center ml-auto">
            {
              navItems.map((item, index)=>(
                item.active ? (
                  <li key={index}>
                    <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={()=>navigate(item.path)}
                    >
                      {item.link}
                    </button>
                  </li>
                ) : null
              ))
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header