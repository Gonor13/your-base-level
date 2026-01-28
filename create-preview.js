const fs = require('fs');
const path = require('path');

// Создаем простой PPM файл (формат без зависимостей)
const width = 1200;
const height = 630;

// PPM заголовок
let ppm = 'P3\n';
ppm += `${width} ${height}\n`;
ppm += '255\n';

// Градиент от синего к фиолетовому
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        // Простой градиент
        const r = Math.floor(0 + (139 * x / width));
        const g = Math.floor(82 + (10 * y / height));
        const b = Math.floor(255 + (-9 * x / width));
        
        ppm += `${r} ${g} ${b} `;
    }
    ppm += '\n';
}

// Сохраняем как PPM
fs.writeFileSync('public/preview.ppm', ppm);

console.log('✅ preview.ppm created. Convert with online tool to PNG');
