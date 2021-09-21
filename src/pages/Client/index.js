import React, {Component, useContext, useState, useEffect } from "react";
import Header from "../../components/Headers/Header.js";
// import Books component 
import Form from "../../components/Books/Form";
import Books from '../../components/Books/Books';




class Clientindex extends Component {
    state={
      result:[],
      tittle:[],
      url:[],
      description:[]
   
    }

  
    getRecipe = (e) => {
      e.preventDefault();
  
      const recipeName = e.target.elements.recipeName.value;
  
      var unirest = require("unirest");
  
      var req = unirest("GET", "https://yummly2.p.rapidapi.com/feeds/search");
      
      req.query({
        "FAT_KCALMax": "1000",
        "allowedAttribute": "diet-lacto-vegetarian%2Cdiet-low-fodmap",
        "q": recipeName,
        "start": "0",
        "maxResult": "20"
      });
      
      req.headers({
        "x-rapidapi-host": "yummly2.p.rapidapi.com",
        "x-rapidapi-key": "3e5b5b2c5cmsh90241e0def0d667p15b301jsne8c6d32c695a",   
      });
      
      
      req.end(function (res) {
          console.log(res)
        if (res.error) throw new Error(res.error);
       
        console.log(res.body.feed);
      });
  
      req.end(res=>{
  
        console.log(res)
        this.setState({result:res.body.feed})
        const tittle = [];
        const url = [];
        const description=[]
  
        for(let i=0;i<this.state.result.length;i++){
          
          
          tittle.push(res.body.feed[i].display.displayName) ;
          url.push(res.body.feed[i].display.images[0]) ;
          description.push(res.body.feed[i].content.description.text) ;
  
  
          this.setState({tittle:tittle});
          this.setState({url:url})
          this.setState({description:description})
  
        }
      })
    };
  
    componentDidMount=()=>{
       
      const json1 = localStorage.getItem('tittle');
      const json2 = localStorage.getItem('url');
      const json3 = localStorage.getItem('description');
  
      const storedtitles = JSON.parse(json1);
      const storedurls = JSON.parse(json2);
      const storeddescriptions = JSON.parse(json3);
  
      this.setState({tittle: storedtitles});
      this.setState({url: storedurls});
      this.setState({description: storeddescriptions});
  
  
    }
  
    componentDidUpdate=()=>{
      const tittle = JSON.stringify(this.state.tittle);
      const url = JSON.stringify(this.state.url);
      const description=JSON.stringify(this.state.description);
  
      localStorage.setItem("tittle", tittle);
      localStorage.setItem("url", url);
      localStorage.setItem("description", description);
    }
   
  
    render() {
      return (
        <div className="App">
          <Header className="App-header">
            <h1 className="App-title">Book Search</h1>
           
          </Header>
          <Form getRecipe={this.getRecipe}></Form><br/>
          {/* <Books tittle={this.state.tittle} url={this.state.url}  description={this.state.description}/> */}
        </div>
      );
    }
  }


export default Clientindex
