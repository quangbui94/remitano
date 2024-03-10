import { Box, TextField, Button, Snackbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoRequest } from "api/VideoRequest";
import { AuthContext } from "contexts/AuthProvider";
import { getVideoIdFromUrl } from "utils";
import { useSocket } from "contexts/SocketIOProvider";

const ShareLinkBox = () => {
  const navigate = useNavigate();
  const { email } = useContext(AuthContext);
  const { socket } = useSocket();
  const [link, setLink] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const embedId = getVideoIdFromUrl(link);

    //Invalid link
    if (!embedId) {
      setError(true);
      setErrorMessage("Please enter a valid YouTube URL");
      return;
    }

    //Call post request to share video
    try {
      const result = await new VideoRequest().shareVideo({ email, embedId });
      if (result.data.id) {
        setNotificationOpen(true);
        setLink("");
        socket.emit("shareVideo", {
          title: result.data.title,
          email,
        });
        return;
      }
    } catch (error: any) {
      if (!error.response.data.success) {
        setError(true);
        setErrorMessage(error.response.data.message);
        return;
      }
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setLink(e.target.value);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const onBackHandler = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: "20px 50px",
        borderRadius: "5px",
        width: "400px",
        margin: "100px auto",
      }}
    >
      <Typography gutterBottom variant="h5" component="h4">
        Share your awesome videos here
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            value={link}
            id="youtubeUrl"
            label="YouTube URL"
            fullWidth
            error={error}
            helperText={error && errorMessage}
            onChange={onChangeHandler}
          />
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "10px", width: "70px", marginRight: "10px" }}
            >
              Share
            </Button>
            <Button
              variant="contained"
              type="button"
              sx={{ marginTop: "10px", width: "70px" }}
              onClick={onBackHandler}
            >
              Back
            </Button>
          </Box>
          <Snackbar
            open={notificationOpen}
            autoHideDuration={5000}
            onClose={handleNotificationClose}
            message="Video shared Successful!"
          />
        </Box>
      </form>
    </Box>
  );
};

export default ShareLinkBox;
