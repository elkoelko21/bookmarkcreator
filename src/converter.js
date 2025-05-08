const fs = require('fs');

const code = fs.readFileSync('./script.js', 'utf8');
const bookmarkletimg = fs.readFileSync('src/bookmark.png')

function stripCommentsAndWhitespace(code) {
  return code
    .replace(/^\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim();
}

function escapeForHtmlAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const bookmarklet = escapeForHtmlAttr('javascript:(function() { try{' + stripCommentsAndWhitespace(code) + '} catch(e) {} })();');

module.exports = { bookmarklet, bookmarkletimg };