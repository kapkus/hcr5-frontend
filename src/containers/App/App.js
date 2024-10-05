import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAccessToken } from '../../utils/utils';
import { initializeSocket } from '../../store/socket/socketSlice';
import config from '../../config/config';

const App = () => {
	const dispatch = useDispatch();
	// const data = useSelector((state) => state.user.data)


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
