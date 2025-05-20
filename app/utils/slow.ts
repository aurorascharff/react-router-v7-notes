export function slow(delay: number = 700) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
