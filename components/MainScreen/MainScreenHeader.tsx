"use client";

import React, { use, useEffect } from "react";
import { ClickAwayListener, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SignOutButton from "../common/SignOutButton";
import {
  deleteChatFromFirestore,
  getSingleChatFromFirestore,
} from "@/lib/firebase/messageController";
import { useParams, useRouter } from "next/navigation";
import { handleContactInfo } from "./helper";
import { DocumentData } from "firebase/firestore";
import UserAvatar from "../common/UserAvatar";

const MainScreenHeader: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [contactInfo, setContactInfo] = React.useState<
    null | DocumentData | undefined
  >(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // get the chat from firestore and see if it exists
    getSingleChatFromFirestore(params?.id)
      .then(async (chat) => {
        //  check the user  and see if they are the sender or receiver
        const filterContact = await handleContactInfo(chat, params?.id);
        setContactInfo(filterContact);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [params?.id]);

  return (
    <div className="sticky top-0 p-2 h-20 bg-gray-200 border-b border-gray-400 z-10 flex items-center justify-between">
      <div>
        {contactInfo ? (
          <div className="flex items-center gap-2">
            <UserAvatar image={contactInfo?.photo} alt={contactInfo?.name} />
            <strong>{contactInfo?.name}</strong>
          </div>
        ) : (
          <AccountCircleIcon />
        )}
      </div>
      <ClickAwayListener onClickAway={handleClose}>
        <div className="flex gap-6 items-center">
          <IconButton>
            <VideocamOutlinedIcon />
          </IconButton>
          <IconButton>
            <LocalPhoneOutlinedIcon />
          </IconButton>
          |
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteChatFromFirestore(params?.id, router)}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
          <SignOutButton open={open} handleToggle={handleToggle} />
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default MainScreenHeader;
