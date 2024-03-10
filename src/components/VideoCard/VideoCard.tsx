import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { trimArray } from "utils";

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
