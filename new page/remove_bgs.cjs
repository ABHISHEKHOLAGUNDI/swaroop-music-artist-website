const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match the motion.div containing the background image.
  // We'll look for `<motion.div` followed by any characters until `/>` where it contains `backgroundImage: "url('/assets/`
  const regex = /<motion\.div[^>]*backgroundImage:\s*"url\('\/assets\/[^']+'\)"[^>]*\/>/g;
  
  content = content.replace(regex, '');
  
  // Alternative to remove specific styles if the regex misses due to formatting
  // The pages use: backgroundImage: "url('/assets/bg_...')"
  // Let's just do a more robust string replacement for the specific block if needed.
  // Actually, standard regex with [\s\S]*? works best.
  
  const robustRegex = /<motion\.div\s+style=\{\{\s*backgroundImage:\s*"url\('\/assets\/bg_[a-z_]+\.png'\)"[\s\S]*?\}\}[^>]*\/>/g;
  content = content.replace(robustRegex, '');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Background images removed from all pages.');
