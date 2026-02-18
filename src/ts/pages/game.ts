function generateCards():void{
    const gameField: HTMLElement | null = document.getElementById('game-field');
    const isGameThemes:string | null = localStorage.getItem('gameThemes');
    const isChoosePlayer:string | null = localStorage.getItem('choosePlayer');
    const isBoardSize:string | null = localStorage.getItem('boardSize');

    let numberOfCards = Number(isBoardSize?.match(/\d+/));
    
    if(gameField && isGameThemes && isChoosePlayer && isBoardSize){
        for (let index = 0; index < numberOfCards; index++) {
            const card: HTMLButtonElement = document.createElement('button');
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
                setTimeout(() => card.classList.toggle('is-flipped'), 800);
            });
            if(numberOfCards == 16) card.classList.add('cards16');
            else card.classList.add('cardsOver16')
            card.classList.add('card');
            card.innerHTML = '<div class="card__inner"><img class="card__face card__face--back" src="assets/img/typescript.svg" alt=""><img class="card__face card__face--front" src="assets/img/vite.svg" alt=""></div>'
            gameField.append(card);
        }
    }
    else window.location.href = "/settings";
}

window.addEventListener('load',() => generateCards());