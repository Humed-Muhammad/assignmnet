import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
import { useEventListener } from './utils/hooks';
import { IAssignRoleTypes } from './store/defaultSlice/slice/types';
import { TooltipHolder } from './components/Core/Tooltip';

function App() {
  const [roleName, setRoleName] = useState<string>('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isSecondOpen,
    onClose: onCloseSecond,
    onOpen: onOpenSecond,
  } = useDisclosure();
  const [formValue, setFormValue] = useState<IAssignRoleTypes>({
    address: '',
    roleName: '',
  });
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
      dispatch(defaultActions.requestContract());
    }
  }, [connectedAccount, stateData.assigningRole, stateData.creatingRole]);

  useEventListener();

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
          <Flex justifyContent="space-between">
            <TooltipHolder label="Create new role">
              <IconButton
                onClick={onOpen}
                m={2}
                icon={<Plus />}
                aria-label="Create role"
                width={25}
              />
            </TooltipHolder>
            <Button onClick={onOpenSecond} colorScheme="gray">
              Assign Role
            </Button>
          </Flex>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Roles</Tab>
              <Tab>Members</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ChakraTable
                  emptyText="There is no any role yet!."
                  data={stateData.roles}
                />
              </TabPanel>
              <TabPanel>
                <ChakraTable
                  emptyText="There is no any members with role yet!."
                  data={stateData.usersAddress}
                  fromMembers
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>
      </motion.div>
      <ChakraModal
        loading={stateData.creatingRole}
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

      {/***
       * @ChakraModalTwo
       *
       * */}
      <ChakraModal
        loading={stateData.assigningRole}
        actionText="Assign"
        title="Assign role to an address"
        isOpen={isSecondOpen}
        onClose={() => {
          onCloseSecond(),
            setFormValue({
              address: '',
              roleName: '',
            });
        }}
        command={() => dispatch(defaultActions.assignRole(formValue))}
      >
        <FormControl>
          <FormLabel>Role</FormLabel>
          <Select
            value={formValue.roleName}
            onChange={e => {
              setFormValue(prev => ({ ...prev, roleName: e.target.value }));
            }}
            placeholder="Select Role"
          >
            {stateData?.roles?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>

          <FormLabel mt={2}>Wallet Address</FormLabel>
          <Input
            required
            value={formValue.address}
            onChange={e =>
              setFormValue(prev => ({ ...prev, address: e.target.value }))
            }
            placeholder="Address"
          />
        </FormControl>
      </ChakraModal>
    </Layout>
  );
}

export default App;
