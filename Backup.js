//  let isChecked = King.getKingsCheckStatus(
//         this.board,
//         this.state.currentPlayersTurn
//       );
//       if (isChecked) {
//         this.board[previousMove] = currentPiece;
//         this.board[index] = previousPiece;

//         alert(
//           this.state.currentPlayersTurn + "'s king is checked. Move is invalid"
//         );
//       } else {
//         if (this.board[index].constructor.name == 'Pawn') {
//           if (!this.state.previousPieceMovedStatus) {
//             Pawn.enPassant = index;
//           }

//           if (
//             Math.abs(previousMove - index) == 7 ||
//             Math.abs(previousMove - index) == 9
//           ) {
//             let enPassantPieceIndex =
//               this.state.currentPlayersTurn === 'white' ? index + 8 : index - 8;
//             if (
//               previousPiece == '' &&
//               this.board[enPassantPieceIndex].constructor.name == 'Pawn'
//             ) {
//               this.board[enPassantPieceIndex] = '';
//             }
//           }

//           if (this.state.currentPlayersTurn === 'white' && index <= 7) {
//             this.board[index] = this.board[index].promotePawn();
//           } else if (this.state.currentPlayersTurn === 'black' && index >= 56) {
//             this.board[index] = this.board[index].promotePawn();
//           }
//         }
//         if (this.board[index].constructor.name == 'King') {
//           if (Math.abs(previousMove - index) == 2) {
//             this.board = Rook.castle(
//               index,
//               this.state.currentPlayersTurn
//             );
//           }
//         }

//         let message = '';
//         let nextPlayer =
//           this.state.currentPlayersTurn === 'white' ? 'black' : 'white';
//         if (King.checkIfLost(this.board, nextPlayer)) {
//           message = 'Check Mate! ' + this.state.currentPlayersTurn + ' wins!';
//         }
//         if (Pawn.enPassant && index != Pawn.enPassant) {
//           Pawn.enPassant = null;
//         }


