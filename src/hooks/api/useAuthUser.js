// import axiosInstance from "../../api/axiosInstance";
// import appActions from "../../store/actions/appActions";
// import userActions from "../../store/actions/userActions";
// // import actions from "../../store/actions";
// import { useStateValue } from "../../store/StateProvider"
// import { useState, useEffect, url } from "react";

// const useAuthUser = () => {
//     const [{auth}, dispatch] = useStateValue();
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         (
//             async function(){
//                 try{
//                     dispatch(appActions.LOADER_PUSH('Logging in', userActions.USER_LOGIN_REQUEST))

//                     // const response = await axios.get(url)
//                     // setData(response.data)
//                 }catch(err){
//                     setError(err)
//                 }finally{
//                     dispatch(appActions.LOADER_REMOVE(userActions.USER_LOGIN_REQUEST))
//                 }
//             }
//         )()
//     }, [url])

//     return { data, error, loading }
// };

// export default useAuthUser;