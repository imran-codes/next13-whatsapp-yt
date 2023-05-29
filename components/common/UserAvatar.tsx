import Image from "next/image";
import React from "react";

interface UserAvatarProps {
  image: string;
  alt: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ image, alt }) => {
  return (
    <Image
      src={image}
      alt={alt}
      width={50}
      height={50}
      className="rounded-full cursor-pointer hover:opacity-70"
    />
  );
};

export default UserAvatar;
