import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.css'

//var gthis = this;
var jyankenState_g = false;

class HandSwitch extends Component{
    constructor(props){
        super(props);
        var this_ = this;
        this.state = {
            human: null,
            computer: null,
            img_path: './img/gu.png'
        }
        this.interval = setInterval(function(){
            this_.setState({img_path:'./img/tyoki.png'})
            setTimeout(function(){
                this_.setState({img_path:'./img/pa.png'})
            },333);
            setTimeout(function(){
                this_.setState({img_path:'./img/gu.png'});
                if(jyankenState_g){
                    clearInterval(this_.interval);
                }
            },666);
        },1000);
    }
    render(){
        return(
            <img src={this.state.img_path}></img>
        )
    }
}

class JyankenComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            human: null,
            computer: null,
            jyankenState : false
        }
        this.stop = false;
    }
    pon(human_hand) {
        this.stop = true;
        const computer_hand = Math.floor(Math.random() * 3)
        this.setState({
            human: human_hand,
            computer: computer_hand,
            jyankenState : true
        });
        jyankenState_g = true;
    }
    judge() {
        if (this.state.human == null) {
            return null
        } else {
            return (this.state.computer - this.state.human + 3) % 3
        }
    }
    handUrlGet_human(){
        switch(this.state.human){
            case 0:
                return './img/gu.png';
            case 1:
                return './img/tyoki.png';
            case 2:
                return './img/pa.png';
        }
        return './img/gu.png'
    }
    handUrlGet_computer(){
        switch(this.state.computer){
            case 0:
                return './img/gu.png';
            case 1:
                return './img/tyoki.png';
            case 2:
                return './img/pa.png';
        }
        return './img/gu.png'
    }
    reset(){
        this.setState({
            jyankenState : false
        });
        jyankenState_g = false;
    }
    render(){
        if(this.state.jyankenState){
            <HandSwitch/>
            return(<div>
                <h1>じゃんけん ポン！</h1>
                <img src={this.handUrlGet_human()}></img>
                <button onClick = {()=>this.reset()}>もう一度</button>
                <img src={this.handUrlGet_computer()}></img>
            </div>);
        }else{
        return(
            <div>
                <h1>じゃんけん ポン！</h1>
                <img src={this.handUrlGet_human()}></img>
                <JyankenBox actionPon = {(te)=> this.pon(te)} />
                <HandSwitch/>
            </div>
        );}
    }
}

const JyankenBox = (props) => {
    return(
        <div>
            <button onClick = {()=>props.actionPon(0)}>グー</button>
            <button onClick = {()=>props.actionPon(1)}>チョキ</button>
            <button onClick = {()=>props.actionPon(2)}>パー</button>
        </div>
    )
}

JyankenBox.propTypes={
    actionPon : PropTypes.func
}

ReactDOM.render(
    <JyankenComponent />,
    document.getElementById('root')
)