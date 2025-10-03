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

// Automatically load all screenshots in the /screenshots/ folder
// You need to maintain a predictable naming like 1.jpg, 2.jpg, etc.
const screenshotsContainer = document.getElementById('screenshots-container');
const screenshotCount = 20; // Adjust this to the max number of images you expect

for (let i = 1; i <= screenshotCount; i++) {
  const img = document.createElement('img');
  img.src = `screenshots/${i}.jpg`;
  img.onerror = () => img.remove(); // Remove if image doesn't exist
  screenshotsContainer.appendChild(img);
}
