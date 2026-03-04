const gameField: HTMLElement | null = document.getElementById('game-field');
const gameThemes:string | null = localStorage.getItem('gameThemes');
const choosePlayer:string | null = localStorage.getItem('choosePlayer');
const boardSize:string | null = localStorage.getItem('boardSize');

const headerBtn: HTMLElement | null = document.getElementById('header-button');
const backToGameBtn: HTMLElement | null = document.getElementById('back-to-game');
const backToSettingsBtn: HTMLElement | null = document.getElementById('back-to-settings');
const winnerBackToSettingsBtn: HTMLElement | null = document.getElementById('winner-button');
const overlayPopUp = document.getElementById('query-overlay__pop-up') as HTMLButtonElement | null;
const overlay: HTMLElement | null = document.getElementById('query-overlay');

let numberOfCards:number = Number(boardSize?.match(/\d+/));
let currentPlayer = choosePlayer;
let counterBlue: number = 0;
let counterOrange: number = 0;

let cardsArray: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
let selectedShuffledCardsArray: string[] = [];


function selectedShuffledCards():void {
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

function initGame():void {
    selectedShuffledCards();
    eventListeners();
    setCurrentPlayer();
    setCurrentTheme();
    generateCards();
    setGameThemeBoardSize();
}

function eventListeners():void{
    if(headerBtn) headerBtn.addEventListener('click', openOverlay);
    if(backToGameBtn) backToGameBtn.addEventListener('click', closeOverlay);
    if(backToSettingsBtn) backToSettingsBtn.addEventListener('click', () => window.location.href = "/settings");
    if(winnerBackToSettingsBtn) winnerBackToSettingsBtn.addEventListener('click', () => window.location.href = "/settings");
    if(overlayPopUp) overlayPopUp.addEventListener('click', bubbling);
    if(overlay) overlay.addEventListener('click', closeOverlay);
}

function setCurrentTheme():void {
    overSelectorAddClass('game-section', `--${gameThemes}`);
    
    if(gameThemes == 'code-vibes-theme'){
        document.getElementById('counter-blue-name')?.classList.remove('display-none');
        document.getElementById('counter-orange-name')?.classList.remove('display-none');
        document.getElementById('counter-blue-name-go')?.classList.remove('display-none');
        document.getElementById('counter-orange-name-go')?.classList.remove('display-none');
        overSelectorAddClass('header__button__span', `--${gameThemes}`);
        document.getElementById('confetti')?.classList.remove('display-none');
    } 
    
    headerAddClass();
    queryOverlayAddClass();
    gameOverOverlayAddClass();
    winnerOverlayAddClass();
    imageSrcAssign();

    if(backToGameBtn && gameThemes=='gaming-theme') backToGameBtn.textContent = 'No, back to game';
    if(backToSettingsBtn && gameThemes=='gaming-theme') backToSettingsBtn.textContent = 'Yes, quit game';
    
}

function headerAddClass():void {
    overSelectorAddClass('header', `--${gameThemes}`);
    overSelectorAddClass('header__counters', `--${gameThemes}`);
    overSelectorAddClass('header__counters__counter_span', `--${gameThemes}`);
    overSelectorAddClass('header__counters__counter', `--${gameThemes}`)
    overSelectorAddClass('header__counters__counter_span', `--${gameThemes}`);
    overSelectorAddClass('header__current-player', `--${gameThemes}`);
    overSelectorAddClass('header__current-player__span', `--${gameThemes}`);
    overSelectorAddClass('header__button', `--${gameThemes}`);
    overSelectorAddClass('header__button__span', `--${gameThemes}`);
    overSelectorAddClass('header__button__div', `--${gameThemes}`);
    overSelectorAddClass('header__counters__counter__img', `--${gameThemes}`);
    overSelectorAddClass('header__current-player__img', `--${gameThemes}`);
    overSelectorAddClass('header__button__img', `--${gameThemes}`);
    overSelectorAddClass('header__counters__counter_span--blue', `-${gameThemes}`);
    overSelectorAddClass('header__counters__counter_span--orange', `-${gameThemes}`);
}

function queryOverlayAddClass():void {
    const qOPopUp = 'query-overlay__pop-up';
    
    overSelectorAddClass(`${qOPopUp}`, `--${gameThemes}`);
    overSelectorAddClass(`${qOPopUp}__span`, `--${gameThemes}`);
    overSelectorAddClass(`${qOPopUp}__buttons__button`, `--${gameThemes}`);
    overSelectorAddClass(`${qOPopUp}__buttons__button--first`, `-${gameThemes}`);
    overSelectorAddClass(`${qOPopUp}__buttons__button--second`, `-${gameThemes}`);
    overSelectorAddClass(`${qOPopUp}__buttons`, `--${gameThemes}`);
}

function gameOverOverlayAddClass():void {
    overSelectorAddClass('game-over', `--${gameThemes}`);
    overSelectorAddClass('game-over__h1', `--${gameThemes}`);
    overSelectorAddClass('game-over__span', `--${gameThemes}`);
}

function winnerOverlayAddClass():void {
    overSelectorAddClass('winner', `--${gameThemes}`);
    overSelectorAddClass('winner__special-img', `--${gameThemes}`);
    overSelectorAddClass('winner__span', `--${gameThemes}`);
    overSelectorAddClass('winner__h1', `--${gameThemes}`);
    overSelectorAddClass('winner__img', `--${gameThemes}`);
}

function imageSrcAssign():void {
    overSelectorImageSrcAssign('header__counters__counter__img--blue', `/assets/img/${gameThemes}-player-blue.png`);
    overSelectorImageSrcAssign('header__counters__counter__img--orange', `/assets/img/${gameThemes}-player-orange.png`);
    if(gameThemes && ['code-vibes-theme', 'gaming-theme'].includes(gameThemes)) overSelectorImageSrcAssign('header-button-icon', '/assets/img/exit-game.png', '#');
    if(gameThemes && ['da-projects-theme'].includes(gameThemes)) overSelectorImageSrcAssign('header-button-icon', '/assets/img/exit-game-blue.png', '#');

    if(gameThemes == 'gaming-theme'){
        imageHover('.header__button__img--gaming-theme', '.header__button--gaming-theme','exit-game-hover', 'exit-game');
    }

    if(gameThemes == 'da-projects-theme'){
        imageHover('.header__button__img', '.header__button', 'exit-game', 'exit-game-blue');
    }
}

function overSelectorAddClass(selectedAllElements:string, addClass:string, selector:'#' | '.' = '.' ):void {
    if(selector =='#'){
        document.querySelectorAll(`${selector}${selectedAllElements}`).forEach(selectedElement => {
            selectedElement.classList.add(`${addClass}`);
        });
    }

    else{
        document.querySelectorAll(`${selector}${selectedAllElements}`).forEach(selectedElement => {
            selectedElement.classList.add(`${selectedAllElements}${addClass}`);
        });
    }
}

function overSelectorImageSrcAssign(selectedAllElements:string, imageSrc:string, selector:'#' | '.' = '.'):void {
    document.querySelectorAll<HTMLImageElement>(`${selector}${selectedAllElements}`).forEach(selectedElement => {
        selectedElement.src = imageSrc;
    });
}

function imageHover(imgElementName:string, hoverElementName:string, hoverImageSrc:string, noHoverImageSrc:string):void {
    let imgElement = document.querySelector(imgElementName) as HTMLImageElement | null;
    let hoverElement = document.querySelector(hoverElementName) as HTMLButtonElement | null;

    if(hoverElement && imgElement){
        hoverElement.addEventListener('mouseover', () =>  imgElement.src = '/assets/img/' + hoverImageSrc + '.png');
        hoverElement.addEventListener('mouseleave', () => imgElement.src = '/assets/img/' + noHoverImageSrc + '.png');
    }
}

function setCurrentPlayer():void{
    const currentPlayerIcon = document.getElementById('currentPlayer') as HTMLImageElement | null;
    if(currentPlayerIcon && gameThemes && ['da-projects-theme', 'foods-theme'].includes(gameThemes)) currentPlayerIcon.src =`/assets/img/current-${currentPlayer}.png`;
    else if(currentPlayerIcon) currentPlayerIcon.src = `/assets/img/${gameThemes}-current-${currentPlayer}.png`;
}

function setGameThemeBoardSize():void{
    if(gameField) gameField.classList.add(`game-field--${gameThemes}-${boardSize}`);
}

function generateCards():void{
    if(gameField && gameThemes && choosePlayer && boardSize){
        for (let index = 0; index < numberOfCards; index++){
            createCard(index);
        }
    }

    else window.location.href = "/settings";
}

function createCard(index:number){
    const card: HTMLButtonElement = document.createElement('button');

    card.dataset.pair = gameThemes+'-front-'+selectedShuffledCardsArray[index];
    card.dataset.revealed = 'false';
    card.classList.add('card', `card--${gameThemes}`);
    card.innerHTML = `<div class="card__inner card__inner--xy-size-${gameThemes}"><img class="card__face card__face--front" src="assets/img/${card.dataset.pair}.png" alt=""><img class="card__face card__face--back" src="assets/img/${gameThemes}-back.png" alt=""></div>`
    
    overSelectorAddClass('card__face--front', `-${gameThemes}`);

    card.addEventListener('click', () => {
        if(document.querySelectorAll(".is-flipped[data-revealed = 'false']").length <2) revealTwoCards(card);
        if(counterBlue + counterOrange == numberOfCards/2) allCardsRevealed();
    });

    if(gameField) gameField.append(card);
}

function revealTwoCards(card:HTMLButtonElement):void {
    card.classList.add('is-flipped');

    if(document.querySelectorAll(`.is-flipped[data-pair='${card.dataset.pair}'][data-revealed = 'false']`).length == 2){
        twoSameCards(card);
    }

    else if(document.querySelectorAll(".is-flipped[data-revealed='false']").length == 2){
        twoOddCards();
    }
}

function twoSameCards(card:HTMLButtonElement){
    if(currentPlayer == 'player-blue') counterUpBlue();
    if(currentPlayer == 'player-orange') counterUpOrange();

    document.querySelectorAll<HTMLButtonElement>(`.is-flipped[data-pair='${card.dataset.pair}']`).forEach(element => {
        element.dataset.revealed = 'true';
        element.removeEventListener;
    });
}

function twoOddCards(){
    document.querySelectorAll(".is-flipped[data-revealed='false']").forEach(element => {
        setTimeout(() => element.classList.remove('is-flipped'), 400);
    });

    changePlayer();
}

function changePlayer(){
    setTimeout(() => {
        if(currentPlayer == 'player-blue'){
            currentPlayer = "player-orange";
            setCurrentPlayer();
        } 
    
        else{
            currentPlayer = 'player-blue';
            setCurrentPlayer();
        }
    }, 500);
}

function allCardsRevealed():void {
    const gameOver = document.getElementById('game-over') as HTMLDivElement | null; 
    
    showGameOver(gameOver);
    showWinner(gameOver);
}

function showGameOver(gameOver:HTMLSpanElement | null){
    const gaOvCounterBlue:HTMLSpanElement | null = document.getElementById('game-over-counter-blue');
    const gaOvCounterOrange:HTMLSpanElement | null = document.getElementById('game-over-counter-orange');

    setTimeout(() => {
        if(gaOvCounterBlue) gaOvCounterBlue.textContent = String(counterBlue);
        if(gaOvCounterOrange) gaOvCounterOrange.textContent = String(counterOrange);
        if(gameOver) gameOver.classList.remove('display-none');
    }, 800);
}

function showWinner(gameOver:HTMLDivElement | null){
    const winnerTitle:HTMLElement | null = document.getElementById('winner-title');
    const winnerImg = document.getElementById('winner-img') as HTMLImageElement | null;
    const winner = document.getElementById('winner') as HTMLDivElement | null;
    const winnterBtnText:HTMLElement | null = document.getElementById('winner-btn-span');

    setTimeout(() => {
        if(gameOver) gameOver.classList.add('display-none');
        // if(winnerTitle) winnerTitle.textContent = counterBlue < counterOrange ? 'Orange player' : 'Blue Player';
        if(winnerTitle) winnerTitle.textContent = counterBlue == counterOrange ? 'Undecided' : counterBlue < counterOrange ? 'Orange player' : 'Blue Player';
            // color: white;
            // background: linear-gradient(orange, blue);
        if(winnerTitle && gameThemes == 'code-vibes-theme') winnerTitle.style.color = counterBlue < counterOrange ? '#F58E39' : '#2BB1FF';
        if(winnerTitle && gameThemes == 'gaming-theme') winnerTitle.style.color = counterBlue < counterOrange ? '#EA6900' : '#097FC5';
        if(winnerImg && gameThemes && ['code-vibes-theme', 'da-projects-theme'].includes(gameThemes)) winnerImg.src = counterBlue < counterOrange ? `/assets/img/${gameThemes}-winner-orange.png` : `/assets/img/${gameThemes}-winner-blue.png`;
        else if(winnerImg) winnerImg.src = counterBlue < counterOrange ? `/assets/img/${gameThemes}-winner.png` : `/assets/img/${gameThemes}-winner.png`;
        
        if(winnterBtnText && gameThemes && ['gaming-theme', 'da-projects-theme'].includes(gameThemes)) winnterBtnText.textContent = 'Home';
        if(winner) winner.classList.remove('display-none');
    }, 2500);
}

function counterUpBlue():void{
    const counterBlueSpan:HTMLSpanElement | null = document.getElementById('counter-blue');
    counterBlue++
    if(counterBlueSpan)counterBlueSpan.textContent = String(counterBlue);
}

function counterUpOrange():void{
    const counterOrangeSpan:HTMLSpanElement | null = document.getElementById('counter-orange');
    counterOrange++;
    if(counterOrangeSpan) counterOrangeSpan.textContent = String(counterOrange);
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