import { useState } from "react";
import { getMovies } from "../services/movieService";

function ChatBox() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const quickQuestions = [
    "Phim đang chiếu",
    "Lịch chiếu hôm nay",
    "Giá vé bao nhiêu"
  ];

  const sendMessage = async (text) => {

    const message = text || input;

    if (!message.trim()) return;

    let reply = "Tôi chưa hiểu câu hỏi.";

    if (message.toLowerCase().includes("phim")) {

      const movies = await getMovies();

      const movieList = movies
        .map(m => m.title)
        .join(", ");

      reply = "Hôm nay có: " + movieList;
    }

    setMessages([
      ...messages,
      { text: message, user: true },
      { text: reply, user: false }
    ]);

    setInput("");
  };

  return (

    <div style={{
      position: "fixed",
      bottom: "100px",
      right: "24px",
      width: "320px",
      height: "420px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      display: "flex",
      flexDirection: "column"
    }}>

      {/* HEADER */}
      <div style={{
        background: "#4f46e5",
        color: "white",
        padding: "10px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px"
      }}>
        AI Cinema Assistant 🤖
      </div>

      {/* QUICK QUESTIONS */}

      <div style={{ padding: "8px" }}>
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
            style={{
              margin: "4px",
              padding: "6px 10px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              background: "#f3f4f6",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* MESSAGES */}

      <div style={{
        flex: 1,
        padding: "10px",
        overflowY: "auto"
      }}>

        {messages.map((m, i) => (

          <div
            key={i}
            style={{
              textAlign: m.user ? "right" : "left",
              marginBottom: "8px"
            }}
          >

            <span style={{
              display: "inline-block",
              background: m.user ? "#4f46e5" : "#e5e7eb",
              color: m.user ? "white" : "black",
              padding: "6px 10px",
              borderRadius: "10px"
            }}>
              {m.text}
            </span>

          </div>

        ))}

      </div>

      {/* INPUT */}

      <div style={{
        display: "flex",
        padding: "8px",
        borderTop: "1px solid #eee"
      }}>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi về phim..."
          style={{
            flex: 1,
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={() => sendMessage()}
          style={{
            marginLeft: "6px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer"
          }}
        >
          Gửi
        </button>

      </div>

    </div>
  );
}

export default ChatBox;