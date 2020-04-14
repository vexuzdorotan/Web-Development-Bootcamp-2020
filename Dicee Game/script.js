let randomNumber1 = Math.floor(Math.random() * 6) + 1;
let randomNumber2 = Math.floor(Math.random() * 6) + 1;
const contHeader = document.querySelector('.container h1');

document.querySelector('.img1').src = `images/dice${randomNumber1}.png`;
document.querySelector('.img2').src = `images/dice${randomNumber2}.png`;

console.log(`${randomNumber1} & ${randomNumber2}`);

if (randomNumber1 === randomNumber2) {
    contHeader.innerHTML = 'Draw!';
} else if (randomNumber1 > randomNumber2) {
    contHeader.innerHTML = 'Player 1 Wins!';
} else if (randomNumber1 < randomNumber2) {
    contHeader.innerHTML = 'Player 2 Wins!';
}