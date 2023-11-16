import { Link } from "react-router-dom";
import appwriteService from "../appwrite/conf";

const PostCard = ({ $id, Title, FeaturedImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-200 rounded-lg p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(FeaturedImage)}
            alt={Title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{Title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
