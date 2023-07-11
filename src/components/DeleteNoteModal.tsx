import type { SetStateAction } from "react";
import type { DetailNote } from "@/types/DetailNote";
import { api } from "@/utils/api";

const DeleteNoteModal = (props: {
  note: DetailNote;
  setDeleteNote: React.Dispatch<SetStateAction<DetailNote | undefined>>;
}) => {
  const close = () => {
    props.setDeleteNote(undefined);
  };
  const ctx = api.useContext();
  const { mutate } = api.note.delete.useMutation({
    onSuccess: () => {
      void ctx.note.getAll.invalidate();
    },
  });
  const deleteNote = () => {
    mutate({ id: props.note.id });
    props.setDeleteNote(undefined);
  };
  return (
    <div className="fixed left-0 top-48 h-fit w-full rounded-md border bg-white p-2 pt-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:w-screen md:left-1/3 md:mx-auto md:h-fit md:w-1/3 md:p-4 md:pt-5 md:shadow-lg">
      <div className="p-1">
        <span className="overflow-hidden overflow-ellipsis text-lg font-medium text-zinc-700 dark:text-zinc-400">
          Do you want to delete note {props.note.title} ?
        </span>
        <div className="mt-3 flex justify-end gap-3 text-lg font-medium">
          <button
            className="rounded-sm bg-zinc-100 p-2 text-zinc-700 hover:bg-red-400 hover:text-zinc-200 dark:bg-slate-800 dark:text-zinc-400 dark:hover:bg-red-600 dark:hover:text-zinc-100"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="rounded-sm bg-sky-200 p-2 text-zinc-700 hover:bg-sky-400 hover:text-zinc-200 dark:bg-blue-900 dark:text-zinc-300 dark:hover:bg-blue-700 dark:hover:text-zinc-100"
            onClick={deleteNote}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteModal;
