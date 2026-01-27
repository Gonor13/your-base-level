// create-preview.js
const { createCanvas } = require('canvas');
const fs = require('fs');

const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

// Градиентный фон
const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#0052FF');
gradient.addColorStop(1, '#8B5CF6');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1200, 630);

// Текст
ctx.fillStyle = 'white';
ctx.font = 'bold 72px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('🔵 YOUR BASE LEVEL', 600, 200);

ctx.font = '36px Arial';
ctx.fillText('Discover Your Base Network Status', 600, 300);

ctx.font = '28px Arial';
ctx.fillText('Connect Wallet • Check Level • Mint NFT', 600, 400);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/preview.png', buffer);
console.log('✅ preview.png created');
