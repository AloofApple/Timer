import React from "react";

export default class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
    };
  }

  reset() {
    this.setState({
      hours: 0,
      minutes: 0,
    });
  }

  handleChangeHours = (event) => {
    const {name, value} = event.target;

    this.setState({[name]: Math.min(parseInt(value), 24)});
    
    if (this.state.hours === 24 | parseInt(value) === 24) {
      this.setState({minutes: 0});
    }
  }

  handleChangeMinutes = (event) => {
    const {name, value} = event.target;

    if (this.state.hours === 24) {
      this.setState({[name]: Math.min(parseInt(value), 0)});
    } else {
      this.setState({[name]: Math.min(parseInt(value), 59)});
    }
  }

  StartTimer() {
    // Remove the input
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";

    // Reset state
    this.reset();

    // Start the timer
    this.props.starttimer(this.state.hours, this.state.minutes);
  }

  render() {
    return (
      <>
        <div className="container"> 
            <div className="squarecontainer">
              <button 
                className="square blue" 
                onClick={
                  () => this.props.stoptimer()
                }
              ></button>
              <input 
                id="hours"
                type="number" 
                name="hours"
                value={this.state.hours} 
                className="square grey" 
                onChange={this.handleChangeHours} 
                placeholder="H"
                min="0"
                max="24"
              />
              <input 
                id="minutes"
                type="number" 
                name="minutes" 
                value={this.state.minutes} 
                className="square grey" 
                onChange={this.handleChangeMinutes} 
                placeholder="m"
                min="0"
                max="59"
              />
              <button 
                className="square yellow" 
                onClick={
                  () => this.StartTimer()
                }
              ></button>
            </div>
        </div>
      </>
    ); 
  }
}  