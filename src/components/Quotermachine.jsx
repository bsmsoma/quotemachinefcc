import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareTwitter } from '@fortawesome/free-brands-svg-icons'


function Quotermachine() {
    //Link da api with quotes;
    const api = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

    //Banco de quotes
    const [allQuotes, setAllQuotes] = React.useState([])
    const [quote, setQuote] = React.useState({
        quote: "",
        author: ""
    });
    const [currentColor, setCurrentColor] = React.useState(randomBackground());

    //Fetching the API
    React.useEffect(() => {
        async function getQuotes() {
            const res = await fetch(api)
            const data = await res.json()
            setAllQuotes(data.quotes)
        }
        getQuotes()
    }, [])
    //Iniatilizing the first quote when the allQuotes array is populated
    React.useEffect(() => {
        let random = Math.floor(Math.random() * allQuotes.length)
        if (allQuotes.length > 0) {
            setQuote({
                quote: allQuotes[random].quote,
                author: allQuotes[random].author
            })
        }
    }, [allQuotes])

    //Random Quotes
    function getRandomQuote() {
        setCurrentColor(randomBackground())
        let random = Math.floor(Math.random() * allQuotes.length)
        setQuote(({
            quote: allQuotes[random].quote,
            author: allQuotes[random].author
        }))
    }


    React.useEffect(() => {
        document.body.style.backgroundColor = currentColor
        document.body.style.color = currentColor
    }, [currentColor]);

    function randomBackground() {
        const bgColors = ["#011638ff", " #2e294eff", "#3c6e71ff", "#a44200ff", "#ad2831ff", "#2C5784"]
        const random = Math.floor(Math.random() * bgColors.length);
        return bgColors[random]
    }
    const tweetQuote = () => {
        const tweetText = `"${quote.quote}" - ${quote.author}`;
        const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        return twitterLink;
    };
    
    // Rendering the compoment

    return (
        <main id="quote-box">
            <p className="quote" id="text">{quote.quote}</p>
            <p className="author" id="author">{quote.author}</p>
            <div className="linksandbuttons">
                <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`} target="_top" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faSquareTwitter} size="2xl" />
                </a>
                <button onClick={getRandomQuote} id="new-quote" style={{ backgroundColor: currentColor }}>Random quote</button>
            </div>
        </main>
    )
}

export default Quotermachine;