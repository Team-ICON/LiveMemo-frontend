import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useCommands, useActive } from '@remirror/react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { cx } from 'remirror';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import { IconButton } from '@mui/material';

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
                <IconButton variant="outlined" onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commands.setTextHighlight('yellow')}>
                    <AutoFixNormalIcon style={{ color: 'white' }} />
                </IconButton>
                <IconButton variant="outlined" onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commands.removeTextHighlight()}>
                    <AutoFixOffIcon style={{ color: 'white' }} />
                </IconButton>
                <IconButton variant="outlined" onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commands.toggleBold()}
                    className={cx(active.bold() && 'active')}>
                    <FormatBoldIcon style={{ color: 'white' }} />
                </IconButton>


            </Stack >

        </ThemeProvider >


    );
};




export default ExtensionButtons