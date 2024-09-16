import { Button, FormControl, TextField } from "@mui/material";
import React, {useEffect, useState} from "react"
import { authenticateUser } from "../../store/app/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/utils";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            navigate('/', {replace: true});
        }
    }, [navigate]);

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
            }, 
            () => {
                navigate('/', {replace: true});
            }
        ));
        }
    }

    return <div style={{margin: 100}}>
        <form onSubmit={handleSubmit}>
            <FormControl >
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
                <Button type={"submit"} variant={"contained"} >Login</Button>
            </FormControl>
        </form>
        
    </div>
}

export default Login;