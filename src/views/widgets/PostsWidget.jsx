import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => { 
  const dispatch = useDispatch(); 
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  
  const refreshPosts = isProfile ? getUserPosts : getPosts;
  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const handleDelete = async (postId) => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      refreshPosts();
      alert("Post deleted successfully");
    } else {
      alert("Failed to delete the post.");
    }
  };

  useEffect(() => {
    refreshPosts();
  }, [userId, refreshPosts]); 

  return (
    <>
      {posts.map((post) => (  
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={`${post.firstName} ${post.lastName}`}
          description={post.description}
          location={post.location}
          picturePath={post.picturePath}
          userPicturePath={post.userPicturePath}
          likes={post.likes}
          comments={post.comments}
          onDelete={handleDelete} 
        />
      ))}
    </>
  );
};

export default PostsWidget;
