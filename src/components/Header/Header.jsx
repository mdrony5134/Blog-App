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
    <header className="bg-black fixed top-0 left-0 right-0">
      <Container>
        <nav className="px-4 py-4 text-white max-w-7xl mx-auto flex justify-between items-center">
          <div>
          <Link to={"/"} className="text-xl text-white font-bold">.<span className="text-orange-600">blog</span></Link> 
          </div>
          <ul className="md:flex text-lg gap-12">
            {
              navItems.map((item, index)=>(
                item.active ? (
                  <li key={index}>
                    <button  
                     className={({ isActive }) =>
                     isActive? "active" : ""  
                   }
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