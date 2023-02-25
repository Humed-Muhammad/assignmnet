import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { ChakraModal } from './ChakraModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDefaultSlice } from '../store/defaultSlice/slice/selector';
import { actions as defaultActions } from '../store/defaultSlice/slice';
import { IAssignRoleTypes } from '../store/defaultSlice/slice/types';

interface Props {
  isMembersModalOpen: boolean;
  onCloseMembersModal: () => void;
}

export const Members = ({ isMembersModalOpen, onCloseMembersModal }: Props) => {
  const [formValue, setFormValue] = useState<IAssignRoleTypes>({
    address: '',
    roleName: '',
  });
  const stateData = useSelector(selectAllDefaultSlice);
  const dispatch = useDispatch();
  return (
    <ChakraModal
      loading={stateData.assigningRole}
      actionText="Assign"
      title="Add and Assign role to a member"
      isOpen={isMembersModalOpen}
      onClose={() => {
        onCloseMembersModal(),
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
  );
};
