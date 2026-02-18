const startBtn = document.getElementById('start-game');

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

window.addEventListener('load', () => startBtn?.addEventListener('click', valuesTransfer));