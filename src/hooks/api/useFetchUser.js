// import axiosInstance from "../../api/axiosInstance";
// // import actions from "../../store/actions";
// import { useStateValue } from "../../store/StateProvider"


// const useFetchUser = () => {
//     const [{ app }, dispatch] = useStateValue();
//     const [data,setData] = useState(null)
//     const [error,setError] = useState(null)
//     const [loading,setLoading] = useState(false)

//     useEffect(() => {
//         (
//             async function(){
//                 try{
//                     setLoading(true)
//                     const response = await axios.get(url)
//                     setData(response.data)
//                 }catch(err){
//                     setError(err)
//                 }finally{
//                     setLoading(false)
//                 }
//             }
//         )()
//     }, [url])

//     return { data, error, loading }
// };

// export default useFetchSettings;