"use client";

import "./globals.css";
import { UserProvider } from "../../context/UserContext";
import Navbar from "../../components/ui/Navbar";
import { ChatProvider } from "../../context/ChatLayout";
import OnlineStatusUpdater from "../../components/ui/OnlineStatusUpdater";
import { NotificationProvider } from "../../context/NotificationContext";
import CustomToaster from "../../components/ui/CustomToaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          <NotificationProvider>
            <ChatProvider>
              <OnlineStatusUpdater />
              <Navbar />
              <main>{children}</main>
              <CustomToaster />
            </ChatProvider>
          </NotificationProvider>
        </UserProvider>
      </body>
    </html>
  );
}