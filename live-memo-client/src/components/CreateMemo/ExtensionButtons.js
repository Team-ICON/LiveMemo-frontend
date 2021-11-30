import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useCommands, useActive } from '@remirror/react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { cx } from 'remirror';


const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            // Purple and green play nicely together.
            main: "#fff"
        },
    },
});
const ExtensionButtons = () => {
    const commands = useCommands();
    const active = useActive(true);
    return (
        <ThemeProvider theme={theme}>

            <Stack className="buttonGroup" direction="row" spacing={2}>

                <Button variant="outlined" onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commands.setTextHighlight('yellow')}>Hilight</Button>
                <Button variant="outlined" onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commands.removeTextHighlight()}>remove</Button>
                <Button variant="outlined" onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commands.toggleBold()}
                    className={cx(active.bold() && 'active')}
                >
                    Bold</Button>


            </Stack >

        </ThemeProvider >


    );
};




export default ExtensionButtons