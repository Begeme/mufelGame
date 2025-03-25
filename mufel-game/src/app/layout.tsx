// src/app/layout.tsx
import "./globals.css";
import { UserProvider } from "../../context/UserContext";
import Navbar from "../../components/ui/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          <Navbar />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
