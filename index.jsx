// React

function RandomQuoteMachine() {
  // state
  const [randomQuote, setRandomQuote] = React.useState(
    () => generateRandQuote(quoteList)
  );
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [hasReset, setHasReset] = React.useState(false);

  // ref
  const newQuoteBtnRef = React.useRef(null);

  React.useEffect(() => {
    if (newQuoteBtnRef.current) {
      newQuoteBtnRef.current.focus();
    }
  }, [])

  // click
  function handleButtonClick() {
    setHasReset(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setRandomQuote(generateRandQuote(quoteList))
    }, 750);

    setTimeout(() => {
      setIsTransitioning(false);
      setHasReset(true);
    }, 800);
  }

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
          className={
            isTransitioning ? "fade-out" :
            hasReset ? "fade-in" :
            ""
          }
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
            onClick={handleButtonClick}
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
    <RandomQuoteMachine />
  );
}
