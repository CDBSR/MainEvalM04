
import { Box, Button, Image, Text, VStack, Grid } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMyBooks } from "../redux/actions/booksActions";
import { useEffect } from "react";
import { MyBookCard } from "./MyBookCard";

export const BookList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { myBooks, loading, error } = useSelector((state) => state.books)

    useEffect(() => {
        if (user) {
            dispatch(fetchMyBooks(user.uid));
        }
    }, [dispatch, user]);

    return (
        <Box maxW={'900px'} mx={'auto'} mt={'20px'}>
            <Text fontSize={'2xl'} fontWeight='bold' textAlign={'center'} mb={4}>My Books</Text>
            {loading && <Text>Loading books ....</Text>}
            {error && <Text color={'red.500'}> {error} </Text>}
            {myBooks.length === 0 && <Text textAlign={'center'}>No books added yet</Text>}
            <Grid templateColumns={'repeat(auto-fit, minmax(200px, 1fr))'} gap={6}>
                {myBooks.map((book) => (
                    <MyBookCard key={book.id} book={book} userId={user.uid} />
                ))}
            </Grid>
        </Box>
    )
}