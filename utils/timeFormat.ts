export default function padZero(integer: number | undefined): string {
  if (integer === undefined) {
    return "";
  }
  if (integer < 10) {
    return `0${integer}`;
  }
  return integer.toString();
}
