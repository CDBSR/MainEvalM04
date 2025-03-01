import { Box, Button, Image, Text, VStack } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { addBookToMyBooks } from "../redux/actions/booksActions";
import { useNavigate } from "react-router-dom";

export const BookCard = ({book}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleAddtoMyBooks = () => {
        if(user) {
            dispatch(addBookToMyBooks(book, user.uid));
        }
        else {
            alert("please log in to add books");
            navigate('/login');
        }
    };

    return (
        <Box borderWidth={'1px'} borderRadius={'lg'} overflow={'hidden'} p={4} textAlign={'center'}>
            <Image src= {book.coverImage} alt={book.coverImage} boxSize={'150px'} mx={'auto'} />
            <VStack gap={2} mt={3}>
                <Text fontSize={'lg'} fontWeight={'bold'}> {book.title} </Text>
                <Text fontSize={'sm'} color={'gray.600'}> {book.author} </Text>
                <Text fontSize={'sm'} fontWeight={'bold'}> {book.availability} </Text>
                <Button colorPalette={'blue'} size={'sm'} onClick={handleAddtoMyBooks}>
                    {user ? 'Want to Read' : "Login to Add"}
                </Button>
            </VStack>
        </Box>
    )
}