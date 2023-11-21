import { Link } from "react-router-dom";
import appwriteService from "../appwrite/conf";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
     <div className="">
     <div className="w-[250px] h-[300px]  bg-gray-200 rounded-lg p-4 mt-20 hover:scale-105 transition-all duration-200">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
     </div>
    </Link>
  );
};

export default PostCard;
