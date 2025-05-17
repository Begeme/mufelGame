// /terms/page.tsx
import LegalPage from "../../../components/ui/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage title="Términos de Servicio">

      <p className="italic text-sm text-gray-400 mb-6">
        Última modificación: 15 de mayo de 2025
      </p>

      <p className="mb-8">
        Estos Términos de Servicio regulan el acceso y uso de los servicios de MufelGame. Al crear una cuenta o utilizar cualquier parte de nuestros servicios, aceptas estas condiciones. Si no estás de acuerdo, debes abstenerte de usar el juego, el sitio web o las aplicaciones relacionadas.
      </p>

      <h2 className="mt-10 mb-4">Índice</h2>
      <ol className="list-decimal list-inside mb-10 space-y-2 text-blue-400 underline">
        <li><a href="#cuenta">1. Creación y gestión de la cuenta</a></li>
        <li><a href="#licencia">2. Licencia de uso</a></li>
        <li><a href="#conducta">3. Conducta del usuario</a></li>
        <li><a href="#contenido">4. Contenido generado por el usuario</a></li>
        <li><a href="#compras">5. Compras y reembolsos</a></li>
        <li><a href="#propiedad">6. Propiedad intelectual</a></li>
        <li><a href="#cancelacion">7. Cancelación y suspensión de cuentas</a></li>
        <li><a href="#modificaciones">8. Cambios en los términos</a></li>
        <li><a href="#responsabilidad">9. Limitación de responsabilidad</a></li>
        <li><a href="#contacto">10. Contacto</a></li>
      </ol>

      <h2 id="cuenta" className="mt-10 mb-4">1. Creación y gestión de la cuenta</h2>
      <p className="mb-8">
        Para acceder a MufelGame necesitas una cuenta. Debes proporcionar información veraz, mantener la confidencialidad de tus credenciales y notificarnos si detectas un uso no autorizado. Eres responsable de todas las actividades realizadas desde tu cuenta.
      </p>

      <h2 id="licencia" className="mt-10 mb-4">2. Licencia de uso</h2>
      <p className="mb-8">
        Te otorgamos una licencia personal, limitada, revocable, no exclusiva e intransferible para acceder y utilizar nuestros servicios con fines no comerciales, conforme a estos términos.
      </p>

      <h2 id="conducta" className="mt-10 mb-4">3. Conducta del usuario</h2>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li>No acoses, amenaces o abuses verbalmente de otros jugadores.</li>
        <li>No utilices software no autorizado como bots, hacks, scripts o exploits.</li>
        <li>No interfieras con el funcionamiento del juego o la red.</li>
        <li>No compartas contenido ofensivo, sexualmente explícito o ilegal.</li>
      </ul>

      <h2 id="contenido" className="mt-10 mb-4">4. Contenido generado por el usuario</h2>
      <p className="mb-8">
        Eres responsable del contenido que generas (chats, nombres, imágenes, etc.). Nos concedes una licencia mundial, gratuita y perpetua para usar, modificar y distribuir ese contenido dentro del ecosistema de Mufel.
      </p>

      <h2 id="compras" className="mt-10 mb-4">5. Compras y reembolsos</h2>
      <p className="mb-8">
        Puedes adquirir contenido digital (monedas, skins, etc.) que no tiene valor monetario fuera del juego. Todas las compras son definitivas y no reembolsables salvo exigencia legal.
      </p>

      <h2 id="propiedad" className="mt-10 mb-4">6. Propiedad intelectual</h2>
      <p className="mb-8">
        Todos los derechos, títulos e intereses sobre MufelGame y su contenido (arte, música, código, narrativa, etc.) pertenecen a MufelGame o sus licenciantes. No puedes copiar, modificar ni distribuir partes del juego sin autorización expresa.
      </p>

      <h2 id="cancelacion" className="mt-10 mb-4">7. Cancelación y suspensión de cuentas</h2>
      <p className="mb-8">
        Podemos suspender o eliminar tu cuenta si incumples estos términos, causas daño a la comunidad o a nuestros sistemas. Puedes cerrar tu cuenta en cualquier momento desde tu perfil.
      </p>

      <h2 id="modificaciones" className="mt-10 mb-4">8. Cambios en los términos</h2>
      <p className="mb-8">
        Podemos actualizar estos términos en cualquier momento. Si el cambio es sustancial, te lo notificaremos. El uso continuado del servicio tras la modificación implica aceptación de los nuevos términos.
      </p>

      <h2 id="responsabilidad" className="mt-10 mb-4">9. Limitación de responsabilidad</h2>
      <p className="mb-8">
        MufelGame no será responsable por pérdidas indirectas, interrupciones, errores o daños derivados del uso del juego. Utilizas nuestros servicios bajo tu propio riesgo y responsabilidad.
      </p>

      <h2 id="contacto" className="mt-10 mb-4">10. Contacto</h2>
      <p>
        Para consultas legales o soporte relacionado con estos términos, escríbenos a <strong>legalmufel@gmail.com</strong>.
      </p>

    </LegalPage>
  );
}
