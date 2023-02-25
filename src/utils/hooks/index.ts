import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as defaultActions } from '../../store/defaultSlice/slice';
import {
  selectAllDefaultSlice,
  selectMessage,
} from '../../store/defaultSlice/slice/selector';

/**
 * "useScroll returns a boolean that is true if the user has scrolled past a certain threshold."
 *
 * Let's break down the function
 * @param {number} threshold - The number of pixels from the top of the page that the user has to
 * scroll down before the component is considered to be scrolled.
 * @returns A boolean value that is true if the window has been scrolled past the threshold.
 */
export default function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.pageYOffset > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return scrolled;
}

/**
 * It returns a boolean value that indicates whether the value has been copied to the clipboard or not,
 * and a function that copies the value to the clipboard
 * @returns An object with two properties: copyed and copyToClipboard.
 */
export const useCopyToClipboard = () => {
  const toast = useToast();
  const [copyed, setCopyed] = useState(false);
  const copyToClipboard = (value: string | undefined) => {
    try {
      if (value) {
        navigator.clipboard.writeText(value);
        setCopyed(true);
        setTimeout(() => {
          setCopyed(false);
        }, 1500);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast({
        description: 'There is noting to copy',
        status: 'error',
        variant: 'left-accent',
      });
      setCopyed(false);
    }
  };
  return {
    copyed,
    copyToClipboard,
  };
};

/**
 * It listens for events from the contract and dispatches an action to update the contract state
 */
export const useEventListener = () => {
  const dispatch = useDispatch();
  const { contract, assigningRole, creatingRole } = useSelector(
    selectAllDefaultSlice,
  );

  useEffect(() => {
    contract?.on('RoleAdded', () => {
      dispatch(defaultActions.requestContract());
    });
    contract?.on('StateChanged', () => {
      dispatch(defaultActions.requestContract());
    });
  }, [assigningRole, creatingRole]);
};

export const useInitToast = () => {
  const toast = useToast();
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
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
};
