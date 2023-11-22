import { Container, PostCard } from "../index";
import appwriteService from "../../appwrite/conf";
import { useEffect, useState } from "react";
import Banner from "../Banner";
import AuthBanner from "../AuthBanner";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return <Banner />;
  } else {
    return (
      <>
        <AuthBanner />
        <div className="w-full">
          <Container>
          <h2 className="mt-20 text-3xl text-gray-300 font-bold">Blog Post</h2>
            <div className="flex flex-wrap items-center">
              {posts.map((post) => (
                <div key={post.$id} className=" w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </>
    );
  }
};

export default Home;
