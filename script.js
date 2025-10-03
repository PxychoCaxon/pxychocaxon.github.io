// ===== Load quotes =====
fetch('quotes.txt')
  .then(response => response.text())
  .then(text => {
    const quotes = text.match(/"([^"]+)"/g)?.map(q => q.replace(/"/g, '')) || [];
    const quotesList = document.getElementById('quotes-list');
    quotes.forEach(quote => {
      const li = document.createElement('li');
      li.textContent = quote;
      quotesList.appendChild(li);
    });
  })
  .catch(err => console.error('Failed to load quotes:', err));

// ===== Load screenshots =====
fetch('screenshots.txt')
  .then(response => response.text())
  .then(text => {
    const files = text.split(/\r?\n/).filter(f => f.trim() !== '');
    const container = document.getElementById('screenshots-container');

    files.forEach(file => {
      const img = document.createElement('img');
      img.src = `screenshots/${file}`;
      img.onerror = () => img.remove(); // remove broken images
      container.appendChild(img);
    });
  })
  .catch(err => console.error('Failed to load screenshots:', err));
