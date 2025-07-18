const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

let board = [];
let score = 0;
const BOARD_SIZE = 4;

// ボードの初期化
function initBoard() {
    board = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
    score = 0;
    scoreDisplay.textContent = 'スコア: ' + score;
    addRandomTile();
    addRandomTile(); // 2つ初期タイルを配置
    drawBoard();
}

// ランダムな位置に新しいタイルを追加 (2または4)
function addRandomTile() {
    let emptyCells = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
    }
}

// ボードを描画
function drawBoard() {
    gameBoard.innerHTML = ''; // ボードをクリア
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const tileValue = board[r][c];
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            if (tileValue !== 0) {
                tileDiv.textContent = tileValue;
                tileDiv.classList.add(`tile-${tileValue}`); // スタイルを適用
            }
            gameBoard.appendChild(tileDiv);
        }
    }
}

// スワイプ処理 (非常に簡略化された例、実際のロジックは複雑)
function handleSwipe(direction) {
    let moved = false;
    // ここに2048の移動・結合ロジックを実装
    // 例:
    // for (let r = 0; r < BOARD_SIZE; r++) {
    //     let row = board[r].filter(val => val !== 0); // 0を除去
    //     // ここで結合処理
    //     // 0で埋め戻す
    // }

    if (moved) {
        addRandomTile();
        drawBoard();
        // ゲームオーバー判定
    }
}

newGameButton.addEventListener('click', initBoard);

// キーボード入力イベント
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        handleSwipe('up');
    } else if (e.key === 'ArrowDown') {
        handleSwipe('down');
    } else if (e.key === 'ArrowLeft') {
        handleSwipe('left');
    } else if (e.key === 'ArrowRight') {
        handleSwipe('right');
    }
});

initBoard();
