import React, { useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ChakraModal } from './ChakraModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDefaultSlice } from '../store/defaultSlice/slice/selector';
import { actions as defaultActions } from '../store/defaultSlice/slice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Roles = ({ isOpen, onClose }: Props) => {
  const [roleName, setRoleName] = useState<string>('');
  const stateData = useSelector(selectAllDefaultSlice);
  const dispatch = useDispatch();
  return (
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
  );
};
