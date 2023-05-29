"use client";

import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

import { IconButton } from "@mui/material";
import { auth } from "@/lib/firebase";
import UserAvatar from "@/components/common/UserAvatar";
import AppModal from "@/components/AppModal";

const SidebarHeader: React.FC = () => {
  const isLoggedIn = auth?.currentUser;

  return (
    <div className="flex justify-evenly items-center px-2 py-4 h-20 border-r border-r-solid border-r-gray-200 border-b border-b-solid border-b-gray-200 bg-white z-10">
      <div className="pl-2">
        {isLoggedIn !== null ? (
          <UserAvatar
            image={isLoggedIn?.photoURL as string}
            alt={String(isLoggedIn?.email)}
          />
        ) : (
          <AccountCircleIcon className="rounded-full cursor-pointer hover:opacity-70" />
        )}
      </div>
      <IconButton>
        <GroupsOutlinedIcon />
      </IconButton>
      <IconButton>
        <DataUsageIcon />
      </IconButton>
      <IconButton>
        <AppModal
          icon={<ChatOutlinedIcon />}
          title="All Contacts"
          modalType="chat"
        />
      </IconButton>
    </div>
  );
};

export default SidebarHeader;
