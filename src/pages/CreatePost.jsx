import { useState } from "react";
import { getToken, decodeToken, getAuthHeader } from "../auth";
import { apiFetch } from "../api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = getToken();
    if (!token) {
      setError("You must be logged in to create a post");
      return;
    }
    const payload = decodeToken(token);
    const userID = payload?.id;
    try {
      const res = await apiFetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          title,
          post,
          userID,
          date: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create post");
        return;
      }
      setSuccess("Post created");
      setTitle("");
      setPost("");
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl mb-4">Create Post</h2>
      {error && (
        <div
          className="mb-2 rounded-md px-3 py-2 text-red-700"
          style={{ backgroundColor: "rgba(220,38,38,0.06)" }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="mb-2 rounded-md px-3 py-2 text-green-700"
          style={{ backgroundColor: "rgba(34,197,94,0.06)" }}
        >
          {success}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full px-3 py-2 rounded-md border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Write your post here..."
          rows={8}
          required
          className="w-full px-3 py-2 rounded-md border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />
        <button
          className="px-4 py-2 rounded-md text-white mt-2 hover:opacity-90"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
