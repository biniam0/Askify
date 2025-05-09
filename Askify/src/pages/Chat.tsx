import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getUserChats,
  sendChatRequest,
  deleteUserChats,
} from "../services/api-services";

interface ChatMessageType {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const auth = useAuth();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    const content = inputRef.current?.value ?? "";

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: ChatMessageType = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deleteChats" });
      const chatData = await deleteUserChats();
      setChatMessages([...chatData.chats]);
      toast.success("Chats deleted", { id: "deleteChats" });
    } catch (err) {
      console.log(err);
      toast.error("Deleting chats failed", { id: "deleteChats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages(data.chats);
          toast.success("Chat loaded successfully", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    const isLoggedIn = () => {
      if (!auth?.user) {
        return navigate("/login");
      }
    }
    isLoggedIn()
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: "8px",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name && auth?.user?.name[0]}
            {auth?.user?.name && auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to knowledge, business, advices,
            education, etc. But avoid sharing personal information.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgColor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - GPT 3.4 Turbo
        </Typography>
        <Box
          sx={{
            width: "90%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map(({ role, content }, index) => (
            <ChatItem
              key={index}
              role={role as "user" | "assistant"}
              content={content}
            ></ChatItem>
          ))}
        </Box>
        <div
          style={{
            width: "90%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(27, 50, 77)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            type="text"
            placeholder="Ask anything"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
