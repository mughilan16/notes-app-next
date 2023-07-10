import type { ModalData } from "@/types/ModalData";
import { api } from "@/utils/api";
import type { SetStateAction } from "react";
import type { Resolver } from "react-hook-form";
import type { Note } from "@/types/Note";
import { useForm } from "react-hook-form";

function CreateEditNoteModal(props: {
  modalData: ModalData;
  setModalData: React.Dispatch<SetStateAction<ModalData>>;
}) {
  const { mutate } = api.note.create.useMutation();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    // setValue
  } = useForm<Note>({
    defaultValues: {},
    resetOptions: {
      keepErrors: false,
    },
    resolver: resolver,
  });
  function onCancel() {
    props.setModalData({
      mode: "create",
      show: false,
    });
    console.log("cancel");
  }
  function createNewNote(data: Note) {
    mutate(data);
  }
  return (
    <div
      className={`fixed left-0 top-32 h-fit w-screen rounded-md border bg-white p-0.5 pt-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:w-screen md:left-1/4 md:mx-auto md:h-fit md:w-1/2 md:p-4 md:pt-5 md:shadow-lg ${
        props.modalData.show ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-center text-xl font-medium text-zinc-700 dark:text-zinc-400">
          {props.modalData.mode === "edit" && "Edit Note"}
          {props.modalData.mode === "create" && "New Note"}
        </span>
        <form
          //onSubmit={onSubmit}
          onSubmit={handleSubmit((data, e) => {
            e?.preventDefault();
            if (props.modalData.mode === "create") createNewNote(data);
            props.setModalData({ mode: props.modalData.mode, show: false });
            reset();
          })}
          className="flex flex-col gap-y-4 p-2 md:gap-1 md:p-3"
        >
          <div className="flex flex-col gap-1 md:p-1">
            <div className="flex flex-row justify-between align-middle">
              <span className="text-lg font-medium text-zinc-700 dark:text-zinc-400">
                Title
              </span>
              {errors.title && (
                <span className="text-md text-lg font-medium text-red-500 dark:text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="rounded-sm border bg-transparent dark:border-slate-800 md:border-2">
              <input
                className="w-full bg-transparent p-1 py-2 text-lg font-medium text-zinc-700 focus:outline-none dark:text-zinc-400 dark:placeholder:text-slate-800 md:p-2"
                {...register("title")}
                placeholder="Note title"
              />
            </div>
          </div>
          <div className="md:g-3 flex grow flex-col md:p-1">
            <span className="text-lg font-medium text-zinc-700 dark:text-zinc-400">
              Content
            </span>
            <div className="h-36 rounded-sm border dark:border-slate-800 md:border-2">
              <textarea
                {...register("content")}
                placeholder="This is my note."
                className="font-medioum h-96 w-full bg-transparent p-1 py-2 text-lg text-zinc-700 focus:outline-none dark:text-zinc-400 dark:placeholder:text-slate-800 md:h-full md:p-2"
              />
            </div>
          </div>
          <div className="mb-1 flex justify-end gap-3 md:m-0">
            <button
              className="rounded-sm bg-zinc-100 p-2 text-lg font-medium text-zinc-700 hover:bg-red-400 hover:text-zinc-200 dark:bg-slate-800 dark:text-zinc-400 dark:hover:bg-red-600 dark:hover:text-zinc-100"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-sm bg-sky-200 p-2 text-lg font-medium text-zinc-700 hover:bg-sky-400 hover:text-zinc-200 dark:bg-blue-900 dark:text-zinc-300 dark:hover:bg-blue-700 dark:hover:text-zinc-100"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const resolver: Resolver<Note> = (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
          title: {
            type: "required",
            message: "*required",
          },
        }
      : {},
  };
};

export default CreateEditNoteModal;
