import { Container, PostCard } from "../index";
import appwriteService from "../../appwrite/conf";
import { useEffect, useState } from "react";
import Banner from "../Banner";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <Banner/>
    );
  }

  return (
    
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
    
  );
};

export default Home;
