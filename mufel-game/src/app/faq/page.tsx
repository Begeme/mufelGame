// /faq/page.tsx
import LegalPage from "../../../components/ui/LegalPage";

export default function FAQPage() {
  return (
    <LegalPage title="Preguntas Frecuentes (FAQ)">

      <p className="italic text-sm text-gray-400 mb-6">
        Actualizado el 15 de mayo de 2025
      </p>

      <h2 className="mt-10 mb-4">Índice</h2>
      <ol className="list-decimal list-inside mb-10 space-y-2 text-blue-400 underline">
        <li><a href="#gratis">1. ¿Mufel es gratuito?</a></li>
        <li><a href="#cuenta">2. ¿Cómo creo una cuenta?</a></li>
        <li><a href="#bugs">3. ¿Cómo reporto un bug?</a></li>
        <li><a href="#requisitos">4. Requisitos mínimos</a></li>
        <li><a href="#compras">5. ¿Hay compras dentro del juego?</a></li>
      </ol>

      <h2 id="gratis" className="mt-10 mb-4">1. ¿Mufel es gratuito?</h2>
      <p className="mb-8">
        Sí, totalmente. Solo hay elementos estéticos opcionales.
      </p>

      <h2 id="cuenta" className="mt-10 mb-4">2. ¿Cómo creo una cuenta?</h2>
      <p className="mb-8">
        Desde la página de inicio, haz clic en “Regístrate” y sigue los pasos.
      </p>

      <h2 id="bugs" className="mt-10 mb-4">3. ¿Cómo reporto un bug?</h2>
      <p className="mb-8">
        Desde el centro de ayuda o al correo <strong>legalmufel@gmail.com</strong>.
      </p>

      <h2 id="requisitos" className="mt-10 mb-4">4. Requisitos mínimos</h2>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li>Sistema: Windows 10 o MacOS 11+</li>
        <li>RAM: 4 GB</li>
        <li>GPU: Compatible con WebGL / OpenGL</li>
      </ul>

      <h2 id="compras" className="mt-10 mb-4">5. ¿Hay compras dentro del juego?</h2>
      <p className="mb-8">
        Sí, pero no afectan la jugabilidad. Todo es cosmético.
      </p>

    </LegalPage>
  );
}
