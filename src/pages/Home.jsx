import { useEffect, useState } from "react";
import { getToken, decodeToken } from "../auth";
import { Link } from "react-router-dom";
import { apiFetch } from "../api";

const truncate = (s, n = 120) =>
  s && s.length > n ? s.slice(0, n) + "..." : s;

const Home = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await apiFetch("http://localhost:3000/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        const token = getToken();
        const payload = decodeToken(token);
        if (!payload) return; // not logged in
        const myId = payload?.id;
        const my = data.filter((p) => p.user_id === myId).slice(0, 3);
        setMyPosts(my);
      } catch (err) {
        console.error(err);
        setError("Could not load posts");
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl mb-4">Author Dashboard</h2>
      <p className="mb-2">
        Create posts, manage your posts, and publish to the public blog.
      </p>

      {error && <div className="text-red-600">{error}</div>}

      {myPosts.length > 0 ? (
        <div>
          <h3 className="text-xl mt-6 mb-3">Your recent posts</h3>
          <div className="flex flex-col gap-3">
            {myPosts.map((p) => (
              <div
                key={p.post_id}
                className="p-4 rounded-md border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {new Date(p.created_at).toLocaleString()}
                </p>
                <p className="mt-2">{truncate(p.post)}</p>
                <Link
                  to="/myposts"
                  className="link hover:underline text-sm mt-2 inline-block"
                >
                  See all my posts
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="mb-2">You have no recent posts to show here.</p>
          <p>
            <Link to="/create" className="link hover:underline">
              Create your first post
            </Link>
          </p>
        </div>
      )}

      <div className="mt-8">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Use the navigation to register, login, or create new posts.
        </p>
      </div>
    </div>
  );
};

export default Home;
