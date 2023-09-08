import React from "react";

export default class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target;

    this.setState({[name]: parseInt(value)});
  }

  render() {
    return (
      <>
        <div className="container"> 
            <div className="squarecontainer">
              <button className="square " onClick={
                  () => this.props.stoptimer()}
              ></button>
              <input type="number" name="hours" className="square grey" onChange={this.handleChange}/>
              <input type="number" name="minutes" className="square grey" onChange={this.handleChange}/>
              <button className="square yellow" onClick={
                  () => this.props.starttimer(this.state.hours, this.state.minutes)}
              ></button>
            </div>
        </div>
      </>
    ); 
  }
}  