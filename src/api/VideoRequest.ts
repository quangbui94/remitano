import { APIResponse, transform } from "api/BaseRequest";
import { HTTPClient } from "api/HttpClient";
import { VideoConfig } from "config/axios";

export interface IVideoResponse {
  id: string;
  embedId: string;
  title: string;
  owner: string;
  description: string;
}

interface IVideoRequest {
  getAllVideos(): Promise<APIResponse<IVideoResponse[]>>;
}

export class VideoRequest extends HTTPClient implements IVideoRequest {
  constructor() {
    super(VideoConfig);
  }

  public async getAllVideos(): Promise<APIResponse<IVideoResponse[]>> {
    const instance = this.createInstance();
    return await instance.get("/videos").then(transform);
  }

  public async shareVideo({
    embedId,
    email,
  }): Promise<APIResponse<IVideoResponse>> {
    const instance = this.createInstance();
    return await instance.post("/videos", { embedId, email }).then(transform);
  }
}
