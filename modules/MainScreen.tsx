import MainScreenHeader from "@/components/MainScreen/MainScreenHeader";
import MessageBody from "@/components/MainScreen/MessageBody";
import MessageInput from "@/components/MainScreen/MessageInput";
import React from "react";

const MainScreen: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <MainScreenHeader />
      <MessageBody />
      <MessageInput />
    </div>
  );
};

export default MainScreen;
