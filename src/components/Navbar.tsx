import type { ModalData } from "@/types/ModalData";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import type { SetStateAction } from "react";
import React from "react";
import { LoadingSpinner } from "./loading";

const NavBar = (props: {
  setModalData: React.Dispatch<SetStateAction<ModalData>>;
}) => {
  const { user, isLoaded } = useUser();
  return (
    <div className="fixed left-0 right-0 top-0 flex flex-row items-center justify-between border-b border-slate-800 bg-slate-900 pl-2 align-middle text-zinc-300 md:pl-4">
      <div className="flex flex-row items-center gap-2 p-2  align-middle">
        <Image src="/assignment.png" alt="logo" width={44} height={44}></Image>
        <span className="hidden md:flex text-xl font-medium text-zinc-700 dark:text-zinc-300 md:text-2xl lg:text-3xl">
          Quick Notes
        </span>
      </div>
      <div className="flex flex-row align-middle">
        <button
          className="hidden bg-sky-950 p-4 text-lg font-medium text-zinc-300 hover:bg-sky-900 md:flex"
          id="model-open-btn"
          onClick={() => {
            props.setModalData({ mode: "create", show: true });
          }}
        >
          Add Note
        </button>
        <button
          className="bg-sky-950 p-4 text-lg font-medium text-zinc-300 hover:bg-sky-900 md:hidden"
          id="model-open-btn"
          onClick={() => {
            props.setModalData({ mode: "create", show: true });
          }}
        >
          Add
        </button>
        {!isLoaded && <LoadingSpinner size={64} />}
        {user && <Image
          src={user.profileImageUrl}
          alt="user profile picture"
          width={56}
          height={56}
          className="h-16 w-16"
        />}
      </div>
    </div>
  );
};

export default NavBar;
