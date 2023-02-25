import React from 'react';
import { motion } from 'framer-motion';
import {
  FADE_DOWN_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from '../utils/constant';
import Balancer from 'react-wrap-balancer';
import { Button } from '@chakra-ui/react';
import LoadingDots from './Core/icons/loading-dots';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectConnectedAccount,
  selectConnectingWallet,
} from '../store/defaultSlice/slice/selector';
import { actions as defaultActions } from '../store/defaultSlice/slice';

export const Hero = () => {
  const connectedAccount = useSelector(selectConnectedAccount);
  const connectingWallet = useSelector(selectConnectingWallet);
  const dispatch = useDispatch();

  return (
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
        className="font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-6xl md:leading-[5rem]"
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
  );
};
