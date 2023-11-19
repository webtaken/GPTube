import { apiClient } from "@/gptube-api";
import { handleError } from "@/utils/errors/handle-error";

export async function getVideosAnalyzed({
  userId,
  page,
  pageSize,
}: {
  userId: string;
  page: number;
  pageSize: number;
}) {
  try {
    const data = await apiClient.apiYoutubeVideosGet({
      userId,
      page,
      pageSize,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}
