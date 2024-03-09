import { APIResponse, transform } from "./BaseRequest";
import { HTTPClient } from "./HttpClient";
import { VideoConfig } from "../config/axios";

export interface IVideoResponse {
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
}
