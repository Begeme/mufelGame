// /help/page.tsx
import LegalPage from "../../../components/ui/LegalPage";

export default function HelpPage() {
  return (
    <LegalPage title="Centro de Ayuda">

      <p className="italic text-sm text-gray-400 mb-6">
        Última actualización: 15 de mayo de 2025
      </p>

      <h2 className="mt-10 mb-4">Índice</h2>
      <ol className="list-decimal list-inside mb-10 space-y-2 text-blue-400 underline">
        <li><a href="#cuenta">1. Problemas con la cuenta</a></li>
        <li><a href="#tecnico">2. Soporte técnico</a></li>
        <li><a href="#reporte">3. Reportar errores</a></li>
        <li><a href="#contacto">4. Contacto</a></li>
      </ol>

      <h2 id="cuenta" className="mt-10 mb-4">1. Problemas con la cuenta</h2>
      <p className="mb-8">
        Si no puedes acceder, intenta recuperar tu contraseña. Verifica tu correo o revisa tu carpeta de spam.
      </p>

      <h2 id="tecnico" className="mt-10 mb-4">2. Soporte técnico</h2>
      <p className="mb-8">
        Asegúrate de cumplir los requisitos mínimos. Si el juego no inicia o se cierra, revisa actualizaciones y drivers.
      </p>

      <h2 id="reporte" className="mt-10 mb-4">3. Reportar errores</h2>
      <p className="mb-8">
        Usa nuestro formulario en la sección de soporte o envíanos un correo a <strong>legalmufel@gmail.com</strong>.
      </p>

      <h2 id="contacto" className="mt-10 mb-4">4. Contacto</h2>
      <p className="mb-8">
        Escribe a <strong>legalmufel@gmail.com</strong>. Tiempo estimado de respuesta: 24 a 48 horas hábiles.
      </p>

    </LegalPage>
  );
}
