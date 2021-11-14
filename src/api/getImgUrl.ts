export function getImgUrl(imgName: string) {
  return `${process.env.REACT_APP_API_ENDPOINT}/icons/${imgName}`;
}
