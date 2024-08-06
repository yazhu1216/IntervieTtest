function Q1(N) {
  let sum = 0;
  let sign = 1;

  for (let i = 1; i <= N; i++) {
    sum += sign * i;
    sign *= -1;
  }

  return sum;
}

const N = 100000000;
console.log(`A: ` + Q1(N));
