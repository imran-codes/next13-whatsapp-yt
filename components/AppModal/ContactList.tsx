import React from "react";
import { ContactListProps } from "./index.interface";
import { ContactsType } from "@/types";
import { auth } from "@/lib/firebase";
import UserAvatar from "../common/UserAvatar";
import { useRouter } from "next/navigation";
import { chooseContact, formatDate } from "./helper";

const ContactList: React.FC<ContactListProps> = ({ contacts, handleClose }) => {
  const router = useRouter();
  return (
    <div>
      {contacts
        ?.filter((contact) => contact.id !== auth.currentUser?.uid)
        ?.map((contact: ContactsType) => (
          <div
            key={contact.uid}
            className="flex justify-start items-center py-4 gap-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => chooseContact(contact, handleClose, router)}
          >
            <UserAvatar image={contact?.photo} alt={contact?.name} />
            <div>
              <p>{contact?.name}</p>
              <p>{formatDate(contact?.lastOnline.seconds)}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ContactList;
