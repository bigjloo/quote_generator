import React from 'react'
import './quote.css'
import axios from 'axios'
import $ from 'jquery'

const KANYE_API = "https://api.kanye.rest/"

class Quote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quote: 'initialized quote',
            colorArr: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
            '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
            '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
            '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
            colorNext: '',
            //colorAfter: '',
        }

        this.selectRandomColor = this.selectRandomColor.bind(this);
    }


    componentDidMount(){
        //get random quote from API and setState
        this.getQuote();

        //get randomColor from color array
        let randomColor = this.selectRandomColor()
        //let randomColorAfter = this.selectRandomColor(randomColorBefore)

        //set next color change
        this.setState({
            colorNext:  randomColor,
            //colorAfter: randomColorAfter
        })
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
        this.changeCSSVarColor()
        //this.addBackgroundColorAnimation()
        this.setBackgroundColor()
        this.changeStateColor()
        //this.changeColor()
        //this.addFadeAnimation()
        //setTimeout(this.setBackgroundColor(), 3000)
        //setTimeout(this.removeFadeAnimation(),3000)

    }

    changeStateColor(){
        let randomColor = this.selectRandomColor()
        this.setState({colorNext: randomColor })
    }

    changeColor(){
        //$('#root').css('--varcolorbefore', this.state.colorBefore)
        //$('#root').css('--varcolorafter', this.state.colorAfter)
        //$('#text').addClass('color-animation')
    }

    addFadeAnimation(){
        $('#text').addClass('fade')
    }

    removeFadeAnimation(){
        $('#text').removeClass('fade')
    }

    changeCSSVarColor(){
        $('#root').css('--varcolor', this.state.colorNext)
    }

    addBackgroundColorAnimation(){
        $('#root').addClass('bgcolor-animation')
    }

    removeBackgroundColorAnimation(){
        let root = document.getElementById('root')
        root.classList.remove('color-animation')
    }

    setBackgroundColor(){
        $('#root').css('background-color', this.state.colorNext)
    }


    selectRandomColor(colorExcluded){
        let arrOfColor = [...this.state.colorArr].filter((colorItem) => colorItem !== colorExcluded)
        let randomColor = arrOfColor[Math.floor(Math.random()*arrOfColor.length)];
        return randomColor
    }



    render(){
        return (
            <div id="quote-box">
                    <div id="text" className="">
                        <blockquote><span className="html-quote">&#8220;</span>{this.state.quote}<span className="html-quote">&#8221;</span></blockquote>
                        <div id="author" className="">- Kanye West</div>
                    </div>
                    
                    <div className="left-col">
                        <i id="tweet-quote" class="fab fa-twitter-square"></i>
                    </div>
                    <div className="right-col">
                        <button className="" id="new-quote" onClick={this.handleClick.bind(this)}>New Quote</button>
                    </div>

            </div>
        )
    }
}

export default Quote