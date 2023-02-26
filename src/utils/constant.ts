import { ethers } from 'ethers';
import { EtherWindow } from './types';

const { ethereum }: EtherWindow = window;

export { ethereum };

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export const gasLimit = {
  gasLimit: 6000000,
  gasPrice: ethers.utils.parseUnits('10', 'gwei'),
};
