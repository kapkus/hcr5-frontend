import React from "react"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useSelector } from "react-redux";
import { sendSocketMessage } from "../../store/socket/socketMiddleware";
import appConfig from "../../config/appConfig";

const {colors} = appConfig.constants;

const ServoState = () => {
    const {servoStatus} = useSelector(state => state.socket)

    console.log(servoStatus);

    const handleServoChange = (e) => {
        console.log(e.target.value)
        sendSocketMessage({
            type: e.target.value,
        });
    }

    return <ToggleButtonGroup
        color="primary"
        value={servoStatus}
        exclusive
        onChange={handleServoChange}
    >
        <ToggleButton value={"servoOn"} 
            style={{
                backgroundColor: servoStatus ? colors.active : colors.disabled,
                color: "white",
            }} >
            SERVO ON
        </ToggleButton>
        <ToggleButton value={"servoOff"} style={{
                backgroundColor: !servoStatus ? colors.inactive : colors.disabled,
                color: "white",
            }} >
            SERVO OFF
        </ToggleButton>
    </ToggleButtonGroup>
}

export default ServoState;