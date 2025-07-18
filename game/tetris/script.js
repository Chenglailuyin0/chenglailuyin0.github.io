const canvas = document.getElementById('tetrisCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;

let board = [];
let score = 0;
let gameOver = false;
let currentPiece;
let nextPiece; // 今後実装するなら

// ボードの初期化
function initBoard() {
    board = Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
}

// テトリミノの定義 (例: I字型)
const TETROMINOS = {
    'I': [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
    // 他のテトリミノもここに追加
};

// ランダムなテトリミノを生成
function getRandomTetromino() {
    const keys = Object.keys(TETROMINOS);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return {
        shape: TETROMINOS[randomKey],
        color: 'cyan', // 仮の色
        x: Math.floor(COLS / 2) - Math.floor(TETROMINOS[randomKey][0].length / 2),
        y: 0
    };
}

// 描画関数
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア

    // ボードを描画
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c] !== 0) {
                ctx.fillStyle = 'gray'; // 既に固定されたブロックの色
                ctx.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }

    // 現在のピースを描画
    if (currentPiece) {
        currentPiece.shape.forEach((row, r) => {
            row.forEach((value, c) => {
                if (value === 1) {
                    ctx.fillStyle = currentPiece.color;
                    ctx.fillRect((currentPiece.x + c) * BLOCK_SIZE, (currentPiece.y + r) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    ctx.strokeStyle = 'black';
                    ctx.strokeRect((currentPiece.x + c) * BLOCK_SIZE, (currentPiece.y + r) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            });
        });
    }
}

// ピースを下に移動
function movePieceDown() {
    // 衝突判定ロジックをここに追加
    // 衝突しなければ currentPiece.y++
    // 衝突すればピースをボードに固定し、新しいピースを生成
    // ラインクリアのチェックもここで行う
    // ゲームオーバー判定
    currentPiece.y++; // 仮の移動
    draw();
}

// ゲームループ
let dropInterval;
function gameLoop() {
    if (!gameOver) {
        movePieceDown();
        // 実際には setInterval などで定期的に呼び出す
    } else {
        clearInterval(dropInterval);
        alert('ゲームオーバー！ スコア: ' + score);
    }
}

startButton.addEventListener('click', () => {
    initBoard();
    score = 0;
    scoreDisplay.textContent = 'スコア: ' + score;
    gameOver = false;
    currentPiece = getRandomTetromino();
    draw();
    // dropInterval = setInterval(gameLoop, 1000); // 1秒ごとにピースを落とす（仮）
});

// キーボード操作のイベントリスナー (左右移動、回転、落下など)
document.addEventListener('keydown', (e) => {
    if (gameOver || !currentPiece) return;

    if (e.key === 'ArrowLeft') {
        currentPiece.x--; // 仮の移動
    } else if (e.key === 'ArrowRight') {
        currentPiece.x++; // 仮の移動
    } else if (e.key === 'ArrowDown') {
        movePieceDown(); // ソフトドロップ
    } else if (e.key === 'ArrowUp') {
        // ピース回転ロジックをここに追加
    }
    draw();
});

initBoard(); // 初期描画
draw();
