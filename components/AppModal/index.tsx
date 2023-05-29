import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { boxStyle, handleModalChildren } from "./helper";
import { IconModalType } from "./index.interface";
import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { getSnapshotDoc, usersCollection } from "@/lib/firebase/userController";
import { ContactsType } from "@/types";

type Props = {
  icon: JSX.Element;
  title: string;
  modalType: IconModalType;
};

const AppModal: React.FC<Props> = ({ icon, title, modalType }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetch user contacts in realtime from firestore
  const [contacts, setContacts] = React.useState<ContactsType[]>([]);

  useEffect(
    () =>
      onSnapshot(usersCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        setContacts(snapshot.docs.map((doc) => getSnapshotDoc(doc)));
      }),
    []
  );

  return (
    <div>
      <div onClick={handleOpen}>{icon}</div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <h1 className="text-xl font-bold">{title}</h1>
          {handleModalChildren(modalType, contacts, handleClose)}
        </Box>
      </Modal>
    </div>
  );
};

export default AppModal;
