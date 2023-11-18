interface SearchParamsVideo {
  page: string
  page_size: string
  userId: string
}

export function extractSearchParamsVideo(url: string): SearchParamsVideo {
  const urlObject = new URL(url)

  const searchParams = new URLSearchParams(urlObject.search)

  const paramsObj = {} as SearchParamsVideo

  for (const [key, value] of searchParams) {
    paramsObj[key as keyof SearchParamsVideo] = value
  }

  return paramsObj
}
