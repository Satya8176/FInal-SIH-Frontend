import React, { useEffect } from "react";
import { onMessageListener } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";

const NotificationHandler = () => {
  useEffect(() => {
    const listen = async () => {
      try {
        const payload = await onMessageListener();
        const { title, body } = payload.notification;

        toast.custom(
          <div
            style={{
              padding: "16px 20px",
              background: "#fff3cd",
              borderLeft: "6px solid #f44336",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              maxWidth: "360px",
              fontFamily: "Arial, sans-serif",
              color: "#856404",
              display: "flex",
              flexDirection: "column",
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "6px", display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px", fontSize: "20px", color: "#f44336" }}>⚠️</span>
              {title || "SOS Alert"}
            </div>
            <div style={{ fontSize: "14px", lineHeight: "1.4" }}>{body || "Emergency notification received."}</div>
          </div>
        );
      } catch (err) {
        console.error("Error receiving foreground message:", err);
      }
    };

    listen();
  }, []);

  return <Toaster position="top-right" toastOptions={{ duration: 7000 }} />;
};

export default NotificationHandler;
