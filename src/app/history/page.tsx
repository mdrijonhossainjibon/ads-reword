import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Stack,
  Text,
  useColorModeValue,
  TableContainer,
} from '@chakra-ui/react';

export default function History() {
  const transactions = [
    {
      id: 1,
      type: 'Task Completion',
      amount: '+$0.5',
      status: 'Completed',
      date: '2024-01-31',
      description: 'Joined Telegram Channel',
    },
    {
      id: 2,
      type: 'Withdrawal',
      amount: '-$25.00',
      status: 'Processed',
      date: '2024-01-30',
      description: 'PayPal withdrawal',
    },
    // Add more transactions as needed
  ];

  return (
    <Container maxW={'7xl'} py={10}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={10}>
        <Heading fontSize={'3xl'}>Transaction History</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          View all your earnings and withdrawals
        </Text>
      </Stack>

      <Box
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'lg'}
        p={8}
        rounded={'xl'}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.date}</Td>
                  <Td>{transaction.type}</Td>
                  <Td>{transaction.description}</Td>
                  <Td isNumeric>
                    <Text
                      color={transaction.amount.startsWith('+') ? 'green.500' : 'red.500'}>
                      {transaction.amount}
                    </Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={
                        transaction.status === 'Completed' ? 'green' : 'blue'
                      }
                      rounded="full"
                      px={2}
                      py={1}>
                      {transaction.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
