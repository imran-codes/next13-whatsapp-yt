import { AllUsers } from "@/types";

export const getUsers = async () => {
  const staticData = await fetch("https://dummyjson.com/users", {
    cache: "force-cache",
  });
  const dynamicData = await fetch("https://dummyjson.com/users", {
    cache: "no-store",
  });
  const revalidatedData = await fetch("https://dummyjson.com/users", {
    next: { revalidate: 10 },
  });
  const userData: AllUsers = await dynamicData.json();

  return userData;
};
