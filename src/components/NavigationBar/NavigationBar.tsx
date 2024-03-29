import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Button,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useContext, useState } from "react";

import { AuthContext } from "contexts/AuthProvider";

const BoxWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));

const NavigationBar = () => {
  const navigate = useNavigate();
  const { auth, login, logout, email: authedEmail } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLoginHandler = async () => {
    try {
      const result = auth ? await logout() : await login({ email, password });
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.log(error);
      setError("Invalid incredentials");
    }
  };

  const onShareHandler = () => {
    navigate("/share");
  };

  const handleNotificationClose = () => {
    setError("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0.5 }}
          >
            <YouTubeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Movies
          </Typography>
          {auth ? (
            <>
              <Typography>Welcome user {authedEmail}</Typography>
              <Button
                data-cy="share"
                sx={{ ml: 2 }}
                color="info"
                variant="contained"
                onClick={onShareHandler}
              >
                Share videos
              </Button>
            </>
          ) : (
            <>
              <BoxWrapper>
                <StyledInputBase
                  type="text"
                  value={email}
                  onChange={handleChangeEmail}
                  placeholder="Email"
                  inputProps={{ "aria-label": "email" }}
                />
              </BoxWrapper>
              <BoxWrapper>
                <StyledInputBase
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                  placeholder="Password"
                  inputProps={{ "aria-label": "passwordd" }}
                />
              </BoxWrapper>
            </>
          )}
          <BoxWrapper>
            <Button color="info" variant="contained" onClick={onLoginHandler}>
              {auth ? "Logout" : "Login/Register"}
            </Button>
          </BoxWrapper>
        </Toolbar>
      </AppBar>
      <Snackbar
        data-testid="notification"
        open={!!error}
        autoHideDuration={5000}
        onClose={handleNotificationClose}
        message={error}
      />
    </Box>
  );
};

export default NavigationBar;
