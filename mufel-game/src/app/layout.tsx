"use client";
import "./globals.css";
import { UserProvider } from "../../context/UserContext";
import Navbar from "../../components/ui/Navbar";
import { ChatProvider } from "../../context/ChatLayout";
import OnlineStatusUpdater from "../../components/ui/OnlineStatusUpdater";


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
            <OnlineStatusUpdater />
            <Navbar />
            <main>{children}</main>
          </ChatProvider>
        </UserProvider>
      </body>
    </html>
  );
}