import { LoginForm } from "../../islands/forms/FormLogin.tsx";

export default function Login() {
  return (
    <main class="h-screen w-screen flex flex-row justify-between align-middle items-center py-4 px-2">
      <LoginForm />
      <div class=" h-3/4 w-1/2 px-10">
        <img class="h-full w-full rounded-3xl shadow-2xl" src="/img/imageSession.webp" alt="xd" />
      </div>
    </main>
  );
}
