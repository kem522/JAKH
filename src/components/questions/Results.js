import React from 'react';
import axios from 'axios';
// import User from '../../lib/User';


class Results extends React.Component {

  state = {
    questions: [],
    winner: ''
  }

  componentDidMount() {
    axios.get('/api/questions')
      .then(res => this.setState({ questions: res.data }));
  }

  handleQuestion = (e) => {
    console.log(e.target.value);
  }


  handleWin = (array) => {
    console.log(this.state);
    const counts = {};
    let mostFrequent = '';
    for (let i = 0, length = array.length; i < length; i++){
      for (let j = 0, length = array[i].length; j < length; j++){
        const name = array[j];
        if(!counts[name]){
          counts[name] = 1;    //set count[name] value to 1
        } else{                  //if exists
          counts[name] = counts[name] + 1; //increment existing value
        }
        mostFrequent = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      }
    }
    this.setState({ winner: mostFrequent });
  }

  render() {
    const mates = {
      'Reena': '/assets/images/Reena.jpg',
      'Tom': '/assets/images/Thomas.jpg',
      'George': '/assets/images/George.png',
      'Jess': '/assets/images/jess.png',
      'Katie': '/assets/images/Katie.jpg',
      'Aimee': '/assets/images/Aimee.jpg',
      'Fabian': '/assets/images/Fabian.jpg',
      'Abi': '/assets/images/Abi.jpg',
      'Sui': '/assets/images/Sui.png',
      'Nick': '/assets/images/.jpg',
      'Mark': '/assets/images/.jpg',
      'Mike': '/assets/images/Mike.png',
      'Helena': '/assets/images/Helena.png',
      'Fabienne': '/assets/images/Fab.png',
      'Paula': '/assets/images/Paula.jpg',
      'Amir': '/assets/images/Amir.png'
    };
    return (
      <section>
        <div className="background"></div>


        <h1>And the winner is...</h1>

        <ul className="columns is-multiline">
          {this.state.questions.map((question, i) =>
            <li key={i} className="column is-one-third">
              <div>
                <div id="f1_container">
                  <div id="f1_card" className="shadow">
                    <div className="front face">
                      <div className="card winner-card">
                        <div className="card-content">
                          <h1 className="title is-4"> {question.question}</h1>
                          <img className="award" src="../assets/images/awards-ga.gif" />
                          <button onClick={() => this.handleWin(question.votes)}> {this.state.winner} </button>
                        </div>
                      </div>
                    </div>
                    <div className="back face center">
                      <img className="winnner-image" src={mates[question.votes[0]]} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )}
        </ul>

      </section>
    );
  }
}

export default Results;
