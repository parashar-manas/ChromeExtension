document.addEventListener('DOMContentLoaded', function () {
  // Fetch news from the News API
  fetchNews();

  // Refresh news every hour
  setInterval(fetchNews, 3600000);
});

function fetchNews() {
  fetch('https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=40d19ba6aa57449fbb2ca989ae7e9385')
    .then(response => response.json())
    .then(data => {
      const newsList = document.getElementById('news-list');
      newsList.innerHTML = '';

      if (data && data.articles && data.articles.length > 0) {
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
        const errorListItem = document.createElement('li');
        errorListItem.textContent = 'No news articles available at the moment.';
        newsList.appendChild(errorListItem);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      const newsList = document.getElementById('news-list');
      newsList.innerHTML = '';
      const errorListItem = document.createElement('li');
      errorListItem.textContent = 'Failed to fetch news.';
      newsList.appendChild(errorListItem);
    });
}
