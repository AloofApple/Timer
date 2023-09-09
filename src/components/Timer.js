import React from "react";
import Controller from "./Controller";
import Sound from "../Audio/Polaris.mp3";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      running: "false",
    };
    this.StartTimer = this.StartTimer.bind(this);
    this.StopTimer = this.StopTimer.bind(this);
    this.Audio = new Audio(Sound);
  }

  StartTimer(hours, minutes){
    // Initialize timer
    if (this.state.running !== "paused") {
      if (isNaN(hours)) {
        hours = 0;
      }
      if (isNaN(minutes)) {
        minutes = 0;
      }
      if (this.state.running) {
        this.StopTimer();
        this.setState({
          running: "true",
        });
      }

      this.setState({
        hours: hours,
        minutes: minutes,
        seconds: 0,
      });
    } 

    this.setState({
      running: "true",
    });

    document.body.style.backgroundColor = "#EBFF38";

    // Make squares yellow
    let Squares = this.SquareArray();
    
    for (let i = 0; i < Squares.length; i++) {
      if (Squares[i].classList.contains("blue")) {
        Squares[i].classList.remove("blue");
        Squares[i].classList.add("yellow");
      }
    } 

    // Start timer
    this.timer = setInterval(() => {
      this.AnimateSeconds();

      if (this.state.seconds > 0) {
        this.setState(
          {seconds: this.state.seconds - 1}
        );
      } 
      else if (this.state.minutes > 0) {
        this.setState({
          minutes: this.state.minutes - 1,
          seconds: 59,
        });
      } 
      else if (this.state.hours > 0) {
        this.setState({
          hours: this.state.hours - 1,
          minutes: 59,
          seconds: 59,
        });
      } 
      else {
        this.StopTimer();
        this.Audio.currentTime = 0;
        this.Audio.play();
        this.setState({
          running: "false",
        });
      }
    }, 1000);
  }

  StopTimer(){
    document.body.style.backgroundColor = "#405BFF";

    if (this.state.running === "false"){
      return;
    }

    let Squares = this.SquareArray();

    if (this.state.running === "paused"){
      this.setState({
        running: "false",
      });

      for (let i = 0; i < Squares.length; i++) {
        if (Squares[i].classList.contains("blue")) {
          Squares[i].classList.remove("blue");
        }
      } 

      this.setState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        running: "false",
      });

      return;
    }

    this.setState({
      running: "paused",
    });

    for (let i = 0; i < Squares.length; i++) {
      if (Squares[i].classList.contains("yellow")) {
        Squares[i].classList.remove("yellow");
        Squares[i].classList.add("blue");
      }
    }
  
    clearInterval(this.timer);
  }

  SquareArray() {
    return [
      document.getElementById("square1"),
      document.getElementById("square2"),
      document.getElementById("square3"),
      document.getElementById("square4"),
    ];
  }

  FormatTime(time) {
    if (time < 10) {
      return "0" + time;
    }
    else if (time === 60) {
      return "00";
    }

    return time;
  }

  AnimateSeconds() {
    let SquareArraytate = this.state.seconds % 5;
    let Squares = this.SquareArray();

    switch(SquareArraytate) {
      case 0:
        Squares[0].classList.remove("yellow");
        Squares[1].classList.remove("yellow");
        Squares[2].classList.remove("yellow");
        Squares[3].classList.remove("yellow");
        break;
      case 1:
        Squares[3].classList.add("yellow");
        break;
      case 2:
        Squares[2].classList.add("yellow");
        break;
      case 3:
        Squares[1].classList.add("yellow");
        break;
      case 4:
        Squares[0].classList.add("yellow");
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
