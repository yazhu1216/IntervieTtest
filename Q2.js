const prizes = [
  { name: "A", probability: 0.1, count: 1 },
  { name: "B", probability: 2.3, count: 1 },
  { name: "C", probability: 13, count: 2 },
  { name: "D", probability: 18, count: 5 },
  { name: "E", probability: 25, count: 11 },
];

let probabilityDistribution = [];
prizes.forEach((prize) => {
  for (let i = 0; i < prize.probability * 10; i++) {
    probabilityDistribution.push(prize.name);
  }
});

let remainingPrizes = [];
prizes.forEach((prize) => {
  for (let i = 0; i < prize.count; i++) {
    remainingPrizes.push(prize.name);
  }
});

function drawPrize() {
  if (remainingPrizes.length === 0) {
    console.log("所有獎項已經抽完！");
    return;
  }

  let prize;
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * probabilityDistribution.length);
    prize = probabilityDistribution[randomIndex];
  } while (!remainingPrizes.includes(prize));

  remainingPrizes.splice(remainingPrizes.indexOf(prize), 1);
  console.log(`抽到 ${prize} 號獎`);

  console.log("目前尚未抽取的獎勵為:");
  console.log(remainingPrizes);
}

drawPrize();
drawPrize();
drawPrize();
