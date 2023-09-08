import React from "react";
import Controller from "./Controller";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.StartTimer = this.StartTimer.bind(this);
    this.StopTimer = this.StopTimer.bind(this);
  }

  StartTimer(hours, minutes){
    // Initialize timer
    if (hours !== 0 | minutes !== 0) {
      this.setState({
        seconds: 60,
      });
    } else {
      return;
    }

    this.setState({
      hours: hours, 
      minutes: minutes
    });

    // Start timer
    this.timer = setInterval(() => {
      this.AnimateSeconds();
      if (this.state.seconds === 0) {
        if (this.state.minutes === 0) {
          if (this.state.hours === 0) {
            clearInterval(this.timer);
          } 
          else {
            this.setState({
              hours: this.state.hours - 1,
              minutes: 59,
            });
          }
        } 
        else {
          this.setState({
            minutes: this.state.minutes - 1,
            seconds: 59,
          });
        }
      } 
      else {
        this.setState({
          seconds: this.state.seconds - 1,
        });
      }
    }, 1000);
  }

  StopTimer(){
    clearInterval(this.timer);
  }

  FormatTime(time) {
    if (time < 10) {
      return "0" + time;
    }
    return time;
  }

  AnimateSeconds() {
    let squares = [
      document.getElementById("square1"),
      document.getElementById("square2"),
      document.getElementById("square3"),
      document.getElementById("square4"),
    ]
    let state = this.state.seconds % 5;

    switch(state) {
      case 0:
        squares[0].classList.remove("yellow");
        squares[1].classList.remove("yellow");
        squares[2].classList.remove("yellow");
        squares[3].classList.remove("yellow");
        break;
      case 1:
        squares[3].classList.add("yellow");
        break;
      case 2:
        squares[2].classList.add("yellow");
        break;
      case 3:
        squares[1].classList.add("yellow");
        break;
      case 4:
        squares[0].classList.add("yellow");
        break;
      default:
        break;  
    }
  }


  render() {
    return (
      <>
        <div className="container"> 
            <div className="timercontainer"> 
              {this.FormatTime(this.state.hours)}:{this.FormatTime(this.state.minutes)} 
            </div>
            <div className="squarecontainer">
                <div id="square1" className="square"></div>
                <div id="square2" className="square"></div>
                <div id="square3" className="square"></div>
                <div id="square4" className="square"></div>
            </div>
        </div>

        <Controller starttimer={this.StartTimer} stoptimer={this.StopTimer}/>
      </>
    );
  }
}
