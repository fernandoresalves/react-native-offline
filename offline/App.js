import React from 'react';
import {StatusBar} from 'react-native';
import {
  Appbar,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Main from './src/pages/Main';

const App = () => {
  const colorPrimary = '#3649b0';
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: colorPrimary,
    },
  };

  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={colorPrimary} />
        <Appbar />
        <Main />
      </PaperProvider>
    </>
  );
};

export default App;
