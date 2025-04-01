// src/app/layout.tsx
import "./globals.css";
import { UserProvider } from "../../context/UserContext";
import Navbar from "../../components/ui/Navbar";
import { ChatProvider } from "../../context/ChatLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          <ChatProvider>
            <Navbar />
            <main>{children}</main>
          </ChatProvider>
        </UserProvider>
      </body>
    </html>
  );
}
