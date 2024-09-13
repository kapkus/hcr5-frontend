import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";


const ControlRow = (props) => {

    const {label, cord, setCord} = props;

    return <>
        <div className="control-panel-row">
            <div className="control-panel-item">{label}</div>
            <div className="control-panel-item">{cord}</div>
            <div className="control-panel-item">
                <button className="control-panel-btn" 
                        onClick={() => setCord(1)}
                >
                    <HiOutlinePlus />
                </button>
                <button className="control-panel-btn" 
                        onClick={() => setCord(-1)}
                >
                    <HiOutlineMinus />
                </button>
            </div>
        </div>
    </>
    
}


export default ControlRow;