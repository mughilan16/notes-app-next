import type { SetStateAction } from "react"
import { useEffect } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";

type Note = {
  content: string,
  title: string
}

function CreateNoteModal(props: {
  showModal: boolean;
  setModalData: React.Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue
  } = useForm<Note>({
    defaultValues: {
    },
    resetOptions: {
      keepErrors: false,
    },
    resolver: resolver,
  });
  const CreateNote = (data: Note) => {
    const newNote: Note = {
      title: data.title,
      content: data.content,
    };
    console.log(newNote)
    }
    props.setModalData(false);
    reset();
  };
  const onCancel = () => {
  };
  return (
    <div
      className={`fixed top-32 h-fit w-screen md:h-fit left-0 md:left-1/4 md:mx-auto p-0.5 pt-5 md:p-4 md:pt-5 border sm:w-screen md:w-1/2 shadow-md md:shadow-lg rounded-md bg-white dark:bg-slate-900 dark:border-slate-800 ${props.showModal ? "" : "hidden"
        } ${props.editNote ? "" : "hideen"}`}
    >
      <div className="flex flex-col">
        <span className="text-center text-xl text-zinc-700 font-medium dark:text-zinc-400">
          {props.editNote && "Edit Note"}
          {!props.editNote && "New Note"}
        </span>
        <form
          onSubmit={handleSubmit(CreateNote)}
          className="flex flex-col p-2 md:p-3 gap-y-4 md:gap-1"
        >
          <div className="flex flex-col md:p-1 gap-1">
            <div className="flex flex-row justify-between align-middle">
              <span className="text-lg font-medium text-zinc-700 dark:text-zinc-400">
                Title
              </span>
              {errors.title && (
                <span className="text-lg font-medium text-red-500 text-md dark:text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="border md:border-2 rounded-sm bg-transparent dark:border-slate-800">
              <input
                className="focus:outline-none p-1 py-2 md:p-2 font-medium text-lg w-full text-zinc-700 bg-transparent dark:text-zinc-400 dark:placeholder:text-slate-800"
                {...register("title")}
                placeholder="Note title"
              />
            </div>
          </div>
          <div className="flex flex-col md:p-1 md:g-3 grow">
            <span className="text-lg font-medium text-zinc-700 dark:text-zinc-400">
              Content
            </span>
            <div className="border md:border-2 rounded-sm h-36 dark:border-slate-800">
              <textarea
                {...register("content")}
                placeholder="This is my note."
                className="w-full h-96 p-1 py-2 md:p-2 font-medioum text-lg focus:outline-none md:h-full text-zinc-700 bg-transparent dark:text-zinc-400 dark:placeholder:text-slate-800"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mb-1 md:m-0">
            <button
              className="bg-zinc-100 text-lg text-zinc-700 rounded-sm p-2 font-medium hover:bg-red-400 hover:text-zinc-200 dark:bg-slate-800 dark:text-zinc-400 dark:hover:bg-red-600 dark:hover:text-zinc-100"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-sky-200 text-lg text-zinc-700 rounded-sm p-2 font-medium hover:bg-sky-400 hover:text-zinc-200 dark:bg-blue-900 dark:text-zinc-300 dark:hover:bg-blue-700 dark:hover:text-zinc-100"
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
    errors: !values.title ? {
      title: {
        type: "required",
        message: "*required",
      },
    }
      : {},
  };
};

export default CreateNoteModal;

