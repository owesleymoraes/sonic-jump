const sonic = document.querySelector('.sonic');
const background = document.querySelector('.backgraund')
const body = document.querySelector('body')

let isJupping = false;
let isGameOver = false;
let position = 0;

function handlerkeyUp(event) {

    if (event.keyCode === 32) {

        if (!isJupping) {

            jump();

        }
    }

}

function jump() {

    isJupping = true;

    let upInterval = setInterval(() => {
        if (position >= 350) {
            clearInterval(upInterval); // impedindo que o objeto suba intermitente

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval); // impedindo que o objeto desça intermitente
                    isJupping = false;
                }
                else {
                    position -= 20;
                    sonic.style.bottom = position + "px";
                }


            }, 25);

        } else {
            //subindo
            position += 20;
            sonic.style.bottom = position + "px";
        }

    }, 20);

}

function createObstacle() {
    const obtacle = document.createElement('div'); // criando o elemento no html
    let obtaclePosition = 1000;
    let randowTime = Math.random() * 6000;

    if (isGameOver) return;

    obtacle.classList.add('obtacle'); //criando a classe na tag
    background.appendChild(obtacle); // inserindo a nova tag no bory cujo o nome da classe é background
    obtacle.style.left = obtaclePosition + 'px';


    let leftTimer = setInterval(() => {
        if (obtaclePosition < -120) {

            // Saiu da tela
            clearInterval(leftTimer);
            background.removeChild(obtacle);
        } else if (obtaclePosition > 0 && obtaclePosition < 120 && position < 120) {
            // Game over

            clearInterval(leftTimer);
            isGameOver = true;
           
            document.body.innerHTML = '<img class="game-over" src="img/game-over-gif.gif">';

        } else {
            obtaclePosition -= 10;
            obtacle.style.left = obtaclePosition + 'px';
        }
    }, 20);

    setTimeout(createObstacle, randowTime);


}


createObstacle();
document.addEventListener('keyup', handlerkeyUp)