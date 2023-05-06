export const extractYTVideoID = (youtubeURL: string) => {
  var regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = youtubeURL.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return ""
  }
};

export const paramValToString = (str: string | string[] | undefined): string => {
  if (typeof str === 'string') {
    return str
  }
  if (Array.isArray(str)) {
    return str.join(',')
  }
  return ''
}