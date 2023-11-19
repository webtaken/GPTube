import { apiClient } from "@/gptube-api";
import { handleError } from "@/utils/errors/handle-error";

export async function getVideoStats({ userId, videoId }: { userId: string; videoId: string }) {
  try {
    console.log({
      userId,
      videoId,
    });

    const data = await apiClient.apiYoutubeVideosVideoIdGet({
      userId,
      videoId,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}
