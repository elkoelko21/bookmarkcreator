const express = require('express');
const { bookmarklet, bookmarkletimg} = require('./converter');

const app = express();
const PORT = 3000;

app.get('/bookmark.png', (req, res) => {
    res.type('png').send(bookmarkletimg);
});

app.get('', (req, res) => {
    const html = `
      <!DOCTYPE html>
      <html>
        <style>
          body {
            background-color:rgb(40, 40, 40)
          }
          p {
            font-size: 20px;
            color:rgb(255, 255, 255)
          }
        </style>
        <body>
          <p>Drag this to your bookmarks bar:</p>
          <a href="${bookmarklet}">
            <img src='/bookmark.png' alt='bookmark' width="128" height="129">
          </a>
        </body>
        <script>
          let lastVersion = '';

          async function checkForUpdate() {
            try {
              const res = await fetch(window.location.href, { cache: 'no-store' });
              const text = await res.text();
              if (!lastVersion) {
                lastVersion = text;
              } else if (text !== lastVersion) {
                console.log('Page updated, reloading...');
                location.reload();
              }
            } catch (e) {
              return;
            }
          }

          setInterval(checkForUpdate, 1000);
        </script>
      </html>
    `;

    res.type('html').send(html);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});