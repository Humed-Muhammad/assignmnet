import { Button, Container, Flex, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as defaultActions } from './store/defaultSlice/slice';
import {
  selectConnectedAccount,
  selectConnectingWallet,
  selectMessage,
} from './store/defaultSlice/slice/selector';
import { ethereum } from './utils/constant';

function App() {
  const toast = useToast();
  const connectedAccount = useSelector(selectConnectedAccount);
  const message = useSelector(selectMessage);
  const connectingWallet = useSelector(selectConnectingWallet);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(defaultActions.checkIfWalletIsConnected());

    ethereum?.on('accountsChanged', () => {
      dispatch(defaultActions.checkIfWalletIsConnected());
    });
  }, [ethereum]);

  useEffect(() => {
    if (connectedAccount) {
      dispatch(defaultActions.requestContract());
    }
  }, [connectedAccount]);

  useEffect(() => {
    if (message.content) {
      switch (message.type) {
        case 'error':
          toast({
            description: message.content,
            variant: 'left-accent',
            status: 'error',
          });
          break;
        case 'success':
          toast({
            description: message.content,
            variant: 'left-accent',
            status: 'success',
          });
          break;
        case 'warning':
          toast({
            description: message.content,
            variant: 'left-accent',
            status: 'warning',
          });
          break;
        case 'info':
          toast({
            description: message.content,
            variant: 'left-accent',
            status: 'info',
          });
          break;
      }
    }
    return () => {
      dispatch(
        defaultActions.setMessages({
          content: '',
          type: null,
        }),
      );
    };
  }, [message.content]);
  return (
    <Flex direction="column" justify="center" align="center" height={['100vh']}>
      <Button
        colorScheme="blue"
        my={[3]}
        isLoading={connectingWallet}
        loadingText="Connecting to wallet..."
        onClick={() => {
          if (!connectedAccount) {
            dispatch(defaultActions.requestWalletConnection());
          }
        }}
        variant="outline"
      >
        {connectedAccount ? 'Connected' : 'Connect your wallet'}
      </Button>
      <Container>{/* <ChakraTable /> */}</Container>
    </Flex>
  );
}

export default App;
