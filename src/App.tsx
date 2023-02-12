import {
  Button,
  Card,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as defaultActions } from './store/defaultSlice/slice';
import {
  selectAllDefaultSlice,
  selectConnectedAccount,
  selectConnectingWallet,
  selectMessage,
} from './store/defaultSlice/slice/selector';
import {
  ethereum,
  FADE_DOWN_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from './utils/constant';
import { motion } from 'framer-motion';
import LoadingDots from './components/Core/icons/loading-dots';
import Balancer from 'react-wrap-balancer';
import { Layout } from './Layout';
import { ChakraTable } from './components/Core/ChakraTable';
import { Stats } from './components/Stats';
import { Plus } from 'react-feather';
import { ChakraModal } from './components/ChakraModal';

function App() {
  const [roleName, setRoleName] = useState<string>('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const connectedAccount = useSelector(selectConnectedAccount);
  const message = useSelector(selectMessage);
  const connectingWallet = useSelector(selectConnectingWallet);
  const stateData = useSelector(selectAllDefaultSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(defaultActions.checkIfWalletIsConnected());

    ethereum?.on('accountsChanged', () => {
      dispatch(defaultActions.checkIfWalletIsConnected());
    });
  }, [ethereum]);

  useEffect(() => {
    if (connectedAccount) {
      console.log('first');
      dispatch(defaultActions.requestContract());
    }
  }, [connectedAccount]);

  useEffect(() => {
    if (message.content) {
      switch (message.type) {
        case 'error':
          toast({
            description: message.content,
            variant: 'subtle',
            status: 'error',
            position: 'bottom-right',
          });
          break;
        case 'success':
          toast({
            description: message.content,
            variant: 'subtle',
            status: 'success',
            position: 'bottom-right',
          });
          break;
        case 'warning':
          toast({
            description: message.content,
            variant: 'subtle',
            status: 'warning',
            position: 'bottom-right',
          });
          break;
        case 'info':
          toast({
            description: message.content,
            variant: 'subtle',
            status: 'info',
            position: 'bottom-right',
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
    <Layout>
      <motion.div
        className="max-w-xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-6xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Create your Desired Blockchain Roles</Balancer>
        </motion.h1>
        <motion.p
          className="relative mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          <Balancer>
            Roles Such as <span className="text-cyan-500">Create</span>,{' '}
            <span className="text-cyan-500">Read</span>,{' '}
            <span className="text-cyan-500">Update, etc...</span> With Ease.
          </Balancer>
        </motion.p>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          <Button
            onClick={() => {
              if (!connectedAccount) {
                dispatch(defaultActions.requestWalletConnection());
              }
            }}
            disabled={connectingWallet}
            type="submit"
            width={['full', 60]}
          >
            {connectingWallet ? (
              <LoadingDots />
            ) : connectedAccount ? (
              'Wallet is Connected'
            ) : (
              'Connect your wallet'
            )}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="my-5 flex h-auto w-11/12 animate-[slide-down-fade_0.5s_ease-in-out] flex-col items-center md:w-2/3 xl:px-0"
      >
        <Stats />
        <Card p={10} width={['full']}>
          <IconButton
            onClick={onOpen}
            m={2}
            icon={<Plus />}
            aria-label="Create role"
            width={25}
          />
          <ChakraTable
            emptyText="There is no any role yet!."
            data={stateData.roles}
          />
        </Card>
      </motion.div>
      <ChakraModal
        command={() => {
          dispatch(defaultActions.createRole(roleName));
        }}
        isOpen={isOpen}
        onClose={onClose}
        title="Create role"
      >
        <FormControl>
          <FormLabel>Role name</FormLabel>
          <Input
            value={roleName}
            onChange={e => setRoleName(e.target.value)}
            placeholder="Role name"
          />
        </FormControl>
      </ChakraModal>
    </Layout>
  );
}

export default App;
