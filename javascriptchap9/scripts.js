const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    color: "blue",
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    doubleJump: false,
    jumpPower: 10,
    lives: 3
};

const gravity = 1;

const ground = {
    x: 0,
    y: canvas.height - 20,
    width: canvas.width,
    height: 20,
    color: "green"
};

const platforms = [
    { x: 200, y: canvas.height - 100, width: 150, height: 10, color: "brown" },
    { x: 400, y: canvas.height - 200, width: 150, height: 10, color: "brown" },
    { x: 600, y: canvas.height - 300, width: 150, height: 10, color: "brown" }
];

const enemies = [];
const enemySpeed = 2;
const enemySpawnInterval = 1000; // in milliseconds
let enemySpawnTimer = 0;

const bullets = [];
const bulletSpeed = 5;

let score = 0;

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

function generateRandomPlatform() {
    const width = Math.random() * 100 + 50;
    const x = Math.random() * (canvas.width - width);
    const y = platforms[platforms.length - 1].y - Math.random() * 50 - 50;
    return { x, y, width, height: 10, color: "brown" };
}

function update() {
    // Move player
    if (keys["ArrowLeft"] && player.x > 0) {
        player.velocityX = -5;
    } else if (keys["ArrowRight"] && player.x + player.width < canvas.width) {
        player.velocityX = 5;
    } else {
        player.velocityX = 0;
    }

    // Jumping
    if (keys["Space"]) {
        if (!player.jumping) {
            player.velocityY = -player.jumpPower;
            player.jumping = true;
        } else if (!player.doubleJump) {
            player.velocityY = -player.jumpPower;
            player.doubleJump = true;
        }
    } else {
        player.doubleJump = false;
    }

    // Apply gravity
    player.velocityY += gravity;

    // Update player position
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Check for collisions with the ground
    if (player.y + player.height > ground.y) {
        player.y = ground.y - player.height;
        player.jumping = false;
        player.doubleJump = false;
        player.velocityY = 0; // Reset the vertical velocity when on the ground
    }

    // Check for collisions with platforms
    for (const platform of platforms) {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height
        ) {
            player.y = platform.y - player.height;
            player.jumping = false;
            player.doubleJump = false;
            player.velocityY = 0; // Reset the vertical velocity when on a platform
        }
    }

    // Shoot bullets
    if (keys["KeyS"]) {
        shoot();
    }

    // Update bullet positions
    for (const bullet of bullets) {
        bullet.y -= bulletSpeed;

        // Check for collisions with enemies
        for (const enemy of enemies) {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Remove the bullet and the enemy on collision
                bullets.splice(bullets.indexOf(bullet), 1);
                enemies.splice(enemies.indexOf(enemy), 1);
                score += 10;
            }
        }
    }

    // Update enemy positions
    for (const enemy of enemies) {
        enemy.x += enemySpeed;

        // Check for collisions with the player
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // Player hit by enemy
            player.lives--;
            if (player.lives <= 0) {
                gameOver();
            } else {
                resetPlayerPosition();
            }
        }
    }

    // Check for collisions with the endpoint
    if (
        player.x < canvas.width - 50 &&
        player.x + player.width > canvas.width - 100 &&
        player.y < ground.y - 50 &&
        player.y + player.height > ground.y - 100
    ) {
        // Player reached the endpoint
        alert("Congratulations! You reached the endpoint! Score: " + score);
        resetGame();
    }

    // Generate a new platform if the player is high enough
    if (player.y < canvas.height / 2) {
        platforms.push(generateRandomPlatform());
    }

    // Spawn enemies periodically
    enemySpawnTimer += 16; // assuming 60 frames per second
    if (enemySpawnTimer >= enemySpawnInterval) {
        spawnEnemy();
        enemySpawnTimer = 0;
    }

    // Update score
    // (Score is now updated when an enemy is hit, not every frame)

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = ground.color;
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

    // Draw platforms
    for (const platform of platforms) {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }

    // Draw enemies
    for (const enemy of enemies) {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    for (const bullet of bullets) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    // Draw player lives
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + player.lives, 10, 30);

    // Request the next animation frame
    requestAnimationFrame(update);
}

function shoot() {
    const bullet = {
        x: player.x + player.width / 2 - 5,
        y: player.y,
        width: 10,
        height: 20
    };
    bullets.push(bullet);
}

function spawnEnemy() {
    const enemy = {
        x: canvas.width,
        y: canvas.height - 120,
        width: 40,
        height: 40,
        color: "red"
    };
    enemies.push(enemy);
}

function resetPlayerPosition() {
    player.x = 50;
    player.y = 50;
}

function gameOver() {
    alert("Game Over! Score: " + score);
    resetGame();
}

function resetGame() {
    player.lives = 3;
    player.x = 50;
    player.y = 50;
    score = 0;
    platforms.length = 0;
    platforms.push(...[
        { x: 200, y: canvas.height - 100, width: 150, height: 10, color: "brown" },
        { x: 400, y: canvas.height - 200, width: 150, height: 10, color: "brown" },
        { x: 600, y: canvas.height - 300, width: 150, height: 10, color: "brown" }
    ]);
    enemies.length = 0;
}

// Start the game loop
update();
