import SpreadSheet from './components/SpreadSheet';
import {createTheme, ThemeProvider} from '@mui/material';
import {Provider} from 'react-redux';
import './index.css'
import store from './store/store';
import {makeStyles} from '@mui/styles';

function App() {

    const theme = createTheme({
        // palette: {
        //     mode: 'light',
        // },
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
                <div>
                    <SpreadSheet/>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

//

export default App;
