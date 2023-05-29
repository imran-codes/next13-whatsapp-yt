import LoginButton from "@/components/Login/LoginButton";
import Image from "next/image";

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-10">
        <Image
          src="https://www.freepnglogos.com/uploads/whatsapp-png-image-9.png"
          alt="Whatsapp Logo"
          width={200}
          height={200}
        />
        <LoginButton />
      </div>
    </main>
  );
}
