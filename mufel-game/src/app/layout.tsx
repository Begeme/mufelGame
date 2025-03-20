import "./globals.css";
import Navbar from "../../components/ui/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar /> {/* Navbar debe ser un "Client Component" */}
        <main>{children}</main>
      </body>
    </html>
  );
}

