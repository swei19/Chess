import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { boardItems } from './game/style';
import Board from './game/board';
import King from './pieces/King';
import Rook from './pieces/Rook';
import Pawn from './pieces/Pawn';

export default class App extends React.Component {
  state: {
    selectedPieceIndex: null,
    selectedPiecePossibleMoves: [],
    currentPlayer: '',
    previousMove: null,
    message: '',
    previousPieceMovedStatus: null,
    gameEnded: false,
    kingChecked: ''
  };

  constructor(props: Prop) {
    super(props);
    this.currentBoard = new Board();
    this.currentBoard.initBoard();
    this.board = this.currentBoard.board;
    this.currentBoard.generateIndices();
    this.currentBoard.generateAllMoves();

    this.state = {
      currentPlayer: 'white',
    };
  }

  selectPiece = index => {
    let currentPiece = this.board[index];
    let currentMove = currentPiece.possibleMoves;

    // alert(
    //   'Current Move: ' +
    //     currentMove +
    //     ' CurrentPiece: ' +
    //     JSON.stringify(currentPiece)
    // );

    let possibleMoves = [];
    if (!this.gameEnded) {
      this.setState({
        selectedPieceIndex: index,
        selectedPiecePossibleMoves: currentMove,
      });
    } else {
      this.setState({
        selectedPieceIndex: null,
        selectedPiecePossibleMoves: null,
      });
    }
  };

  movePiece = index => {
    let currentPiece = this.board[this.state.selectedPieceIndex];
    let previousMove = this.state.selectedPieceIndex;
    let previousPiece = this.board[index];
    let currentPlayer = this.state.currentPlayer;
    let message = '';



    if (this.state.selectedPieceIndex != null) {
      this.currentBoard.movePiece(currentPiece, index);

      if (King.kingIsChecked(
          this.currentBoard[currentPiece.opponent],
          this.currentBoard.kingPositions[currentPlayer])) {
       
     
        message = currentPiece.player + ' is checked. Move is invalid'
        this.setState({
          message: message
        });
        this.currentBoard.undoMove(
          currentPiece,
          currentPiece.getIndex(),
          this.board[this.state.selectedPieceIndex],
          this.state.selectedPieceIndex
        );

        
        
      } else {

        let nextPlayer =
          this.state.currentPlayer === 'white' ? 'black' : 'white';
          let gameWon = King.checkIfLost(this.currentBoard, nextPlayer);
        if (gameWon) {
          this.gameEnded = true;
          message = 'Check Mate! ' + currentPlayer + ' Wins!'
        }
        this.setState({
          selectedPieceIndex: null,
          selectedPiecePossibleMoves: [],
          currentPlayer: nextPlayer,
          message: message
        });
      }
    }
  };

  initSquares() {
    let boardRender = [];
    let boardSquares = [];
    let currentSquare = boardItems.whiteSquare;

    for (let i = 0; i < 64; i++) {
      if (i % 8 !== 0) {
        currentSquare =
          currentSquare == boardItems.whiteSquare
            ? boardItems.brownSquare
            : boardItems.whiteSquare;
      }

      if (this.board[i] != '') {
        if (this.board[i].player == this.state.currentPlayer) {
          boardSquares.push(
            <View style={[boardItems.square]}>
              <Text
                onPress={this.selectPiece.bind(this, i)}
                style={currentSquare}>
                {this.board[i].icon}
              </Text>
            </View>
          );
        } else {
          if (
            this.state.selectedPieceIndex != null &&
            this.state.selectedPiecePossibleMoves.indexOf(i) > -1
          ) {
            boardSquares.push(
              <View style={[boardItems.square]}>
                <Text
                  style={currentSquare}
                  onPress={this.movePiece.bind(this, i)}>
                  {this.board[i].icon}
                </Text>
              </View>
            );
          } else {
            boardSquares.push(
              <View style={[boardItems.square]}>
                <Text style={currentSquare}>{this.board[i].icon}</Text>
              </View>
            );
          }
        }
      } else {
        let nonPieceSquare = null;

        if (
          this.state.selectedPieceIndex != null &&
          this.state.selectedPiecePossibleMoves.indexOf(i) > -1
        ) {
          nonPieceSquare = (
            <View style={[boardItems.square]}>
              <Text
                onPress={this.movePiece.bind(this, i)}
                style={[currentSquare, boardItems.squareGlow]}
              />
            </View>
          );
        } else {
          nonPieceSquare = (
            <View style={[boardItems.square]}>
              <Text style={[currentSquare]} />
            </View>
          );
        }
        boardSquares.push(nonPieceSquare);
      }
    }

    boardRender.push(
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {boardSquares}
      </View>
    );
    return boardRender;
  }

  render() {
    let boardRender = this.initSquares();

    return (
      <View style={boardItems.container}>
        <Text style={boardItems.messages}>{this.state.message}</Text>
        {boardRender}
      </View>
    );
  }
}
