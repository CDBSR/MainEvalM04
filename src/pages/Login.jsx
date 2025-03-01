import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginUser, registeruser } from "../redux/actions/authActions";
import { Box, Button, Heading, Input } from "@chakra-ui/react";

export const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('plaese fill all the details');
            return;
        }
        try {
            dispatch(loginUser(email, password));
            alert("Logged in Successfully");
        } catch(error) {
            console.log('Error in Logging', error);
        }
    }

    return (
        <Box maxW={'400px'} mx={'auto'} mt={'50px'} p={4} borderWidth={'1px'} borderRadius={'lg'}>
            <Heading mb={4} textAlign={'center'}>Login</Heading>
            <form action="submit">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
            </form>
            <Button colorPalette={'blue.500'} color={'white'}mt={4} width={'100%'} onClick={handleLogin}></Button>
        </Box>
    )
}