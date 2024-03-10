import { Box, TextField, Button, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import { VideoRequest } from "../../api/VideoRequest";
import { AuthContext } from "../../contexts/AuthProvider";
import { getVideoIdFromUrl } from "../../utils";

const ShareLinkBox = () => {
  const { email } = useContext(AuthContext);
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

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "5px",
        width: "300px",
        margin: "100px auto",
      }}
    >
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
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "10px", width: "100%" }}
          >
            Share
          </Button>
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
