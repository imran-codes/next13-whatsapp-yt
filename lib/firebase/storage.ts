import { formatDate } from "@/components/AppModal/helper";
import { auth, storage } from ".";
import {
  StorageReference,
  listAll,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ImagesType } from "@/types";

export const uploadImage = async (file: File, paramsId: string) => {
  const formattedDate = formatDate(new Date());
  const fileName = `${paramsId}/${formattedDate}.jpg`;
  console.log(fileName, "fileName");
  const storageRef = ref(storage, fileName);
  // upload file to the storage bucket
  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot);
  });
  return fileName;
};

export const handleUpload = async (
  paramsId: string,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  handleClose: () => void,
  file: File | null
) => {
  try {
    console.log("uploading started...");
    console.log(file, "file");
    if (!file) return;
    await uploadImage(file, paramsId);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  } finally {
    setFile(null);
    handleClose();
  }
};

export async function getStorageDownloadUrl(
  fileName: StorageReference
): Promise<string> {
  const url = await getDownloadURL(fileName);
  return url;
}

export const fetchImages = async (
  listRef: StorageReference,
  setImages: React.Dispatch<React.SetStateAction<ImagesType[]>>
) => {
  // Find all the prefixes and items.
  await listAll(listRef).then((res) => {
    const imagesArray: ImagesType[] = [];
    res.items.forEach(async (itemRef: StorageReference) => {
      // All the items under listRef.
      //   get the download url which is the full url path to the image
      const imageURL = await getStorageDownloadUrl(itemRef);
      const imagesData = {
        photoURL: imageURL,
        createdAt: itemRef.name.split(".")[0],
        type: "storage",
        messageSenderId: auth?.currentUser?.uid,
      };
      imagesArray.push(imagesData);
      setImages(imagesArray);
    });
  });
};
