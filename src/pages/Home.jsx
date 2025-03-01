import { Box, Grid, Text } from "@chakra-ui/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks } from "../redux/actions/booksActions";
import { BookCard } from "../components/BookCard";

export const Home =() => {
    const {books, loading, error} = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <Box maxW={'900px'} mx={'auto'} mt={'20px'}>
            <Text fontSize={'2xl'} fontWeight='bold' textAlign={'center'} mb={4}>Book Library</Text>
            {loading && <Text>Loading books ....</Text>}
            {error && <Text color={'red.500'}> {error} </Text>}
            <Grid templateColumns={'repeat(auto-fit, minmax(200px, 1fr))'} gap={6}>
                {books.map((book) => (
                    <BookCard key={book.id} book = {book} />
                ))}
            </Grid>
        </Box>
    )
}