import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  const location = useLocation();
  const params = useParams();
  const projectId = params.projectId!;
  const queryParams = new URLSearchParams(location.search);
  const editTaskId = queryParams.get("editTask")!;

  const { data, isError } = useQuery({
    queryKey: ["task", editTaskId],
    queryFn: () => getTaskById({ projectId, taskId: editTaskId }),
    enabled: !!editTaskId,
    retry: 2,
  });
  if (isError) return <Navigate to={"/404"} />;

  if (data) return <EditTaskModal data={data} taskId={editTaskId} />;
}
