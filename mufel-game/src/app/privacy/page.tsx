// /privacy/page.tsx
import LegalPage from "../../../components/ui/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidad">

      <p className="italic text-sm text-gray-400 mb-6">
        Última modificación: 15 de mayo de 2025
      </p>

      <p className="mb-6">
        En MufelGame, tu privacidad es una prioridad. Este documento detalla cómo recopilamos, usamos, protegemos y compartimos tu información personal. También explica los derechos que tienes como usuario y cómo ejercerlos. Esta política se aplica a todos los servicios de Mufel, incluyendo nuestro sitio web, aplicaciones y el juego en sí.
      </p>

      <h2 className="mt-10 mb-4">Índice</h2>
      <ol className="list-decimal list-inside mb-10 space-y-2 text-blue-400 underline">
        <li><a href="#recopilacion">1. Información que recopilamos</a></li>
        <li><a href="#uso">2. Cómo usamos la información</a></li>
        <li><a href="#comparticion">3. Compartición de datos</a></li>
        <li><a href="#seguridad">4. Seguridad de los datos</a></li>
        <li><a href="#derechos">5. Tus derechos</a></li>
        <li><a href="#retencion">6. Retención de datos</a></li>
        <li><a href="#menores">7. Información sobre menores</a></li>
        <li><a href="#cookies">8. Uso de cookies y tecnologías similares</a></li>
        <li><a href="#contacto">9. Contacto</a></li>
      </ol>

      <h2 id="recopilacion" className="mt-10 mb-4">1. Información que recopilamos</h2>
      <p className="mb-4">Podemos recopilar los siguientes tipos de información:</p>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li><strong>Identificadores personales:</strong> como nombre, correo electrónico, nombre de usuario y avatar.</li>
        <li><strong>Información técnica:</strong> dirección IP, navegador, tipo de dispositivo, resolución de pantalla, sistema operativo.</li>
        <li><strong>Datos de uso:</strong> estadísticas de partidas, logros, progreso, interacción con menús y modos de juego.</li>
        <li><strong>Datos del chat y comunicación:</strong> mensajes privados, mensajes de salas y contenido compartido dentro del juego.</li>
        <li><strong>Información financiera:</strong> en caso de compras, datos limitados necesarios para procesarlas (sin almacenar tarjetas).</li>
        <li><strong>Cookies y tecnologías similares:</strong> para recordar preferencias, realizar análisis y mostrar contenido relevante.</li>
      </ul>

      <h2 id="uso" className="mt-10 mb-4">2. Cómo usamos la información</h2>
      <p className="mb-4">Utilizamos tus datos para:</p>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li>Gestionar tu cuenta y progreso dentro del juego.</li>
        <li>Personalizar tu experiencia en función de tu comportamiento y preferencias.</li>
        <li>Prevenir fraudes, trampas o accesos no autorizados.</li>
        <li>Proporcionarte soporte técnico y resolver incidencias.</li>
        <li>Mejorar nuestros productos y servicios mediante analítica agregada.</li>
        <li>Enviarte actualizaciones importantes, boletines informativos o encuestas opcionales.</li>
        <li>Cumplir con requisitos legales o normativos.</li>
      </ul>

      <h2 id="comparticion" className="mt-10 mb-4">3. Compartición de datos</h2>
      <p className="mb-4">Podemos compartir tu información con:</p>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li><strong>Proveedores de infraestructura:</strong> como servicios de servidores, almacenamiento o red.</li>
        <li><strong>Servicios de análisis:</strong> para entender el comportamiento de los jugadores (por ejemplo, Google Analytics).</li>
        <li><strong>Proveedores de pagos:</strong> para gestionar compras internas.</li>
        <li><strong>Autoridades legales:</strong> cuando estemos obligados por ley o ante requerimientos válidos.</li>
      </ul>
      <p className="mb-8">No vendemos tu información personal bajo ninguna circunstancia.</p>

      <h2 id="seguridad" className="mt-10 mb-4">4. Seguridad de los datos</h2>
      <p className="mb-4">Implementamos medidas de seguridad físicas, técnicas y organizativas para proteger tus datos, incluyendo:</p>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li>Cifrado de datos en tránsito y en reposo.</li>
        <li>Control de acceso basado en roles.</li>
        <li>Copias de seguridad automáticas.</li>
        <li>Auditorías internas de seguridad.</li>
      </ul>
      <p className="mb-8">Sin embargo, ningún sistema es completamente invulnerable, por lo que también dependemos de ti para mantener segura tu cuenta.</p>

      <h2 id="derechos" className="mt-10 mb-4">5. Tus derechos</h2>
      <p className="mb-4">De acuerdo con la normativa de protección de datos aplicable, tienes derecho a:</p>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li>Acceder a tus datos personales.</li>
        <li>Solicitar la corrección de datos inexactos.</li>
        <li>Solicitar la eliminación de tus datos (derecho al olvido).</li>
        <li>Restringir u oponerte al tratamiento de tus datos.</li>
        <li>Solicitar la portabilidad de tus datos a otro proveedor.</li>
      </ul>
      <p className="mb-8">Puedes ejercer tus derechos escribiendo a <strong>privacidad@mufelgame.com</strong>. Respondemos en un plazo máximo de 30 días.</p>

      <h2 id="retencion" className="mt-10 mb-4">6. Retención de datos</h2>
      <p className="mb-8">Conservamos tus datos mientras tu cuenta esté activa y durante un periodo posterior razonable para fines legales, contables y de seguridad.</p>

      <h2 id="menores" className="mt-10 mb-4">7. Información sobre menores</h2>
      <p className="mb-8">Nuestros servicios no están dirigidos a menores de 13 años. Si descubrimos que un menor ha proporcionado datos personales, procederemos a eliminarlos de inmediato.</p>

      <h2 id="cookies" className="mt-10 mb-4">8. Uso de cookies y tecnologías similares</h2>
      <p className="mb-4">Utilizamos cookies propias y de terceros para:</p>
      <ul className="list-disc list-inside mb-8 space-y-2">
        <li>Recordar preferencias del jugador.</li>
        <li>Medir tráfico y rendimiento de la plataforma.</li>
        <li>Mostrar contenido personalizado.</li>
      </ul>
      <p className="mb-8">Puedes administrar tus preferencias desde la configuración del navegador o nuestra herramienta de consentimiento de cookies.</p>

      <h2 id="contacto" className="mt-10 mb-4">9. Contacto</h2>
      <p>Si tienes preguntas o preocupaciones sobre esta política, puedes escribirnos a <strong>legalmufel@gmail.com</strong>.</p>
    </LegalPage>
  );
}
