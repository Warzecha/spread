import './App.css';
import SpreadSheetContainer from './components/SpreadSheetContainer';
import {createTheme, ThemeProvider} from '@mui/material';
import {Provider} from 'react-redux';
import store from './store/store';

function App() {

    const theme = createTheme({
        components: {
            // Name of the component
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 4,
                        padding: 2,
                        margin: 2
                    }
                },
            },
        },
    });

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <SpreadSheetContainer/>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
