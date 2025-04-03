import ForgotPasswordForm from "../../../components/ui/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Recuperar contraseña
        </h2>

        <ForgotPasswordForm />

        <p className="text-center text-sm text-gray-400 mt-4">
          <Link
            href="/login"
            className="text-yellow-400 hover:text-yellow-300 font-semibold"
          >
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
