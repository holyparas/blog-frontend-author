import { useEffect, useState } from "react";
import { getToken, decodeToken } from "../auth";
import { apiFetch } from "../api";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await apiFetch("/api/posts");
        // if (!res.ok) throw new Error("Failed to fetch posts");
        // const data = await res.json();
        const token = getToken();
        const payload = decodeToken(token);
        const myId = payload?.id;
        const myPosts = res.filter((p) => p.user_id === myId);
        setPosts(myPosts);
      } catch (err) {
        console.error(err);
        setError("Could not load your posts");
      }
    };

    fetchMyPosts();
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl mb-4">My Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.post_id}
            className="p-4 rounded-md border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {new Date(post.created_at).toLocaleString()}
            </p>
            <p className="mt-2">{post.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
