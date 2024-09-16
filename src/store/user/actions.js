
export const fetchUser = (idUser) => async (dispatch) => {
    try {
        dispatch(loaderPush({
            label: 'Fetching user',
            actionType: 'FETCH_USER_REQUEST' 
        }));
        
        const response = await fetchUser();
        console.log(response)
        if (response.status === 200) {

            dispatch(setData(response.data)); 
            console.log("ok")
        } else {
            throw new Error('Failed to fetch user data');
        }
    
    } catch (error) {
        dispatch(setError(error.message || 'Something went wrong'));  
    } finally {
        dispatch(loaderRemove({ actionType: 'FETCH_USER_REQUEST' }));
    }
};
