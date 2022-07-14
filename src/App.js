import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  
  pageSize = 6;
  api = process.env.REACT_APP_NEWS_API

  state = {
    progress : 0
  }
  setProgress = (progress)=>{
    this.setState({
      progress : progress
    })
  }

  render() {
    return (
      <Router>
        <div >
          <LoadingBar
            color='#f11946'
            height ={3}
            progress={this.state.progress}
          />
          <Navbar />
          <Switch>
            <Route exact path="/" key="general"><News api = {this.api} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='general' /></Route>
            {/* <Route exact path="/general" key = "general"><News pageSize = {5} country = 'in' category = 'general'/></Route> */}
            <Route exact path="/business" key="business"><News api = {this.api} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='business' /></Route>
            <Route exact path="/entertainment" key="entertainment"><News api = {this.api} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='entertainment' /></Route>
            <Route exact path="/health" key="health"><News api = {this.api} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='health' /></Route>
            <Route exact path="/science" key="science"><News api = {this.api} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='science' /></Route>
            <Route exact path="/sports" key="sports"><News api = {this.api} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='sports' /></Route>
            <Route exact path="/technology" key="technology"><News api = {this.api} setProgress={this.setProgress} pageSize={this.pageSize} country='in' category='technology' /></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
// style={{
//   backgroundImage: `url("https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
//   height : '100%'}}

