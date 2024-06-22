import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

interface Props {
  data: ProjectFormData;
  projectId: Project["_id"];
}

export default function EditProjectForm({ data, projectId }: Props) {
  const navigate = useNavigate();
  const quieryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      quieryClient.invalidateQueries({ queryKey: ["projects"] });
      quieryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      navigate("/");
    },
  });

  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguente formulario para editar el proyecto
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 cursor-pointer 
        transition-colors px-10 py-3 text-white text-xl font-bold"
            to="/"
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          action=""
          className="bg-white shadow-lg p-10 mt-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value={"Guardar Cambios"}
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold 
          hover:bg-fuchsia-700  cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
