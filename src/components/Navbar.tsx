import type { ModalData } from "@/types/ModalData";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import type { SetStateAction } from "react";
import React from "react";

const NavBar = (props: {
  setModalData: React.Dispatch<SetStateAction<ModalData>>;
}) => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Something Went Wrong</div>;
  return (
    <div className="fixed left-0 right-0 top-0 flex flex-row items-center justify-between border-b border-slate-800 bg-slate-900 pl-2 align-middle text-zinc-300 md:pl-4">
      <div className="flex flex-row items-center gap-2 p-2  align-middle">
        <span className="text-3xl font-medium text-zinc-700 dark:text-zinc-300">
          Quick Notes
        </span>
      </div>
      <div className="flex flex-row align-middle">
        <button
          className="bg-sky-950 p-4 text-lg font-medium text-zinc-300 hover:bg-sky-900"
          id="model-open-btn"
          onClick={() => {
            props.setModalData({ mode: "create", show: true });
          }}
        >
          Add Note
        </button>
        <Image
          src={user.profileImageUrl}
          alt="user profile picture"
          width={56}
          height={56}
          className="h-16 w-16"
        />
      </div>
    </div>
  );
};

export default NavBar;
