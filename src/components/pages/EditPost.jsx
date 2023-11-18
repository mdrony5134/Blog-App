import{Container, PostForm} from "../index"
import appwriteService from '../../appwrite/conf'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
const EditPost = () => {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                setPost(post)
            })
        }else{
            navigate("/")
        }
    },[slug, navigate])
  return  post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost