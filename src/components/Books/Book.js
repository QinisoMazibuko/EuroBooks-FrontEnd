import React from "react";
import {Link} from 'react-router-dom';

export default class Recipe extends React.Component {
  state = {
    ActiveRecipe: [],
    description:[]
  };

  componentDidMount = (e) => {
    console.log(this.props);

    const recipeName = this.props.location.state.recipe;

    var unirest = require("unirest");

    var req = unirest("GET", "https://yummly2.p.rapidapi.com/feeds/search");

    req.query({
      FAT_KCALMax: "1000",
      allowedAttribute: "diet-lacto-vegetarian%2Cdiet-low-fodmap",
      q: recipeName,
      start: "0",
      maxResult: "20",
    });

    req.headers({
      "x-rapidapi-host": "yummly2.p.rapidapi.com",
      "x-rapidapi-key": "3e5b5b2c5cmsh90241e0def0d667p15b301jsne8c6d32c695a",   
    });

    req.end(function (res) {
        console.log(res)
      if (res.error) throw new Error(res.error);

      console.log(res.body.feed[0]);
    });

    req.end((res) => {
        console.log(res)
      const activerecipe = [];

      const description = [];

      activerecipe.push(res.body.feed[0].display);

      description.push(res.body.feed[0].content.description.text);

      this.setState({ ActiveRecipe: activerecipe[0] });
      this.setState({ description: description[0] });
    });
  };

  render() {
      const image = this.state.ActiveRecipe.images
      const publisher = "yummly"
     
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Book Search</h1>
        </header>
         <div className='container'>
          <div className='active-recipe'>
              <img src={image} className='active-recipe__img' alt='loading...'></img>
              <h3 className='active-recipe__title'>{this.state.ActiveRecipe.displayName}</h3>
              <h4 className='active-recipe__publisher'>

                  publisher: <span>{publisher}</span>
              </h4>
              <p>
                  {this.state.description}
              </p>
              <button className='active-recipe__button'>
                <Link to ='/'>Go Home</Link>
              </button>
              <br/><br/>
          </div>
         </div>
      </div>
    );
  }
}
