import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../context/AuthContext";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const auth = useAuth();

  const renderers = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <SyntaxHighlighter
          style={coldarkDark}
          language={match ? match[1] : "javascript"}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const containerStyles = {
    display: "flex",
    p: 2,
    gap: 2,
    borderRadius: 2,
    my: 1,
    maxWidth: "90%",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    bgcolor: role === "assistant" ? "#004d5612" : "#004d56",
    color: role === "assistant" ? "inherit" : "#fff",
  };

  return (
    <Box sx={containerStyles}>
      <Avatar
        sx={{ ml: 0, bgcolor: role === "assistant" ? "default" : "black" }}
      >
        {role === "assistant" ? (
          <img src="openai.png" alt="openai" width={"30px"} />
        ) : (
          <>
            {auth?.user?.name?.[0]}
            {auth?.user?.name?.split(" ")[1]?.[0]}
          </>
        )}
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: "18px" }}>
          <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
