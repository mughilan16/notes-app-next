import Head from "next/head";
import NavBar from "@/components/Navbar";
import React, { useState } from "react";
import type { SetStateAction } from "react";
import type { ModalData } from "@/types/ModalData";
import CreateEditNoteModal from "@/components/CreateEditNoteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { DetailNote } from "@/types/DetailNote";
import { LoadingPage } from "@/components/loading";
import DeleteNoteModal from "@/components/DeleteNoteModal";
import ViewNoteModal from "@/components/ViewNoteModal";

dayjs.extend(relativeTime);

export default function Home() {
  const [modalData, setModalData] = useState<ModalData>({
    mode: "create",
    show: false,
  });
  const [deleteNote, setDeleteNote] = useState<DetailNote>();
  const [selectedNote, setSelectedNote] = useState<DetailNote>();
  const [viewNote, setViewNote] = useState<DetailNote>();
  const { data, isLoading } = api.note.getAll.useQuery();
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="min-w-screen flex min-h-screen flex-col items-center justify-center">
        <div className="flex h-full min-h-screen flex-col bg-slate-900">
          <NavBar setModalData={setModalData} />
          <div className="mt-14 grid w-screen gap-4 p-4 pt-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {isLoading && <LoadingPage />}
            {data?.length !== 0 ? (
              data?.map((note) => (
                <NoteView
                  note={note}
                  key={note.id}
                  setSelectedNote={setSelectedNote}
                  setModalData={setModalData}
                  setDeleteNote={setDeleteNote}
                  setPreviewNote={setViewNote}
                />
              ))
            ) : (
              <div className="absolute left-0 top-1/3 w-screen text-center text-xl text-slate-500 lg:text-2xl">
                You have no note.
                <br />
                Add New Note
              </div>
            )}
          </div>
          <div
            className={`fixed inset-0 h-full w-full overflow-y-auto  bg-gray-950 bg-opacity-50 ${
              modalData.show || deleteNote || viewNote ? "" : "hidden"
            }`}
            onClick={() => {
              setModalData({ mode: "create", show: false });
              setDeleteNote(undefined);
              setViewNote(undefined)
            }}
          ></div>
          <CreateEditNoteModal
            modalData={modalData}
            setModalData={setModalData}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
          />
          <ViewNoteModal setNote={setViewNote} note={viewNote}/>
          {deleteNote && (
            <DeleteNoteModal setDeleteNote={setDeleteNote} note={deleteNote} />
          )}
        </div>
      </main>
    </>
  );
}

function NoteView(props: {
  note: DetailNote;
  setSelectedNote: React.Dispatch<SetStateAction<DetailNote | undefined>>;
  setDeleteNote: React.Dispatch<SetStateAction<DetailNote | undefined>>;
  setPreviewNote: React.Dispatch<SetStateAction<DetailNote | undefined>>;
  setModalData: React.Dispatch<SetStateAction<ModalData>>;
}) {
  const setEdit = () => {
    props.setSelectedNote(props.note);
    props.setModalData({ mode: "edit", show: true });
  };
  const setDelete = () => {
    props.setDeleteNote(props.note);
  };
  const setPreview = () => {
    props.setPreviewNote(props.note)
  }
  return (
    <div className="flex h-40 min-h-full min-w-full flex-col gap-1 rounded-sm bg-slate-800 p-3 shadow-md">
      <div className="h-5/6">
        <div className="flex flex-row justify-between align-middle">
          <span className="grow cursor-pointer text-lg font-medium text-zinc-300" onClick={setPreview}>
            {props.note.title}
          </span>
          <div className="flex flex-row gap-2 align-middle">
            <button>
              <FontAwesomeIcon
                icon={faEdit}
                className="h-4 text-gray-300 hover:text-yellow-500"
                onClick={setEdit}
              />
            </button>
            <button>
              <FontAwesomeIcon
                icon={faTrash}
                className="h-4 text-gray-300 hover:text-red-700"
                onClick={setDelete}
              />
            </button>
          </div>
        </div>
        <span className="font-regular grow cursor-pointer overflow-hidden text-ellipsis text-lg text-zinc-400" onClick={setPreview}>
          {props.note.content}
        </span>
      </div>
      <div className="flex justify-end text-sm text-slate-600">
        {`Updated ${dayjs(props.note.createdAt).fromNow()}`}
      </div>
    </div>
  );
}
