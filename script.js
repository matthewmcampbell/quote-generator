import {localQuotes} from "./quotes.js"
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const body = document.getElementsByTagName("body")[0]
console.log(body);
// Spinner hiding/showing
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function doneLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let currBackgroundColor = '#d606d6';
function rotateBackgroundColor() {
    const rotate = {
        '#314cc5': '#31c0c5',
        '#31c0c5': '#41d606',
        '#41d606': '#d66b06',
        '#d66b06': '#d606d6',
        '#d606d6': '#314cc5',
    }
    currBackgroundColor = rotate[currBackgroundColor];
    body.style.backgroundColor = currBackgroundColor;
}

// Storage for api quotes
let apiQuotes = [];

// Gets a new quote from apiQuotes
function newQuote() {
    
    loading();
    // Random index
    const index = Math.floor(Math.random() * (apiQuotes.length - 1));
    const quote = apiQuotes[index];
    let currDisplayedQuoteAuthor = quote;
    
    // Update live text/author
    let author = currDisplayedQuoteAuthor.author;
    let text = currDisplayedQuoteAuthor.text;
    author = author ? author : "Unknown";
    text = text ? text : "Oops! Something went wrong...";
    
    authorText.textContent = author;
    quoteText.textContent = text;

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    rotateBackgroundColor();
    doneLoading();
}

// Pull quote list from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    apiQuotes = await fetch(apiUrl)
        .then(res => res.json())    
        .catch(err => {
            console.log(err);
            console.log("Defaulting to local quotes only...")
            return localQuotes;
    });
    newQuote();
    doneLoading();
}

// Call this once on page load to cache all quotes in memory.
getQuotes();

// Tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listenters
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)