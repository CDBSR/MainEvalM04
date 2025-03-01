
import { Box, Image, Select, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux"
import { updateBookRating, updateBookStatus } from "../redux/actions/booksActions";

export const MyBookCard = ({ book, userId }) => {
    const dispatch = useDispatch();

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        dispatch(updateBookStatus(book.id, newStatus, userId));
    }

    const handleRatingChange = (e) => {
        const newRating = parseInt(e.target.value);
        dispatch(updateBookRating(book.id, newRating, userId));
    }

    return (
        <Box borderWidth={'1px'} borderRadius={'lg'} p={4} textAlign={'center'}>
            <Image src={book.coverImage} alt={book.coverImage} boxSize={'150px'} mx={'auto'} />
            <VStack gap={2} mt={3}>
                <Text fontSize={'lg'} fontWeight={'bold'}> {book.title} </Text>
                <Text fontSize={'sm'} color={'gray.600'}> {book.author} </Text>
                <Select value={book.status} onChange = {handleStatusChange}>
                    <option value="Want to Read"> Want to Read</option>
                    <option value="Currently Reading"> Currently Reading</option>
                    <option value="Read">Read</option>
                </Select>

                <Select value={book.rating} onChange = {handleRatingChange}>
                    <option value="0"> Rate</option>
                    <option value="1"> one</option>
                    <option value="2">two</option>
                    <option value="3"> three</option>
                    <option value="4">four</option>
                    <option value="5"> five</option>
                </Select>
            </VStack>
        </Box>
    )
}