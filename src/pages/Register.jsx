import { useState } from "react"
import { useDispatch } from "react-redux";
import { registeruser } from "../redux/actions/authActions";
import { Box, Button, Heading, Input } from "@chakra-ui/react";

export const Register = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('plaese fill all the details');
            return;
        }
        try {
            dispatch(registeruser(email, password));
            alert("Registered Successfully");
        } catch(error) {
            console.log('Error in registering', error);
        }
    }

    return (
        <Box maxW={'400px'} mx={'auto'} mt={'50px'} p={4} borderWidth={'1px'} borderRadius={'lg'}>
            <Heading mb={4} textAlign={'center'}>Register</Heading>
            <form action="submit">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
            </form>
            <Button colorPalette={'blue.500'} color={'white'}mt={4} width={'100%'} onClick={handleRegister}></Button>
        </Box>
    )
}