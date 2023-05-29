import { ContactsType } from "@/types";
import UploadModal from "./UploadModal";
import ChatModal from "./ContactList";
import { IconModalType } from "./index.interface";
import ContactList from "./ContactList";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const handleModalChildren = (
  modalType: IconModalType,
  contacts: ContactsType[],
  handleClose: () => void
) => {
  switch (modalType) {
    case "upload":
      return <UploadModal handleClose={handleClose} />;
    case "chat":
      return <ContactList contacts={contacts} handleClose={handleClose} />;
    default:
      return;
  }
};

export const chooseContact = (
  contact: ContactsType,
  handleClose: () => void,
  router: AppRouterInstance
) => {
  handleClose();
  router.push(`/chat/${contact.uid}`);
};

// TS FUNCTION OVERLOAD
export function formatDate(date: number): string;
export function formatDate(date: Date): string;
export function formatDate(arg1: unknown): string {
  // doing the type at runtime instead of compile time
  if (typeof arg1 === "number") {
    // convert unix timestamp to date
    const d = new Date(arg1 * 1000);
    const fullDate = d.toLocaleString();
    const dateOnly = fullDate.split(",")[0];
    const timeOnly = fullDate.split(",")[1];
    return `${timeOnly}`;
  } else {
    const todayDate = new Date().toLocaleString("en-US", {
      year: undefined,
      month: undefined,
      day: undefined,
      weekday: undefined,
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: undefined,
    });
    return `${todayDate}`;
  }
}
