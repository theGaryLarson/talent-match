"use client";
import React, { useState } from "react";
import { Bookmark, BookmarkBorderOutlined } from "@mui/icons-material";
import PillButton from "./PillButton";

interface BookmarkProps {
  bookmarked: boolean;
  addUrl: string;
  removeUrl: string;
}

function BookmarkWithTextComponent({
  bookmarked,
  addUrl,
  removeUrl,
}: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  async function toggleBookmark() {
    const initialState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    const url = isBookmarked ? removeUrl : addUrl;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        setIsBookmarked(initialState);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setIsBookmarked(initialState);
    }
  }

  return isBookmarked ? (
    <PillButton
      startIcon={<Bookmark />}
      onClick={toggleBookmark}
      color="inherit"
      sx={{ color: "secondary.main" }}
    >
      Remove Job
    </PillButton>
  ) : (
    <PillButton
      startIcon={<BookmarkBorderOutlined />}
      onClick={toggleBookmark}
      color="inherit"
      sx={{ color: "secondary.main" }}
    >
      Save Job
    </PillButton>
  );
}

export default React.memo(BookmarkWithTextComponent);
