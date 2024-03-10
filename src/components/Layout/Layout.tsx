import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import { Snackbar } from "@mui/material";
import { useSocket } from "../../contexts/SocketIOProvider";
import { trimArray } from "../../utils";

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
    <div>
      <NavigationBar />
      <Snackbar
        open={notificationOpen}
        autoHideDuration={5000}
        onClose={handleNotificationClose}
        message={notificationMessage}
      />
      <Outlet />
    </div>
  );
};

export default Layout;
