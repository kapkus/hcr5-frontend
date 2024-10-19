// import { loaderPush, loaderRemove } from "../app/appSlice";
// import { setUserData } from "./userSlice";
// import { fetchUser } from "../../api/user";
// import { checkResponse } from "../../utils/request";
// import { enqueueNotification } from "../../utils/utils";

// export const fetchUserAction = (idUser) => async (dispatch) => {
//     try {
//         dispatch(loaderPush({
//             label: 'Fetching user',
//             actionType: 'FETCH_USER_REQUEST' 
//         }));

//         const result = await fetchUser();
//         const check = checkResponse(result);
//         if (check) {
//             dispatch(setUserData(result.data)); 
//         } else {
//             enqueueNotification(result.response.data)
//         }
    
//     } catch (error) {
//         throw new Error('Failed to fetch user data');
//     } finally {
//         dispatch(loaderRemove({ actionType: 'FETCH_USER_REQUEST' }));
//     }
// };
