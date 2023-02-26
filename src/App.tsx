import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as defaultActions } from './store/defaultSlice/slice';
import {
  selectAllDefaultSlice,
  selectConnectedAccount,
} from './store/defaultSlice/slice/selector';
import { ethereum, FADE_DOWN_ANIMATION_VARIANTS } from './utils/constant';
import { motion } from 'framer-motion';
import { Layout } from './Layout';
import { Stats } from './components/Stats';
import { useEventListener, useInitToast } from './utils/hooks';
import { TableTabList } from './components/TableTabList';
import { Hero } from './components/Hero';
import { Roles } from './components/Roles';
import { Members } from './components/Members';

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isMembersModalOpen,
    onClose: onCloseMembersModal,
    onOpen: onOpenSecond,
  } = useDisclosure();

  const connectedAccount = useSelector(selectConnectedAccount);
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

  /**@Init hooks */
  useEventListener();
  useInitToast();
  /**@End */

  return (
    <Layout>
      <Hero />
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="my-5 flex h-auto w-11/12 animate-[slide-down-fade_0.5s_ease-in-out] flex-col items-center md:w-2/3 xl:px-0"
      >
        <Stats />
        <TableTabList onOpen={onOpen} onOpenSecond={onOpenSecond} />
      </motion.div>

      <Roles onClose={onClose} isOpen={isOpen} />
      <Members
        isMembersModalOpen={isMembersModalOpen}
        onCloseMembersModal={onCloseMembersModal}
      />
    </Layout>
  );
}

export default App;
