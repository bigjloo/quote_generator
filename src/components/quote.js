import React from 'react'
import './quote.css'
import axios from 'axios'
import $ from 'jquery'

const KANYE_API = "https://api.kanye.rest/"

class Quote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quote: 'initialized text',
            colorArr: ['red', 'green', 'blue']
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

    handleClick(){
        this.getQuote()
        let randomColor = this.selectRandomColor()
        this.changeColor(randomColor)
    }

    changeColor(color){
        $('body').css('background-color', color)
        $('.color-change').css('color', color)
    }

    selectRandomColor(){
        let randomColor = this.state.colorArr[Math.floor(Math.random()*this.state.colorArr.length)];
        return randomColor
    }



    render(){
        return (
            <div id="quote-box">
                    <div id="text" className="color-change">
                        <blockquote><span className="html-quote">&#8220;</span>{this.state.quote}<span className="html-quote">&#8221;</span></blockquote>
                        <div id="author" className="color-change">- Kanye West</div>
                    </div>
                    
                    <div className="left-col">
                        <i id="tweet-quote" class="fab fa-twitter-square"></i>
                    </div>
                    <div className="right-col">
                        <button className="color-change" id="new-quote" onClick={this.handleClick.bind(this)}>New Quote</button>
                    </div>

            </div>
        )
    }
}

export default Quote