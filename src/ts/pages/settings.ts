function initSettings():void{
    setFromStorage();
    buttonEventListener();
    startBoxSelect();
    setTimeout(sizeQuery, 200);
    
    document.querySelectorAll('.options__option__radio').forEach(element => {
        element.addEventListener('change', startBoxSelect);
    });
}

function setFromStorage() {
    let localStorageGameThemes: string | null = localStorage.getItem('gameThemes');
    let localStorageChoosePlayer: string | null = localStorage.getItem('choosePlayer');
    let localStorageBoardSize: string | null = localStorage.getItem('boardSize');

    if(localStorageGameThemes){
        let gameThemesRadio = document.getElementById(localStorageGameThemes) as HTMLInputElement | null;
        if(gameThemesRadio) gameThemesRadio.checked = true;
    }

    if(localStorageChoosePlayer){
        let choosePlayerRadio = document.getElementById(localStorageChoosePlayer) as HTMLInputElement | null;
        if(choosePlayerRadio) choosePlayerRadio.checked = true;
    }

    if(localStorageBoardSize){
        let boardSizeRadio = document.getElementById(localStorageBoardSize) as HTMLInputElement | null;
        if(boardSizeRadio) boardSizeRadio.checked = true
    }
}

function buttonEventListener():void{
    const startBtn = document.getElementById('start-game');
    if(startBtn) startBtn.addEventListener('click', startGame);
}

function startBoxSelect(){
    valuesTransfer();
    const startBoxGameTheme:HTMLSpanElement | null = document.getElementById('start-box-game-themes');
    const startBoxPlayer:HTMLSpanElement | null = document.getElementById('start-box-player');
    const startBoxBoardSize:HTMLSpanElement | null = document.getElementById('start-box-board-size');

    const gameThemeContent:string = gameThemeContentSelect();
    const playerContent:string = playerContentSelect();
    const boardSizeContent:string = boardSizeContentSelect();

    if(startBoxGameTheme) startBoxGameTheme.textContent = gameThemeContent;
    if(startBoxPlayer) startBoxPlayer.textContent = playerContent;
    if(startBoxBoardSize) startBoxBoardSize.textContent = boardSizeContent;

    sizeQuery();
}

function gameThemeContentSelect():string {
    if (localStorage.getItem('gameThemes') == 'code-vibes-theme') return 'Code vibes theme';
    else if (localStorage.getItem('gameThemes') == 'gaming-theme') return 'Gaming theme';
    else if (localStorage.getItem('gameThemes') == 'da-projects-theme') return 'DA Projects theme';
    else if (localStorage.getItem('gameThemes') == 'foods-theme') return 'Foods theme';
    else return 'Game theme';
}

function playerContentSelect():string {
    if (localStorage.getItem('choosePlayer') == 'player-blue') return 'Blue Player';
    else if (localStorage.getItem('choosePlayer') == 'player-orange') return 'Orange Player';
    else return 'Player';
}

function boardSizeContentSelect():string {
    if (localStorage.getItem('boardSize') == '16-cards') return 'Board-16 Cards';
    else if (localStorage.getItem('boardSize') == '24-cards') return 'Board-24 Cards';
    else if (localStorage.getItem('boardSize') == '36-cards') return 'Board-36 Cards';
    else return 'Board size';
}

function buttonActivate(){
    const startBtn = document.getElementById('start-game') as HTMLButtonElement | null;
    if(startBtn) startBtn.disabled = false;
}

function valuesTransfer():boolean{
    let gameThemes:string | null = document.querySelectorAll("input[name=game-themes]:checked")[0]?.id;
    let choosePlayer:string | null = document.querySelectorAll("input[name=choose-player]:checked")[0]?.id;
    let boardSize:string | null = document.querySelectorAll("input[name=board-size]:checked")[0]?.id;

    if(gameThemes) localStorage.setItem('gameThemes', gameThemes);
    if(choosePlayer) localStorage.setItem('choosePlayer', choosePlayer);
    if(boardSize) localStorage.setItem('boardSize', boardSize);

    if(gameThemes && choosePlayer && boardSize){
        buttonActivate();
        return true
    } 
    else return false
}

function startGame(){
    if(valuesTransfer()) window.location.href = "./game";
}

function sizeQuery(){
    const rightBox = document.getElementById('right-box');
    const startBox = document.getElementById('start-box');
    if(rightBox && startBox) rightBox.style.width = `${startBox.clientWidth}px`;
}

window.addEventListener('load', initSettings);
window.addEventListener('resize', () => {if(window.innerWidth > 900) sizeQuery()});