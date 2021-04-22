import React from 'react'
import './quote.css'
import axios from 'axios'

const KANYE_API = "https://api.kanye.rest/"

class Quote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quote: 'initialized text'
        }
    }


    componentDidMount(){
        this.getQuote()
    }

    getQuote(){
        axios.get(KANYE_API)
        .then(res => {
            const kanye_quote = res.data.quote
            this.setState({ quote: kanye_quote})
        })
        .catch((err) => {
            console.log(err)
        })
    }



    render(){
        return (
            <div id="quote-box">
                <div className="quote-top">
                    <div id="text" className="color-change"><blockquote><span id="html-quote">&#8220;</span>{this.state.quote}</blockquote></div>
                    <div id="author" className="color-change">- Kanye West</div>
                </div>
                <div className="quote-box-footer">
                    <div className="left-col">
                        <i id="tweet-quote" class="fab fa-twitter-square"></i>
                    </div>
                    <div className="right-col">
                        <button className="color-change" id="new-quote" onClick={this.getQuote.bind(this)}>New Quote</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quote