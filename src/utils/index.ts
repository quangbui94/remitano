const trimArray = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }

  return str;
};

const isValidYoutubeUrl = (url: string): boolean => {
  const youtubeUrlPattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?.*v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
  return youtubeUrlPattern.test(url);
};

const getVideoIdFromUrl = (str: string): string => {
  const isValid = isValidYoutubeUrl(str);
  if (!isValid) return "";

  let video_id = str.split("v=")[1];
  const ampersandPosition = video_id.indexOf("&");
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }

  return video_id;
};

export { trimArray, getVideoIdFromUrl };
