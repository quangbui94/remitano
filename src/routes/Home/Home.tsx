import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import { VideoRequest, IVideoResponse } from "../../api/VideoRequest";

const Home = () => {
  const [videoCollection, setVideoCollection] = useState<IVideoResponse[]>([]);

  useEffect(() => {
    const getAllVideos = async (): Promise<void> => {
      const result = await new VideoRequest().getAllVideos();
      const allVideos = result.data;
      setVideoCollection(allVideos);
    } 
    getAllVideos();
  }, []);

  return <div style={{ padding: '100px 350px' }}>
    {
      videoCollection.map(video => (
      <VideoCard embedId={video.embedId} title={video.title} owner={video.owner} description={video.description}/>
      ))
    }
  </div>;
};

export default Home;
