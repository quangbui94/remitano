import { useEffect, useState } from "react";
import VideoCard from "components/VideoCard/VideoCard";
import { VideoRequest, IVideoResponse } from "api/VideoRequest";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const [videoCollection, setVideoCollection] = useState<IVideoResponse[]>([]);
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    const getAllVideos = async (): Promise<void> => {
      const result = await new VideoRequest().getAllVideos();
      const allVideos = result.data;
      setVideoCollection(allVideos);
    };
    getAllVideos();
  }, []);

  return (
    <Box
      data-testid="home"
      style={{
        padding: isMedium
          ? "50px 20px"
          : isLarge
          ? "100px 350px"
          : "100px 500px",
      }}
    >
      {videoCollection.map((video, i) => (
        <VideoCard
          key={i}
          embedId={video.embedId}
          title={video.title}
          owner={video.owner}
          description={video.description}
        />
      ))}
    </Box>
  );
};

export default Home;
