import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">
        Página no Encontrada
      </h1>
      <p className="text-center mt-10 text-white">
        Tal vez quieras volver a{" "}
        <Link className="text-fuchsia-500" to={"/"}>
          Proyectos
        </Link>
      </p>
    </>
  );
}
