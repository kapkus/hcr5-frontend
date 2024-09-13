import { RouterProvider } from 'react-router-dom';
import ControlPanel from '../ControlPanel/ControlPanel';
import SettingsModal from '../Modals/SettingsModal';
import router from './Router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserSettings } from '../../store/app/actions';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(fetchUserSettings());
	}, [dispatch]);

    return (<>
      
    	<RouterProvider router={router} />
  		{/* <ControlPanel />
		
		<SettingsModal /> */}
    </>);
}

export default App;
