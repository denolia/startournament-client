export function getImgUrl(imgName: string) {
  return `${process.env.REACT_APP_API_ENDPOINT}/icons/${imgName}`;
}
export function getTurnMarkerImgUrl() {
  return `${process.env.REACT_APP_API_ENDPOINT}/icons/turn_marker.png`;
}

export function getBackgroundImage() {
  return `url("${process.env.REACT_APP_API_ENDPOINT}/q-background.jpg")`;
}
