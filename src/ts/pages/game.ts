const gameField: HTMLElement | null = document.getElementById('game-field');
const isGameThemes:string | null = localStorage.getItem('gameThemes');
const isChoosePlayer:string | null = localStorage.getItem('choosePlayer');
const isBoardSize:string | null = localStorage.getItem('boardSize');

const headerBtn: HTMLElement | null = document.getElementById('header-button');
const backToGameBtn: HTMLElement | null = document.getElementById('back-to-game');
const backToSettingsBtn: HTMLElement | null = document.getElementById('back-to-settings');
const winnerBackToSettingsBtn: HTMLElement | null = document.getElementById('winner-button');
const overlayPopUp = document.getElementById('query-overlay__pop-up') as HTMLButtonElement | null;
const overlay: HTMLElement | null = document.getElementById('query-overlay');

let numberOfCards:number = Number(isBoardSize?.match(/\d+/));

let cardsArray: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let selectedShuffledCardsArray: string[] = [];

let currentPlayer: 'player-blue' | 'player-orange'
let counterBlue: number = 0;
let counterOrange: number = 0;


function selectedShuffledCards(): void {
    for (let index = 0; index < numberOfCards / 2; index++) {
        let randomNumber:number = Math.floor(Math.random() * (cardsArray.length));
        selectedShuffledCardsArray.push(cardsArray[randomNumber]);
        cardsArray.splice(randomNumber, 1);
    }

    selectedShuffledCardsArray = [...selectedShuffledCardsArray, ...selectedShuffledCardsArray].sort();
    
    for (let i = selectedShuffledCardsArray.length - 1; i > 0; i--) {
        const rN:number = Math.floor(Math.random() * (i + 1));
        [selectedShuffledCardsArray[i], selectedShuffledCardsArray[rN]] = [selectedShuffledCardsArray[rN], selectedShuffledCardsArray[i]];
    }
}

function initGame():void{
    selectedShuffledCards();
    setPlayer();

    eventListeners();
    setCurrentPlayer();
    generateCards();
}

function eventListeners():void{
    if(headerBtn) headerBtn.addEventListener('click', openOverlay);
    if(backToGameBtn) backToGameBtn.addEventListener('click', closeOverlay);
    if(backToSettingsBtn) backToSettingsBtn.addEventListener('click', () => window.location.href = "/settings");
    if(winnerBackToSettingsBtn) winnerBackToSettingsBtn.addEventListener('click', () => window.location.href = "/settings");
    if(overlayPopUp) overlayPopUp.addEventListener('click', bubbling);
    if(overlay) overlay.addEventListener('click', closeOverlay);
}

function setPlayer(){
    if(isChoosePlayer && isChoosePlayer == "player-blue" || isChoosePlayer == "player-orange" ) currentPlayer = isChoosePlayer
}

function setCurrentPlayer(){
    document.getElementById('currentPlayer')?.classList.remove('header__current-player__img--blue', 'header__current-player__img--orange');

    if(currentPlayer == 'player-blue'){
        document.getElementById('currentPlayer')?.classList.add('header__current-player__img--blue');
    } 

    if(currentPlayer == 'player-orange'){
        document.getElementById('currentPlayer')?.classList.add('header__current-player__img--orange');
    } 
}

function generateCards():void{
    if(gameField && isGameThemes && isChoosePlayer && isBoardSize){
        if(numberOfCards > 16) gameField.classList.add('game-field--cardsOver16');

        for (let index = 0; index < numberOfCards; index++) {
            const card: HTMLButtonElement = document.createElement('button');
            card.addEventListener('click', () => {
                if(document.querySelectorAll(".is-flipped[data-revealed = 'false']").length <2){
                    card.classList.add('is-flipped');

                    if(document.querySelectorAll(`.is-flipped[data-pair='${card.dataset.pair}'][data-revealed = 'false']`).length == 2){
                        if(currentPlayer == 'player-blue') counterUP('blue');
                        if(currentPlayer == 'player-orange') counterUP('orange');
                        document.querySelectorAll<HTMLButtonElement>(`.is-flipped[data-pair='${card.dataset.pair}']`).forEach(element => {
                            element.dataset.revealed = 'true';
                            element.removeEventListener;
                        });
                    }
                    else if(document.querySelectorAll(".is-flipped[data-revealed='false']").length == 2){
                        document.querySelectorAll(".is-flipped[data-revealed='false']").forEach(element => {
                            setTimeout(() => element.classList.remove('is-flipped'), 400);
                        });

                        setTimeout(() => {
                            if(currentPlayer == 'player-blue'){
                                currentPlayer = "player-orange"
                                setCurrentPlayer();
                            } 

                            else{
                                currentPlayer = 'player-blue';
                                setCurrentPlayer();
                            }
                        }, 500);
                    }
                }

                if(counterBlue + counterOrange == numberOfCards/2){
                    const gaOvCounterBlue:HTMLSpanElement | null = document.getElementById('game-over-counter-blue');
                    const gaOvCounterOrange:HTMLSpanElement | null = document.getElementById('game-over-counter-orange');
                    const gameOver = document.getElementById('game-over') as HTMLDivElement | null; 

                    const winnerTitle: HTMLElement | null = document.getElementById('winner-title');
                    const winnerImg = document.getElementById('winner-img') as HTMLImageElement | null;
                    const winner = document.getElementById('winner') as HTMLDivElement | null;

                    setTimeout(() => {
                        if(gaOvCounterBlue) gaOvCounterBlue.textContent = String(counterBlue);
                        if(gaOvCounterOrange) gaOvCounterOrange.textContent = String(counterOrange);
                        if(gameOver) gameOver.classList.remove('display-none');
                    }, 800);

                    setTimeout(() => {
                        if(gameOver) gameOver.classList.add('display-none');
                        if(winnerTitle) winnerTitle.textContent = counterBlue < counterOrange ? 'Orange player' : 'Blue Player'
                        if(winnerImg) winnerImg.style.backgroundColor = counterBlue < counterOrange ? 'orange' : 'blue';
                        if(winner) winner.classList.remove('display-none');
                    }, 1600);
                }
            });

            card.dataset.pair = selectedShuffledCardsArray[index];
            card.dataset.revealed = 'false';

            if(numberOfCards == 16) card.classList.add('cards16');
            else card.classList.add('cardsOver16')
            card.classList.add('card');
            card.innerHTML = '<div class="card__inner"><img class="card__face card__face--back" src="assets/img/typescript.svg" alt=""><img class="card__face card__face--front" src="assets/img/vite.svg" alt=""></div>'
            gameField.append(card);
        }
    }
    else window.location.href = "/settings";
}

function counterUP(player:string){
    const counterBlueSpan:HTMLSpanElement | null = document.getElementById('counter-blue');
    const counterOrangeSpan:HTMLSpanElement | null = document.getElementById('counter-orange');
    if(player == 'blue'){
        counterBlue++
        if(counterBlueSpan) counterBlueSpan.textContent = String(counterBlue);
    }

    if(player == 'orange'){
        counterOrange++;
        if(counterOrangeSpan) counterOrangeSpan.textContent = String(counterOrange);
    }
}

function openOverlay():void{
    if(overlay) overlay.classList.remove('display-none');
}

function closeOverlay():void{
    if(overlay) overlay.classList.add('display-none');
}

function bubbling(event:Event):void{
    event.stopPropagation();
}

window.addEventListener('load',() => initGame());