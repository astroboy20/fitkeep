import React, { useState, useEffect } from "react";
import axios from "axios";

// Define types for messages
interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatDropdown = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState("");
  const [chatHeight, setChatHeight] = useState(256); // Height in pixels

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        role: "assistant",
        content: "Hi, how may I help you?",
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);
    setCurrentTypingMessage("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [...messages, newMessage],
        },
        {
          headers: {
            Authorization: `Bearer API KEY`, // Replace with API key
            "Content-Type": "application/json",
          },
        }
      );

      const aiContent = response.data.choices[0].message.content;
      let currentText = "";
      for (let i = 0; i < aiContent.length; i++) {
        currentText += aiContent[i];
        setCurrentTypingMessage(currentText);
        await new Promise((resolve) => setTimeout(resolve, 30)); // Typing effect delay
      }

      const aiMessage: Message = { role: "assistant", content: aiContent };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error communicating with ChatGPT:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
      setCurrentTypingMessage("");
    }
  };

  return (
    <div className="p-4">
      {/* Chat messages with resizable height */}
      <div
        className="overflow-y-scroll border-b border-gray-200 mb-4 relative"
        style={{ height: `${chatHeight}px` }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="text-left">
            <span className="inline-block px-3 py-2 rounded bg-gray-200 text-black">
              {currentTypingMessage || "Typing..."}
            </span>
          </div>
        )}
      </div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300 cursor-row-resize"
        onMouseDown={(e) => {
          const startY = e.clientY;
          const startHeight = chatHeight;

          const onMouseMove = (e: MouseEvent) => {
            const deltaY = e.clientY - startY;
            setChatHeight(Math.max(128, startHeight + deltaY)); // Minimum height = 128px
          };

          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };

          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      ></div>

      {/* Input and send button */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDropdown;
