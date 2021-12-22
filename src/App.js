import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import logo from './images/bk-nets.gif'

class App extends React.Component{

  constructor(props){

    super(props);
    this.state = {roster: [],
                  stats: [],
                  portraits: []
                }
  }

  componentDidMount(){

    const nets_roster = "https://data.nba.com/data/5s/v2015/json/mobile_teams/nba/2021/teams/nets_roster.json";
    const player_stats = "https://data.nba.com/data/v2015/json/mobile_teams/nba/2021/teams/nets/player_averages_02.json";

    try{
        axios.all([axios.get(nets_roster), axios.get(player_stats)])
        .then(axios.spread((...response) => {

          //console.log(response[1].status);
          console.log(response[0].data.t.pl);
          console.log(response[1].data.tpsts.pl);
          this.setState({roster : response[0].data.t.pl});
          this.setState({stats : response[1].data.tpsts.pl});
          this.createTiles();

          }), (error) =>{
            console.log("Something went wrong with axios all", error);
          });

    }
    catch(error){

        console.log("Something went wrong with axios", error);
    }
  }

  createTiles = () =>{

    const content = document.getElementById("content");
    let tile, heading, subHeading, nav, link, text, temp, img,
    totalTable, averageTable, tableCaption, tableHeaderRow, tableDataRow;

    for(let i = 0; i < this.state.roster.length; i++){

      tile = document.createElement("article");

      //top section of the article
      let article_div_top = document.createElement("div");
      article_div_top.setAttribute("id", "article-top");
      let article_div_top_description = document.createElement("div");
      article_div_top_description.setAttribute("id", "article-description");

      img = document.createElement("img");
      img.src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.state.roster[i].pid}.png`
      article_div_top.appendChild(img);

      text = document.createTextNode(this.state.roster[i].ln + ", " + this.state.roster[i].fn
      + " #" +this.state.roster[i].num);
      heading = document.createElement("h1");
      heading.appendChild(text);
      article_div_top_description.appendChild(heading);
      text = document.createTextNode(this.state.roster[i].pos + " | " + this.state.roster[i].ht
      + " | " + "Draft Class " + (2021 - this.state.roster[i].y));
      subHeading = document.createElement("h3");
      subHeading.appendChild(text);
      article_div_top_description.appendChild(subHeading);
      article_div_top.appendChild(article_div_top_description);

      tile.appendChild(article_div_top);

      let line = document.createElement("hr");
      tile.appendChild(line);

      //table section
      averageTable = document.createElement("table");
      averageTable.setAttribute("id", "average-table");
      text = document.createTextNode("Player Average");
      temp = document.createElement("h3");
      tableCaption = document.createElement("caption");
      temp.appendChild(text);
      tableCaption.appendChild(temp);
      averageTable.appendChild(tableCaption);

      for(let j in this.state.stats){

        if(this.state.roster[i].pid === parseInt(this.state.stats[j].pid)){

          tableHeaderRow = document.createElement("tr");
          tableDataRow = document.createElement("tr");

          for(let k in this.state.stats[j].avg){

            text = document.createTextNode(k.toUpperCase());
            temp = document.createElement("th");
            temp.appendChild(text);
            tableHeaderRow.appendChild(temp);

            text = document.createTextNode(this.state.stats[j].avg[k]);
            temp = document.createElement("td");
            temp.appendChild(text);
            tableDataRow.appendChild(temp);
          }
          averageTable.appendChild(tableHeaderRow);
          averageTable.appendChild(tableDataRow);
        }
      }

      totalTable = document.createElement("table");
      totalTable.setAttribute("id", "total-table");
      text = document.createTextNode("Player Total");
      temp = document.createElement("h3");
      tableCaption = document.createElement("caption");
      temp.appendChild(text);
      tableCaption.appendChild(temp);
      totalTable.appendChild(tableCaption);

      for(let j in this.state.stats){

        if(this.state.roster[i].pid === parseInt(this.state.stats[j].pid)){

          tableHeaderRow = document.createElement("tr");
          tableDataRow = document.createElement("tr");

          for(let k in this.state.stats[j].tot){

            text = document.createTextNode(k.toUpperCase());
            temp = document.createElement("th");
            temp.appendChild(text);
            tableHeaderRow.appendChild(temp);

            text = document.createTextNode(this.state.stats[j].tot[k]);
            temp = document.createElement("td");
            temp.appendChild(text);
            tableDataRow.appendChild(temp);
          }
          totalTable.appendChild(tableHeaderRow);
          totalTable.appendChild(tableDataRow);
        }
      }
      tile.appendChild(averageTable);
      tile.appendChild(totalTable);

      content.appendChild(tile);
    }

  }
  
  render(){

    return(
      <div id = "body">

        <header id = "header">
          <img src = {logo} alt = "Brooklyn Nets"/>
          <h1>HELLO BROOKLYN</h1>
        </header>

        <main id = "content">

        </main>
      </div>
    );
  }
}

export default App;
