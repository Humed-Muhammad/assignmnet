import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as defaultActions } from '../../store/defaultSlice/slice';
import { selectAllDefaultSlice } from '../../store/defaultSlice/slice/selector';

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
