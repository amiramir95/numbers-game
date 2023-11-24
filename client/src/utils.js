export default function generateRandomNumbers(length, minRange, maxRange) {
  if (length <= 0 || minRange > maxRange) throw new Error('Invalid Input')

  const numbers = [];
  let randomNumber = null;
  while (numbers.length < length) {
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    if (!numbers.includes(randomNumber)) numbers.push(randomNumber);
  }
  return numbers;
}
