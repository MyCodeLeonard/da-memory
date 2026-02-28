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

let cardsArray: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
let selectedShuffledCardsArray: string[] = [];

let theme: string;

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
    setTheme();

    eventListeners();
    setCurrentPlayer();
    setCurrentTheme();
    generateCards();

    test();
}

function eventListeners():void{
    if(headerBtn) headerBtn.addEventListener('click', openOverlay);
    if(backToGameBtn) backToGameBtn.addEventListener('click', closeOverlay);
    if(backToSettingsBtn) backToSettingsBtn.addEventListener('click', () => window.location.href = "/settings");
    if(winnerBackToSettingsBtn) winnerBackToSettingsBtn.addEventListener('click', () => window.location.href = "/settings");
    if(overlayPopUp) overlayPopUp.addEventListener('click', bubbling);
    if(overlay) overlay.addEventListener('click', closeOverlay);
}

function setTheme():void{
    if(isGameThemes) theme = isGameThemes;
}

function setCurrentTheme():void{
    document.getElementById('game-section')?.classList.add(`game-section--${theme}`);

    const blueLable = document.getElementsByClassName('header__counters__counter__img--blue')[0] as HTMLImageElement | null;
    if(blueLable) blueLable.src =`/assets/img/${theme}-player-blue.png`;

    const orangeLable = document.getElementsByClassName('header__counters__counter__img--orange')[0] as HTMLImageElement | null;
    if(orangeLable) orangeLable.src =`/assets/img/${theme}-player-orange.png`;

    if(theme == 'code-vibes-theme') {
        document.getElementById('counter-blue-name')?.classList.remove('display-none');
        document.getElementById('counter-orange-name')?.classList.remove('display-none');

        document.getElementById('counter-blue')?.classList.add('header__counters__counter_span--font-comfortaa');
        document.getElementById('counter-orange')?.classList.add('header__counters__counter_span--font-comfortaa');
    }

    document.getElementsByClassName('header')[0].classList.add(`header--${theme}`);
    document.getElementsByClassName('header__counters')[0].classList.add(`header__counters--${theme}`);
    document.getElementsByClassName('header__current-player')[0].classList.add(`header__current-player--${theme}`);
    document.getElementsByClassName('header__current-player__span')[0].classList.add(`header__current-player__span--${theme}`);
    document.getElementsByClassName('header__button')[0].classList.add(`header__button--${theme}`);

    const headerButtonIcon = document.getElementById('header-button-icon') as HTMLImageElement | null;
    if((theme == 'code-vibes-theme' || theme == 'gaming-theme') && headerButtonIcon) headerButtonIcon.src = `/assets/img/exit-game.png`;

    document.getElementsByClassName('header__button__span')[0].classList.add(`header__button__span--${theme}`);

    document.getElementsByClassName('query-overlay__pop-up')[0].classList.add(`query-overlay__pop-up--${theme}`);
    document.getElementsByClassName('query-overlay__pop-up__span')[0].classList.add(`query-overlay__pop-up__span--${theme}`);
    document.getElementsByClassName('query-overlay__pop-up__buttons__button--first')[0].classList.add(`query-overlay__pop-up__buttons__button--first-${theme}`);
    document.getElementsByClassName('query-overlay__pop-up__buttons__button--second')[0].classList.add(`query-overlay__pop-up__buttons__button--second-${theme}`);
}

function setPlayer():void{
    if(isChoosePlayer && isChoosePlayer == "player-blue" || isChoosePlayer == "player-orange" ) currentPlayer = isChoosePlayer
}

function setCurrentPlayer():void{
    const currentPlayerIcon = document.getElementById('currentPlayer') as HTMLImageElement | null;
    if(currentPlayerIcon) currentPlayerIcon.src = `/assets/img/${theme}-${currentPlayer}.png`



    // document.getElementById('currentPlayer')?.classList.remove('header__current-player__img--blue', 'header__current-player__img--orange');

    // if(currentPlayer == 'player-blue'){
    //     document.getElementById('currentPlayer')?.classList.add('header__current-player__img--blue');
    // } 

    // if(currentPlayer == 'player-orange'){
    //     document.getElementById('currentPlayer')?.classList.add('header__current-player__img--orange');
    // } 
}

function test():void{
    if(localStorage.getItem('gameThemes') == 'code-vibes-theme'){
        if(localStorage.getItem('boardSize') == '16-cards') gameField?.classList.add('game-field--code-vibes-theme-cards16');
        if(localStorage.getItem('boardSize') == '24-cards') gameField?.classList.add('game-field--code-vibes-theme-cards24');
        if(localStorage.getItem('boardSize') == '36-cards') gameField?.classList.add('game-field--code-vibes-theme-cards36');
    }

    if(localStorage.getItem('gameThemes') == 'gaming-theme'){
        if(localStorage.getItem('boardSize') == '16-cards') gameField?.classList.add('game-field--gaming-theme-cards16');
        if(localStorage.getItem('boardSize') == '24-cards') gameField?.classList.add('game-field--gaming-theme-cards24');
        if(localStorage.getItem('boardSize') == '36-cards') gameField?.classList.add('game-field--gaming-theme-cards36');
    }

    if(localStorage.getItem('gameThemes') == 'da-projects-theme'){
        if(localStorage.getItem('boardSize') == '16-cards') gameField?.classList.add('game-field--da-projects-theme-cards16');
        if(localStorage.getItem('boardSize') == '24-cards') gameField?.classList.add('game-field--da-projects-theme-cards24');
        if(localStorage.getItem('boardSize') == '36-cards') gameField?.classList.add('game-field--da-projects-theme-cards36');
    }

    if(localStorage.getItem('gameThemes') == 'foods-theme'){
        if(localStorage.getItem('boardSize') == '16-cards') gameField?.classList.add('game-field--foods-theme-cards16');
        if(localStorage.getItem('boardSize') == '24-cards') gameField?.classList.add('game-field--foods-theme-cards24');
        if(localStorage.getItem('boardSize') == '36-cards') gameField?.classList.add('game-field--foods-theme-cards36');
    }
}

function generateCards():void{
    if(gameField && isGameThemes && isChoosePlayer && isBoardSize){

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

            let theme = localStorage.getItem('gameThemes');
            card.dataset.pair = theme+'-front-'+selectedShuffledCardsArray[index];
            card.dataset.revealed = 'false';

            card.classList.add('card', `card--${theme}`);
            card.innerHTML = `<div class="card__inner card__inner--xy-size-${theme}"><img class="card__face card__face--front" src="assets/img/${card.dataset.pair}.png" alt=""><img class="card__face card__face--back" src="assets/img/${theme}-back.png" alt=""></div>`
            gameField.append(card);
        }
    }
    else window.location.href = "/settings";
}

function counterUP(player:string):void{
    const counterBlueSpan:HTMLSpanElement | null = document.getElementById('counter-blue');
    const counterOrangeSpan:HTMLSpanElement | null = document.getElementById('counter-orange');
    if(player == 'blue'){
        counterBlue++
        if(counterBlueSpan)counterBlueSpan.textContent = String(counterBlue);   
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