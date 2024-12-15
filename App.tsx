import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

type GameState = {
  board: (string | null)[];
  currentPlayer: string;
  winner: string | null;
};

const App = () => {
  const [state, setState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
  });

  useEffect(() => {
    const result = calculateWinner(state.board);
    if (result) {
      setState((prevState) => ({ ...prevState, winner: result }));
      Alert.alert('Winner!', `${result} has won the game!`, [{ text: 'Restart', onPress: resetGame }]);
    } else if (!state.board.includes(null)) {
      Alert.alert('Draw!', 'The game is a draw.', [{ text: 'Restart', onPress: resetGame }]);
    }
  }, [state.board]);

  const handlePress = (index: number) => {
    if (state.board[index] || state.winner) return;

    const newBoard = state.board.map((value, idx) => (idx === index ? state.currentPlayer : value));
    setState((prevState) => ({
      ...prevState,
      board: newBoard,
      currentPlayer: prevState.currentPlayer === 'X' ? 'O' : 'X',
    }));
  };

  const resetGame = () => {
    setState({ board: Array(9).fill(null), currentPlayer: 'X', winner: null });
  };

  const calculateWinner = (board: (string | null)[]): string | null => {
    const patterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of patterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
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
            <Text style={styles.squareText}>{value}</Text>
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
