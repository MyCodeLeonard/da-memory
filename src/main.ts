import './styles/main.scss';

function generateCards(numberOfCards:number = 36):void{
    const gameField: HTMLElement | null = document.getElementById('game-field');
    
    if(gameField){
        for (let index = 0; index < numberOfCards; index++) {
            const card: HTMLButtonElement = document.createElement('button');
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
                setTimeout(() => card.classList.toggle('is-flipped'), 800);
            });
            card.classList.add('card');
            card.innerHTML = '<div class="card__inner"><img class="card__face card__face--back" src="assets/img/typescript.svg" alt=""><img class="card__face card__face--front" src="assets/img/vite.svg" alt=""></div>'
            gameField.append(card);
        }
    }     
}

window.addEventListener('load',() => generateCards());