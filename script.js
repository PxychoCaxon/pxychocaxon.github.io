// Load quotes from quotes.txt
fetch('quotes.txt')
  .then(response => response.text())
  .then(text => {
    const quotes = text.match(/"([^"]+)"/g).map(q => q.replace(/"/g, ''));
    const quotesList = document.getElementById('quotes-list');
    quotes.forEach(quote => {
      const li = document.createElement('li');
      li.textContent = quote;
      quotesList.appendChild(li);
    });
  })
  .catch(err => console.error('Failed to load quotes:', err));

// Load screenshots automatically from /screenshots/ (1.jpg, 2.jpg, ...)
const screenshotsContainer = document.getElementById('screenshots-container');
const screenshotCount = 20; // adjust as needed

for (let i = 1; i <= screenshotCount; i++) {
  const img = document.createElement('img');
  img.src = `screenshots/${i}.jpg`;
  img.onerror = () => img.remove(); // remove missing images
  screenshotsContainer.appendChild(img);
}
