import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface VideoCardProps {
  embedId: string;
  title: string;
  owner: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ embedId, title, owner, description }) => {
  return (
    <Card sx={{ display: 'flex', mb: 5 }}>
      <CardMedia component="iframe" 
        src={`https://www.youtube.com/embed/${embedId}`}
        sx={{
          aspectRatio: "16/9",
          width: "300px",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Shared by: {owner}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
