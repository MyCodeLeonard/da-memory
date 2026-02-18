function generateCards():void{
    const gameField: HTMLElement | null = document.getElementById('game-field');
    const isGameThemes:string | null = localStorage.getItem('gameThemes');
    const isChoosePlayer:string | null = localStorage.getItem('choosePlayer');
    const isBoardSize:string | null = localStorage.getItem('boardSize');

    const headerBtn: HTMLElement | null = document.getElementById('header-button');
    if(headerBtn) headerBtn.addEventListener('click', openOverlay);

    const backToGameBtn: HTMLElement | null = document.getElementById('back-to-game');
    if(backToGameBtn) backToGameBtn.addEventListener('click', closeOverlay);

    const backToSettingsBtn: HTMLElement | null = document.getElementById('back-to-settings');
    if(backToSettingsBtn) backToSettingsBtn.addEventListener('click', () => window.location.href = "/settings");

    let numberOfCards = Number(isBoardSize?.match(/\d+/));

    if(gameField && isGameThemes && isChoosePlayer && isBoardSize){
        if(numberOfCards > 16) gameField.classList.add('game-field--cardsOver16');

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

function openOverlay():void{
    const overlayPopUp = document.getElementById('query-overlay__pop-up');
    overlayPopUp?.addEventListener('click', bubbling);

    const overlay: HTMLElement | null = document.getElementById('query-overlay');
    overlay?.addEventListener('click', closeOverlay);

    overlay?.classList.remove('display-none');
}

function closeOverlay():void{
    const overlayPopUp = document.getElementById('query-overlay__pop-up');
    overlayPopUp?.removeEventListener('click', bubbling);

    const overlay: HTMLElement | null = document.getElementById('query-overlay');
    overlay?.removeEventListener('click', closeOverlay);

    overlay?.classList.add('display-none');
}

function bubbling(event:Event):void{
    event.stopPropagation();
}

window.addEventListener('load',() => generateCards());