import { Link } from 'react-router-dom';
import {FaArrowRightLong} from 'react-icons/fa6'
const Banner = () => {
  return (
    <div className="px-4  py-40 ">
        <div className="text-black text-center">
            <h1 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">Welcome To Our Blog</h1>
            <p className="text-black w-3/5 mx-auto mb-5">Start your blog today and join a community of writers and readers  who are passionate about sharing their stories and ideas. We offer everything you need to get started, from helpful tips and tutorials.</p>
            <Link to={"/login"} className='inline-flex items-center gap-2 hover:text-orange-600'>Login to read blogs <FaArrowRightLong className='mt-2'/></Link>
        </div>
    </div>
  )
}

export default Banner