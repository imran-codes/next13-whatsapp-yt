"use client";

import { storage } from "@/lib/firebase";
import { fetchImages } from "@/lib/firebase/storage";
import { ImagesType } from "@/types";
import { ref } from "firebase/storage";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const StorageImages: React.FC = () => {
  const params = useParams();
  const [images, setImages] = useState<ImagesType[]>([]);

  const listRef = ref(storage, params?.id);

  const handleData = useCallback(async () => {
    await fetchImages(listRef, setImages);
  }, [listRef]);

  useEffect(() => {
    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(images, "images");

  return (
    <>
      {images?.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-end px-4 py-2 ${
            item?.messageSenderId !== params?.id ? "ml-auto" : null
          }  ${
            item?.messageSenderId === params?.id ? "bg-white" : "bg-green-100"
          } rounded-lg shadow-md m-2 max-w-[50%] w-fit`}
        >
          <div>
            <Image src={item?.photoURL} alt="image" width={100} height={100} />
            <p className="mt-1 text-xs text-gray-500">{item?.createdAt}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default StorageImages;
