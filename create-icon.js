const { createCanvas } = require('canvas');
const fs = require('fs');

const canvas = createCanvas(192, 192);
const ctx = canvas.getContext('2d');

// Градиентный фон
const gradient = ctx.createRadialGradient(96, 96, 0, 96, 96, 96);
gradient.addColorStop(0, '#0052FF');
gradient.addColorStop(1, '#3B82F6');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 192, 192);

// Белый круг
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.arc(96, 96, 60, 0, Math.PI * 2);
ctx.fill();

// Буква B синяя
ctx.fillStyle = '#0052FF';
ctx.font = 'bold 72px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('B', 96, 96);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/icon.png', buffer);
console.log('✅ Icon created: public/icon.png');
