import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  note: Note;
}

export default function NoteDetails({ note }: Props) {
  const { data, isLoading } = useAuth();
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const queryClient = useQueryClient();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  if (isLoading) return "Cargando...";

  return (
    <div className="p-3 flex justify-between items-center">
      <div className="">
        <p className="">
          {note.content} por:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
          className="bg-red-400 hover:bg-red-500 p-2 text-xs 
        text-white font-bold cursor-pointer transition-colors"
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
