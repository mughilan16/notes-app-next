import type { ModalData } from "@/types/ModalData"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import type { SetStateAction } from "react"
import React from "react"

const NavBar = (props: {setModalData: React.Dispatch<SetStateAction<ModalData>>}) => {
  const { user, isLoaded } = useUser()
  if (!isLoaded) return <div>Loading...</div>
  if (!user) return <div>Something Went Wrong</div>
  return (
    <div className="flex flex-row items-center align-middle justify-between pl-2 md:pl-4 fixed top-0 left-0 right-0 bg-slate-900 text-zinc-300 border-b border-slate-800">
      <div className="flex flex-row items-center align-middle p-2  gap-2">
        <span className="font-medium text-lg text-zinc-700 dark:text-zinc-300">
          Notes App
        </span>
      </div>
      <div className="flex flex-row align-middle">
        <button
          className="p-4 text-lg font-medium bg-sky-950 text-zinc-300 hover:bg-sky-900"
          id="model-open-btn"
          onClick={() => {props.setModalData({mode: "edit", show: true})}}
        >
          Add Note
        </button>
        <Image src={user.profileImageUrl} alt="user profile picture" width={56} height={56} className="h-16 w-16"/> 
      </div>
    </div>
  );
}

export default NavBar
