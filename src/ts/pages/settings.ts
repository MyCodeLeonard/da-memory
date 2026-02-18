function init():void{
    setFromStorage();
    buttonEventListener();
}

function setFromStorage(){
    let localStorageGameThemes: string | null = localStorage.getItem('gameThemes');
    let localStorageChoosePlayer: string | null = localStorage.getItem('choosePlayer');
    let localStorageBoardSize: string | null = localStorage.getItem('boardSize');

    if(localStorageGameThemes && localStorageChoosePlayer && localStorageBoardSize){
        let gameThemesRadio = document.getElementById(localStorageGameThemes) as HTMLInputElement | null; 
        let choosePlayerRadio = document.getElementById(localStorageChoosePlayer) as HTMLInputElement | null;
        let boardSizeRadio = document.getElementById(localStorageBoardSize) as HTMLInputElement | null;
        
        if(gameThemesRadio) gameThemesRadio.checked = true
        if(choosePlayerRadio) choosePlayerRadio.checked = true
        if(boardSizeRadio) boardSizeRadio.checked = true
    }
}

function buttonEventListener():void{
    const startBtn = document.getElementById('start-game');
    if(startBtn) startBtn.addEventListener('click', valuesTransfer);
}

function valuesTransfer():void{
    let gameThemes:string | null = document.querySelectorAll("input[name=game-themes]:checked")[0].id;
    let choosePlayer:string | null = document.querySelectorAll("input[name=choose-player]:checked")[0].id;
    let boardSize:string | null = document.querySelectorAll("input[name=board-size]:checked")[0].id;

    if(gameThemes && choosePlayer && boardSize){
        localStorage.setItem('gameThemes', gameThemes);
        localStorage.setItem('choosePlayer', choosePlayer);
        localStorage.setItem('boardSize', boardSize);

        window.location.href = "/game";
    }
}

window.addEventListener('load', init);