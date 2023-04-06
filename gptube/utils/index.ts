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
