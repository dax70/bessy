
export default function generateRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
