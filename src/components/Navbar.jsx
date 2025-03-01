import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

export const Navbar = () => {
    const {user, isAuthenticated} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <Box bg={'blue.500'} p={4} color={'white'}>
            <Flex justify={'space-between'} align={'center'} maxW={'900px'}mx={'auto'}>
                <Text fontSize={'xl'} fontWeight={'bold'}>My Library</Text>
                <Flex gap={4}>
                    <Link to={'/'}>Home</Link>
                    {user && <Link to={'/booklist'}>My Books</Link>}
                    {!user ? (
                        <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                        </>
                    ) : (
                        <>
                        <Text> {user.email} </Text>
                        <Button colorPalette={'red.500'} color={'white'} size={'sm'} onClick={handleLogout} >Logout</Button>
                        </>
                    )}
                </Flex>
            </Flex>
        </Box>
    )
}