import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { SnackbarProvider } from 'notistack';

const App = () => {

    return <>
        <SnackbarProvider 
			maxSnack={6}
			anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
		>
	    	<RouterProvider router={router} />
		</SnackbarProvider>
    </>;
}

export default App;
