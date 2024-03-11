import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Snackbar, Box } from "@mui/material";

import NavigationBar from "components/NavigationBar/NavigationBar";
import { useSocket } from "contexts/SocketIOProvider";
import { trimArray } from "utils";

interface IMessage {
  message: string;
}

const Layout: React.FC = () => {
  const { socket } = useSocket();
  const [notificationOpen, setNoficationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  useEffect(() => {
    socket.on("shareVideo", (data: IMessage) => {
      if (data.message) {
        setNoficationOpen(true);
        setNotificationMessage(trimArray(data.message, 50));
      }
    });

    return () => {
      socket.off("shareVideo");
    };
  }, []);

  const handleNotificationClose = () => {
    setNoficationOpen(false);
  };

  return (
    <Box data-testid="layout">
      <NavigationBar />
      <Snackbar
        data-testid="notification-close-button"
        open={notificationOpen}
        autoHideDuration={5000}
        onClose={handleNotificationClose}
        message={notificationMessage}
      />
      <Outlet />
    </Box>
  );
};

export default Layout;
