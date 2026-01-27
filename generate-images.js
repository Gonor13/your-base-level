const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Создаем папку public если нет
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// Создаем og-image.png
const ogCanvas = createCanvas(1200, 630);
const ogCtx = ogCanvas.getContext('2d');

// Градиентный фон
const gradient = ogCtx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#0052FF');
gradient.addColorStop(1, '#8B5CF6');
ogCtx.fillStyle = gradient;
ogCtx.fillRect(0, 0, 1200, 630);

// Текст
ogCtx.fillStyle = 'white';
ogCtx.font = 'bold 72px "Arial"';
ogCtx.textAlign = 'center';
ogCtx.textBaseline = 'middle';
ogCtx.fillText('🔵 YOUR BASE LEVEL', 600, 200);

ogCtx.font = '36px "Arial"';
ogCtx.fillText('Discover Your Base Network Status', 600, 300);

ogCtx.font = '28px "Arial"';
ogCtx.fillText('Connect Wallet • Check Level • Mint NFT', 600, 400);

const ogBuffer = ogCanvas.toBuffer('image/png');
fs.writeFileSync(path.join('public', 'og-image.png'), ogBuffer);

// Создаем frame-image.png
const frameCanvas = createCanvas(1200, 630);
const frameCtx = frameCanvas.getContext('2d');

// Черный фон
frameCtx.fillStyle = '#000000';
frameCtx.fillRect(0, 0, 1200, 630);

// Текст
frameCtx.fillStyle = 'white';
frameCtx.font = 'bold 64px "Arial"';
frameCtx.textAlign = 'center';
frameCtx.textBaseline = 'middle';
frameCtx.fillText('BASE LEVEL CHECKER', 600, 150);

frameCtx.font = '32px "Arial"';
frameCtx.fillText('Connect wallet to discover', 600, 250);
frameCtx.fillText('your unique Base network status', 600, 300);

// Кнопка
frameCtx.fillStyle = '#0052FF';
frameCtx.font = 'bold 48px "Arial"';
frameCtx.fillText('▼ CHECK MY LEVEL ▼', 600, 450);

const frameBuffer = frameCanvas.toBuffer('image/png');
fs.writeFileSync(path.join('public', 'frame-image.png'), frameBuffer);

console.log('✅ Images created: public/og-image.png, public/frame-image.png');