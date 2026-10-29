const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "images";
const maxWidth = 1200;

(async () => {
    for (const file of fs.readdirSync(dir)) {
        const ext = path.extname(file).toLowerCase();
        if (![".jpg", ",jpeg", ".png", ".webp"].includes(ext)) continue;

        const filePath = path.join(dir, file);
        const meta = await sharp(filePath).metadata();
        if (meta.width <= maxWidth) continue;

        const buffer = await sharp(filePath)
          .resize({ width: maxWidth })
          .toBuffer();
        fs.writeFileSync(filePath, buffer);
        console.log(`Resized ${file}: ${meta.width}px -> ${maxWidth}px`);    
    }
})();