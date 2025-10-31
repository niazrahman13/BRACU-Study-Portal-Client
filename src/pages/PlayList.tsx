import { Button, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const Playlist = () => {
  const { playlistUrl } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");

  // Decode the playlist URL from the parameters
  const decodedUrl = decodeURIComponent(playlistUrl || "");
  console.log("Decoded URL:", decodedUrl);

  // Extract the playlist ID from the decoded URL
  let playlistId;
  try {
    const youtubeUrl = new URL(decodedUrl);
    playlistId = youtubeUrl.searchParams.get("list");
    console.log("Playlist ID:", playlistId);
  } catch (error) {
    console.error("Invalid URL:", decodedUrl);
    return <div>Invalid Playlist URL</div>;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
  };

  const handleDownloadTXT = () => {
    const element = document.createElement('a');
    const file = new Blob([notes], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'notes.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyNotes = () => {
    const el = document.createElement("textarea");
    el.value = notes;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Notes copied to clipboard. You can paste them in Google Docs.");
  };

  // If the playlist ID is not found, show an error message
  if (!playlistId) return <div>Playlist not found</div>;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Playlist</Title>

      <div style={{ marginTop: "24px" }}>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Spin size="large" />
            <p>Loading videos...</p>
          </div>
        ) : (
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Playlist"
          ></iframe>
        )}
      </div>

      <div style={{ marginTop: "24px" }}>
        <Title level={3}>Take Notes</Title>
        <ReactQuill
          value={notes}
          onChange={handleNotesChange}
          theme="snow"
          style={{ height: "300px", backgroundColor: "#fff" }}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Button type="primary" onClick={handleDownloadTXT} style={{ marginRight: 16 }}>
          Download Notes as Text
        </Button>
        <Button type="default" onClick={handleCopyNotes}>
          Copy Notes for Google Docs
        </Button>
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Button type="default" onClick={handleBackClick}>
          Back to Playlist
        </Button>
      </div>
    </div>
  );
};

export default Playlist;