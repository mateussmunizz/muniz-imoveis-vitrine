import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button
        type="submit"
        className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium hover:bg-primary-900 transition-colors w-full justify-center rounded-lg shadow-sm"
      >
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Logotipo do Google"
          height="24"
          width="24"
        />
        <span>Continuar com o Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
