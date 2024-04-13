const searchInput = document.getElementById('search-input');
const speakBtn = document.getElementById('speak-btn');
const searchBtn = document.getElementById('search-btn');
const resultDiv = document.getElementById('result');
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchBtn.click();
}})

searchBtn.addEventListener('click', () => {
    const word = searchInput.value.trim();

    if (word) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => {
                if (data.title === 'No definition found') {
                    resultDiv.innerHTML = `<p>${word} not found.</p>`;
                } else {
                    const meanings = data[0].meanings.map(meaning => meaning.definitions[0].definition).join('<br>');
                    resultDiv.innerHTML = `<p><strong>${word}:</strong> ${meanings}</p>`;
                }
            })
            .catch(error => {
                console.error(error);
                resultDiv.innerHTML = `<p>Error fetching data.</p>`;
            });

        searchInput.value = '';
    }
});

speakBtn.addEventListener('click', () => {
    const word = searchInput.value.trim();
    const meaning = resultDiv.textContent.trim();

    if (word || meaning) {
        const utterance = new SpeechSynthesisUtterance(`${word}: ${meaning}`);
        speechSynthesis.speak(utterance);
    }
});
const submitButton = document.getElementById('submit-comment');

submitButton.addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input').value.trim();
    
    if (commentInput !== '') {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = commentInput;
        
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.appendChild(commentElement);
        
        document.getElementById('comment-input').value = '';
    } else {
        alert('Please enter a comment before submitting.');
    }
});