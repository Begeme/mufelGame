"use client";
import useOnlineStatus from "../../hooks/useOnlineStatus";

export default function OnlineStatusUpdater() {
  useOnlineStatus();
  return null;
}
