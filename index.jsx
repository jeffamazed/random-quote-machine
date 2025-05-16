// quote list
const quoteList = [
  {
    id: 1,
    quote: "In the middle of difficulty lies opportunity.",
    author: "— Albert Einstein",
    color: "#2C3E50"
  },
  {
    id: 2,
    quote: "Success usually comes to those who are too busy to be looking for it.",
    author: "— Henry David Thoreau",
    color: "#1D8348"
  },
  {
    id: 3,
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "— Sam Levenson",
    color: "#C0392B"
  },
  {
    id: 4,
    quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "— Ralph Waldo Emerson",
    color: "#154360"
  },
  {
    id: 5,
    quote: "The only way to do great work is to love what you do.",
    author: "— Steve Jobs",
    color: "#333333"
  },
  {
    id: 6,
    quote: "Believe you can and you're halfway there.",
    author: "— Theodore Roosevelt",
    color: "#6C3483"
  },
  {
    id: 7,
    quote: "Happiness depends upon ourselves.",
    author: "— Aristotle",
    color: "#784212"
  },
  {
    id: 8,
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "— Confucius",
    color: "#008080"
  },
  {
    id: 9,
    quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "— Ralph Waldo Emerson",
    color: "#D35400"
  },
  {
    id: 10,
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "— Eleanor Roosevelt",
    color: "#2C3E70"
  },
  {
    id: 11,
    quote: "Life isn't about finding yourself. It's about creating yourself.",
    author: "— George Bernard Shaw",
    color: "#4A235A" 
  },
  {
    id: 12,
    quote: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    author: "— William Butler Yeats",
    color: "#BA4A00" 
  },
  {
    id: 13,
    quote: "The harder the conflict, the greater the triumph.",
    author: "— George Washington",
    color: "#1B4F72" 
  },
  {
    id: 14,
    quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "— Zig Ziglar",
    color: "#117A65" 
  },
  {
    id: 15,
    quote: "Challenges are what make life interesting; overcoming them is what makes life meaningful.",
    author: "— Joshua J. Marine",
    color: "#7D3C98" 
  }
];

// utility functions
function quoteUrlGenerator(quote, author, type) {
  const text = encodeURIComponent(`${quote} ${author}`);
  if (type === "twitter") {
    return `https://twitter.com/intent/tweet?text=${text}`;
  } else if (type === "tumblr") {
    // Separate encoding for quote and author for tumblr
    const encodedQuote = encodeURIComponent(quote);
    const encodedAuthor = encodeURIComponent(author);
    return `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,inspiration&caption=${encodedAuthor}&content=${encodedQuote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
  }
  return "";
}

function generateRandQuote(list) {
  if (!list) return null;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// React

function Main() {
  // state
  const [randomQuote, setRandomQuote] = React.useState(
    () => generateRandQuote(quoteList)
  );

  // ref
  const newQuoteBtnRef = React.useState(null);

  React.useEffect(() => {
    if (newQuoteBtnRef.current) {
      newQuoteBtnRef.current.focus();
    }
  }, [])

  return (
    <main 
      style={{ backgroundColor: randomQuote.color}}
    >
      <div 
        className="quote-box" 
        id="quote-box"
        style={{ color: randomQuote.color}}
        role="region"
        aria-labelledby="text"
      >
        <figure 
          className="fade-in" 
          key={randomQuote.id}
          aria-live="polite"
        >
          <blockquote id="text">
            <span>&ldquo;</span>&nbsp;{randomQuote.quote}&nbsp;<span>&rdquo;</span>
          </blockquote>
          <figcaption id="author">{randomQuote.author}</figcaption>
        </figure>
        <div className="btn-links-container">
          <div className="links-container">
            <a 
              id="tweet-quote" 
              href={quoteUrlGenerator(randomQuote.quote, randomQuote.author, "twitter")} 
              target="_blank"
              style={{ backgroundColor: randomQuote.color}}
              rel="noopener noreferrer"
              aria-label={`Share this quote by ${randomQuote.author} on Twitter`}
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a 
              href={quoteUrlGenerator(randomQuote.quote, randomQuote.author, "tumblr")} 
              target="_blank"
              style={{ backgroundColor: randomQuote.color}}
              rel="noopener noreferrer"
              aria-label={`Share this quote by ${randomQuote.author} on Tumblr`}
            >
              <i className="fa-brands fa-tumblr"></i>
            </a>
          </div>
          <button 
            className="new-quote-btn" 
            id="new-quote"
            onClick={() => setRandomQuote(generateRandQuote(quoteList))}
            style={{ backgroundColor: randomQuote.color}}
            ref={newQuoteBtnRef}
            aria-label="Generate a new random quote"
            aria-describedby="quote-instruction"
          >
            New Quote
          </button>
          <span id="quote-instruction" className="sr-only">
            Clicking this will fetch a new quote and update the quote box.
          </span>
        </div>
      </div>
      <span className="made-by">
        Made by:&nbsp;
        <a 
          href="https://github.com/jeffamazed" 
          target="_blank"
          rel="noopener noreferrer"
        >jeffamazed</a>
      </span>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

function App() {
  return (
    <Main />
  );
}
