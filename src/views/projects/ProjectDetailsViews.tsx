import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullProjectsDetailsById } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsViews() {
  const navigate = useNavigate();
  const { data: userData, isLoading: authLoading } = useAuth();
  const params = useParams();
  const projectId = params.projectId!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getFullProjectsDetailsById(projectId),
    retry: false,
  });
  const canEdit = useMemo(
    () => data?.manager === userData?._id,
    [data, userData]
  );

  if (isLoading && authLoading) return "Cargando....";

  if (isError) return <Navigate to={"/404"} />;
  if (data && userData)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>

        <p className="text-2xl font-light text-gray-500">{data.description}</p>
        {isManager(data.manager, userData._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl
                      font-bold cursor-pointer transition-colors"
              onClick={() => {
                navigate("?newTask=true");
              }}
            >
              Agregar Tarea
            </button>

            <Link
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl
                      font-bold cursor-pointer transition-colors"
              to={"team"}
            >
              Colaboradores
            </Link>
          </nav>
        )}
        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
