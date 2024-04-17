import { Box, Typography, useMediaQuery } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import bgPic from "../../../public/images/bgPic.jpg";

import { useEffect, useMemo, useState } from "react";

import FilterBar from "../../components/FilterBar";
import JobSection from "../../components/JobSection";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const words = useMemo(
    () => [
      "Engineer",
      "Software",
      "Job",
      "Quality Insurance",
      "IOS",
      "Sales",
      "Api",
      "Travel",
      "React.js",
      "CSS",
      "Serverless",
      "Video",
      "Ecommerce",
      "Php",
      "Angular",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping) {
        if (typingIndex < words[index].length) {
          setSearchText((prevText) => prevText + words[index][typingIndex]);
          setTypingIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsTyping(false);
        }
      } else {
        if (searchText.length > 0) {
          setSearchText((prevText) => prevText.slice(0, -1));
        } else {
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
          setIsTyping(true);
          setTypingIndex(0);
        }
      }
    }, 150); // Cursor blinking speed: 150 milliseconds

    return () => clearInterval(interval);
  }, [index, typingIndex, isTyping, searchText, words]);

  return (
    <>
      <Box
        sx={{
          maxWidth: "100vw",
          height: "calc(100vh - 64px)",
          backgroundImage: `url(${bgPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          color="error"
          fontWeight="bold"
          pt={isSmallScreen && "15px"}
          sx={{
            padding: isSmallScreen ? "auto" : " 60px 60px 0",
            textAlign: isSmallScreen && "center",
          }}
        >
          Remote.Ok
        </Typography>

        <Typography
          variant={isSmallScreen ? "body1" : "h4"}
          color="error"
          fontWeight="bold"
          pb="10px"
          sx={{
            padding: isSmallScreen ? "10px auto" : " 25px 80px 0",
            textTransform: "capitalize",
            textAlign: isSmallScreen && "center",
          }}
        >
          find a remote job , work from anywhere
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: isSmallScreen && "center",
            padding: !isSmallScreen && "15px 85px",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: isSmallScreen ? "14%" : "100px",
              top: isSmallScreen ? "53%" : "55%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            <SearchOutlinedIcon sx={{ fontSize: "35px" }} />
          </span>

          <input
            type="text"
            value={searchText}
            placeholder="Search..."
            style={{
              width: isSmallScreen ? "320px" : "420px",
              padding: "10px 10px 10px 60px", // Adjust padding for icon + spacing
              outline: "none",
              borderRadius: "40px",
              fontSize: "1.8rem",
              border: "3px solid red",
              zIndex: 1,
            }}
            readOnly
          />
        </Box>
      </Box>

      <FilterBar />

      <JobSection />
    </>
  );
}
