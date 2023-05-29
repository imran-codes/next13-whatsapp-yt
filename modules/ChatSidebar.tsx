import Archived from "@/components/Sidebar/Archived";
import Chat from "@/components/Sidebar/Chat";
import FirestoreChats from "@/components/Sidebar/FirestoreChats";
import Search from "@/components/Sidebar/Search";
import SidebarHeader from "@/components/Sidebar/SidebarHeader";
import { AllUsers, AllUsersType } from "@/types";
import { type } from "os";
import React from "react";

type Props = {
  data: AllUsers;
};

const ChatSidebar: React.FC<Props> = ({ data }) => {
  const { users } = data;
  return (
    <div className="w-full h-full">
      <SidebarHeader />
      <Search />
      <Archived />
      <div className="overflow-y-auto">
        <FirestoreChats />
        {!!users &&
          users?.map((user: AllUsersType) => (
            <Chat key={user.id} data={user} />
          ))}
      </div>
      <p className="text-center text-sm p-2">
        Your personal messages are end-to-end-encrypted
      </p>
    </div>
  );
};

export default ChatSidebar;
