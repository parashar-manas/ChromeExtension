document.addEventListener('DOMContentLoaded', function () {
  // Fetch news from the BBC API
  fetchNews();

  // Refresh news every hour
  setInterval(fetchNews, 3600000);
});

function fetchNews() {
  fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => {
      const newsList = document.getElementById('news-list');
      newsList.innerHTML = '';

      if (data.articles.length > 0) {
        // Iterate over the articles and create list items
        data.articles.forEach(article => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = article.url;
          link.textContent = article.title;
          listItem.appendChild(link);
          newsList.appendChild(listItem);
        });
      } else {
        // Show a message if no articles are available
        const message = document.createElement('p');
        message.textContent = 'No news articles found.';
        newsList.appendChild(message);
      }
    })
    .catch(error => console.error(error));
}
