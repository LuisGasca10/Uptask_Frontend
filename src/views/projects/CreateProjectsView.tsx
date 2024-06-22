import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ProjectFormData } from "types";
import { createProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectsView() {
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    mutate(formData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguente formulario para crear un proyecto
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
            value={"Crear proyecto"}
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold 
          hover:bg-fuchsia-700  cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
