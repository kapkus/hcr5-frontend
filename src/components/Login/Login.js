import { Button, FormControl, Input, TextField } from "@mui/material";
import React, {useState} from "react"
import useAuthUser from "../../hooks/api/useAuthUser";
import { authenticateUser } from "../../store/app/actions";
import { useDispatch } from "react-redux";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const dispatch = useDispatch();

    const validate = () => {
        let validationErrors = { username: '', password: '' };
        let isValid = true;

        if (!username) {
            validationErrors.username = 'Username required';
            isValid = false;
        } else if (username.length < 3) {
            validationErrors.username = 'Username length must be at least 3 characters';
            isValid = false;
        }

        if (!password) {
            validationErrors.password = 'Password required';
            isValid = false;
        } else if (password.length < 6) {
            validationErrors.password = 'Password length must be at least 6 characters';
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
            dispatch(authenticateUser({
                username: username,
                password: password
            }));
        }
    }

    return <div style={{margin: 100}}>
        <FormControl onSubmit={handleSubmit}>
            <TextField 
                label={"Username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                margin={"normal"}
            />
            <TextField 
                label={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                margin={"normal"}
            />
            <Button type={"submit"} onClick={handleSubmit} variant={"contained"} >Login</Button>
        </FormControl>
    </div>
}

export default Login;