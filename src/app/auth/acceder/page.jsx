import { userForm } from "react-hook-form";

export default function Acceder() {
  return (
    <div>
      <form action="">
        <input
          type="email"
          {...resgister("email", { required: true })}
          className="bg-slate-500"
        />
        <input type="password" className="bg-slate-500" />
        <button className="bg-slate-500">Iniciar Sesión</button>
      </form>
    </div>
  );
}
