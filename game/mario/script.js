const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

const PLAYER_SPEED = 5;
const JUMP_POWER = 10;
const GRAVITY = 0.5;

let player = {
    x: 50,
    y: canvas.height - 50, // 地面より少し上
    width: 30,
    height: 40,
    velocityY: 0,
    isJumping: false,
    facing: 'right'
};

let gameRunning = false;

// プレイヤーのスプライト (今回は簡易的な四角)
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// ゲームの初期化
function initGame() {
    player.x = 50;
    player.y = canvas.height - 50;
    player.velocityY = 0;
    player.isJumping = false;
    gameRunning = true;
    gameLoop();
}

// ゲームループ
function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 地面を描画 (簡易)
    ctx.fillStyle = '#5C9400';
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    // プレイヤーの更新
    player.velocityY += GRAVITY; // 重力
    player.y += player.velocityY;

    // 地面との衝突判定
    if (player.y + player.height > canvas.height - 10) {
        player.y = canvas.height - 10 - player.height;
        player.velocityY = 0;
        player.isJumping = false;
    }

    drawPlayer();

    requestAnimationFrame(gameLoop); // 次のフレームを要求
}

// キーボードイベントリスナー
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    if (e.key === 'ArrowLeft') {
        player.x -= PLAYER_SPEED;
        player.facing = 'left';
    } else if (e.key === 'ArrowRight') {
        player.x += PLAYER_SPEED;
        player.facing = 'right';
    } else if (e.key === ' ' && !player.isJumping) { // スペースキーでジャンプ
        player.velocityY = -JUMP_POWER;
        player.isJumping = true;
    }

    // 画面外に出ないように制限
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
});

startButton.addEventListener('click', initGame);

// 初期描画
drawPlayer();
