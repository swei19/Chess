import { StyleSheet } from 'react-native';


export const boardItems = StyleSheet.create({
  whiteSquare: {
    width: 45,
    height: 45,
    backgroundColor: 'white',
  },

  brownSquare: {
    width: 45,
    height: 45,
    backgroundColor: 'brown',
  },

  messages: {
    textAlign: 'top',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  square: {
    flexBasis: '12.5%',
    textAlign: 'center',
    alignItems: 'center',
  },

  max: { backgroundColor: 'black' },

  squareGlow: {
    outline: 'none',
    borderColor: '#9ecaed',
    boxShadow: '0 0 10px yellow',
  },
});