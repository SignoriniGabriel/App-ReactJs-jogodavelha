import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function RadioOption(props) {
  const opt = props.option;
  const label = opt.slice(0, 1).toUpperCase() + opt.slice(1);

  return (
      <div className="exemplo1"> 
            <input 
            type="radio" 
            id={opt} 
            name={opt} 
            value={opt} 
            checked={props.checked}
            onChange={props.onChange}
            />
            <i></i>
          <label htmlFor={opt}>{label}</label>
      </div>
  );
}

/*class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: null,};
    }*/
function Square(props) {
  console.log(props)
  return (
    <button className="square" 
      onClick={props.onClick}
      style={props.isWinning ? {boxShadow: '0px 0px 8px black',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                fontSize: '55px',
                                Height: '80px',
                                width: '80px',} : {}}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  /*constructor(props){
      super(props);
      this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
      };
  }
  handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
          return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
          history: history.concat([{
              squares: squares,
          }]),
          xIsNext: !this.state.xIsNext,
      });
  }*/

  renderSquare(i) {
    const winningArr = this.props.winningSquares.filter((sq) => sq === i);
    console.log(this.props.nome);
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key = {i}
        isWinning={winningArr.length ? true : false}
      />
    );
  }

  render() {
    /*const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }*/
    
    let counter = 0;
    const grid = [];
    for (let i = 1; i <= 3; i++) {
      const square = [];
      for (let x = 1; x <= 3; x++) {
        square.push(this.renderSquare(counter))
        counter ++;
      }
      const squares = (<div className="board-row" key={`row-${i}`}>{square}</div>)
      grid.push(squares)
    }
    return grid;
    
    // return (
    //   <div>
    //     <div className="board-row">
    //       {this.renderSquare(0)}
    //       {this.renderSquare(1)}
    //       {this.renderSquare(2)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSquare(3)}
    //       {this.renderSquare(4)}
    //       {this.renderSquare(5)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSquare(6)}
    //       {this.renderSquare(7)}
    //       {this.renderSquare(8)}
    //     </div>
    //   </div>
    // );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        clickded: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      historyAscendente: true,
    };
  }

  handleClick(i) {
    console.log(this.state.stepNumber);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        clickded: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleToggleOrder(historyAscendente) {
    this.setState({historyAscendente});
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  recebedados(dados){
    dados.json().then((texto => {
      console.log(texto);
    }));
  }

  salvapartida(history){
    fetch("http://localhost/api-jogo-da-velha/apijogodavelha/salvap/",
    {
      headers: {Accept: 'application/json, text/plain, /',
      'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify(history)
    }).then(function(res){ return res.json(); })
      .then(function(data){ console.log( JSON.stringify( data ) ) })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const Style = move === this.state.stepNumber ? { backgroundColor: '#4F4F4F',
                                                       fontWeight: 'bold',
                                                     } : { fontWeight: 'normal' };
      const desc = move ?
        `${move}° Movimento` :
        'Início de jogo!';
      return (
        <>
          <ol key={move} className="listbutton">
            <button className="button" onClick={() => this.jumpTo(move)} style={Style}>{desc}</button>
          </ol>
        </>
      )
    }
    )
    //Localização das Jogadas
    const jogadas = history.map((step, move) => {
      if (move === 0){
        return <> </>;
      }
      const row = Math.floor(step.clickded / 3) + 1;
      const col = step.clickded % 3 + 1;
      const player = move % 2 === 0 ? 'O' : 'X';
      return <p key={move}> Jogador {player} posição {row} {col} </p>
    })

    //Invertendo as Jogadas
    if (!this.state.historyAscendente) {
      moves.reverse();
    }

    let status;
    let winningSquares = [];
    if (winner) {
      status = 'Vencedor ' + winner.player;
      winningSquares = winner.line;
      this.salvapartida(history);
      console.log("vitoria")
    } 
    else if (history.length === 10){
      status = 'Empate';
      this.salvapartida(history);
      console.log("empatou carai")
    }
    else {
      status = 'Proximo Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className=" game-info">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquares={winningSquares}
          />
        </div>
        <div className="positionmove">
          <div className="statusposition">{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="table">
          <div>
            <h1>Localização de Jogadas</h1>
            {jogadas}
            <div className="">
              <h2>Inversão da visualização</h2>
              <RadioOption option="Ascendente" onChange={() => this.handleToggleOrder(true)} checked={this.state.historyAscendente}/>
              <RadioOption option="Descendente" onChange={()=> this.handleToggleOrder(false)} checked={!this.state.historyAscendente}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        line: [a, b, c],
      }
    }
  }
  return null;
}

