import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

type GameState = {
  board: number[];
  currentPlayer: number
  winner: number | null;
};

const App = () => {
  const [state, setState] = useState<GameState>({
    board: Array(9).fill(0),
    currentPlayer: 1,
    winner: null,
  });

  useEffect(() => {
    const result = calculateWinner(state.board);
    if (result !== null) {
      Alert.alert('Winner!', `${result === 1 ? 'X' : 'O'} has won the game!`, [
        { text: 'Restart', onPress: resetGame },
      ]);
      setState((prevState) => ({ ...prevState, winner: result }));
    } else if (!state.board.includes(0)) {
      Alert.alert('Draw!', 'The game is a draw.', [
        { text: 'Restart', onPress: resetGame },
      ]);
    }
  }, [state.board]);
/* 
const a = useMemo(()=>{
   setState((prevState) => ({ ...prevState, winner: result }));
})

let number;

function fizzbuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    console.log('fizz buzz');
  } else if (number % 3 === 0) {
    console.log('fizz');
  } else if (number % 5 === 0) {
    console.log('buzz');
  } else {
    console.log('buzz buzz');
  }
}

const fizzbuz = useCallback(() => {
  fizzbuzz(15);
}, []);
*/
const handlePress = (index: number) => {
    if (state.board[index] !== 0 || state.winner !== null) return;

    const newBoard = state.board.map((value, idx) => (idx === index ? state.currentPlayer : value));
    setState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentPlayer: -prevState.currentPlayer,
    }));
  };

  const resetGame = () => {
    setState({ board: Array(9).fill(0), currentPlayer: 1, winner: null });
  };

  const calculateWinner = (board: number[]): number | null => {
    const patterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of patterns) {
      if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
  };

  const renderSquareValue = (value: number): string => {
    return value === 1 ? 'X' : value === -1 ? 'O' : '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {state.board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.squareText}>{renderSquareValue(value)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;

