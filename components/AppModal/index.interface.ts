import { ContactsType } from "@/types";

export type IconModalType = "upload" | "chat";

export type ContactListProps = {
  contacts: ContactsType[];
  handleClose: () => void;
};

export type UploadModalProps = {
  handleClose: () => void;
};
