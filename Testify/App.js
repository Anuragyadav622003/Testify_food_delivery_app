import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import StackNav from './Navigation';
import LocationDetails from './src/MainComponent/LocationDetails';







const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
     
  
       <LocationDetails/>
    
       <StackNav/>
   

    </PaperProvider>
  );
}
