import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

function refactorHex(content) {
  // Replace missing dark backgrounds (avoiding ones we already fixed or logic statements)
  // Match `bg-[#hex]` where it's not prefixed by dark:
  // Exclude colors that are bright like formatting
  const darkHexes = ['0B0D10', '0E1014', '0f1115', '1c1c1e', '1D1E22', '1e1e24', '2A2E35', '3a3a3c', '2c2c2e'];
  
  let newContent = content;
  for (const hex of darkHexes) {
    // bg-[#hex]
    newContent = newContent.replace(new RegExp(`(?<!dark:)bg-\\[\\#${hex}\\]`, 'gi'), `bg-[#C0C8CA] dark:bg-[#${hex}]`);
    // border-[#hex] 
    newContent = newContent.replace(new RegExp(`(?<!dark:)border-\\[\\#${hex}\\]`, 'gi'), `border-[#AAB7B7] dark:border-[#${hex}]`);
  }
  
  // also fix black backgrounds that might be hiding
  newContent = newContent.replace(/(?<!dark:)bg-black(?![\w\-\/])/g, 'bg-[#C0C8CA] dark:bg-black');
  
  // Replace brand-green utility with adaptive classes so they turn Navy in Light Mode, Green in Dark Mode
  newContent = newContent.replace(/(?<!dark:)(bg-brand-green)(?!-)/g, 'bg-[#1A2D42] dark:bg-brand-green');
  newContent = newContent.replace(/(?<!dark:)(text-brand-green)(?!-)/g, 'text-[#1A2D42] dark:text-brand-green');
  newContent = newContent.replace(/(?<!dark:)(border-brand-green)(?!-)/g, 'border-[#1A2D42] dark:border-brand-green');
  newContent = newContent.replace(/(?<!dark:)(from-brand-green)(?!-)/g, 'from-[#1A2D42] dark:from-brand-green');
  newContent = newContent.replace(/(?<!dark:)(group-hover:text-brand-green)(?!-)/g, 'group-hover:text-[#1A2D42] dark:group-hover:text-brand-green');
  newContent = newContent.replace(/(?<!dark:)(group-hover:bg-brand-green)(?!-)/g, 'group-hover:bg-[#1A2D42] dark:group-hover:bg-brand-green');
  newContent = newContent.replace(/(?<!dark:)(hover:text-brand-green)(?!-)/g, 'hover:text-[#1A2D42] dark:hover:text-brand-green');
  newContent = newContent.replace(/(?<!dark:)(focus-within:text-brand-green)(?!-)/g, 'focus-within:text-[#1A2D42] dark:focus-within:text-brand-green');

  return newContent;
}

let replacedFilesCount = 0;

walk(directoryPath, function(filePath) {
  if (filePath.endsWith('.tsx') && !filePath.includes('node_modules')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = refactorHex(content);

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      replacedFilesCount++;
      console.log(`Updated: ${filePath}`);
    }
  }
});

console.log(`Refactored ${replacedFilesCount} files.`);
