import { useEffect, useState } from "react";
import VideoCard from "components/VideoCard/VideoCard";
import { VideoRequest, IVideoResponse } from "api/VideoRequest";
import { Box } from "@mui/material";

const Home = () => {
  const [videoCollection, setVideoCollection] = useState<IVideoResponse[]>([]);

  useEffect(() => {
    const getAllVideos = async (): Promise<void> => {
      const result = await new VideoRequest().getAllVideos();
      const allVideos = result.data;
      setVideoCollection(allVideos);
    };
    getAllVideos();
  }, []);

  return (
    <Box style={{ padding: "100px 350px" }}>
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
