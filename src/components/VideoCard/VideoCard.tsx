import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { trimArray } from "utils";
import { useTheme } from "@mui/material/styles";

interface VideoCardProps {
  embedId: string;
  title: string;
  owner: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  embedId,
  title,
  owner,
  description,
}) => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Card sx={{ display: "flex", mb: 5 }} data-testid="video-card">
      <CardMedia
        component="iframe"
        src={`https://www.youtube.com/embed/${embedId}`}
        sx={{
          width: "300px",
          height: "200px",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h4">
          {trimArray(title, 50)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Shared by: {trimArray(owner, 20)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {trimArray(description, 150)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
