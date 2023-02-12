import React, { useState } from 'react';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Table,
  TableContainer,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { CloudOff } from 'react-feather';
import styled from '@emotion/styled';
import {
  selectAllDefaultSlice,
  selectConnectedAccount,
} from '../../store/defaultSlice/slice/selector';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from '../CopyToClipboard';
import { ChakraModal } from '../ChakraModal';
import { IAssignRoleTypes } from 'src/store/defaultSlice/slice/types';
import { actions as defaultActions } from '../../store/defaultSlice/slice';

interface Props extends TableProps {
  data: any[] | undefined;
  emptyText?: string;
}

const StyledTableContainer = styled(TableContainer)({
  '::-webkit-scrollbar': {
    height: '5px',
    width: '5px',
  },
  '::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },

  '::-webkit-scrollbar-thumb': {
    background: 'lightgray',
  },
});

export const ChakraTable = ({ data, ...rest }: Props) => {
  const connectedAccount = useSelector(selectConnectedAccount);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [formValue, setFormValue] = useState<IAssignRoleTypes>({
    address: '',
    roleName: '',
  });
  const dispatch = useDispatch();
  const stateData = useSelector(selectAllDefaultSlice);
  return (
    <StyledTableContainer
      border={rest.border || '1px'}
      borderColor={rest.borderColor || 'gray.300'}
      p="5"
      pb="8"
      h={['390px']}
      overflowY="auto"
      position="relative"
      {...rest}
    >
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Roles</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data?.map((item, index) => (
            <Tr key={index}>
              <Td flexGrow={1}>
                <Center justifyContent="flex-start">
                  <Text w="48" variant="truncated">
                    {item}
                  </Text>
                  <CopyToClipboard value={item} />
                </Center>
              </Td>
              <Td>
                <Button onClick={onOpen} colorScheme="teal">
                  Assign Role
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        {!data && connectedAccount ? (
          <Spinner position="absolute" bottom="50%" right="50%" />
        ) : null}
        {!data?.length && data ? (
          <Flex
            experimental_spaceX={3}
            alignItems="center"
            position="absolute"
            bottom="50%"
            right="50%"
          >
            <CloudOff /> <Text>{rest.emptyText || 'No data'}</Text>
          </Flex>
        ) : null}
      </Table>
      <ChakraModal
        loading={stateData.assigningRole}
        actionText="Assign"
        title="Assign role to an address"
        isOpen={isOpen}
        onClose={() => {
          onClose(),
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

          <FormLabel>Address</FormLabel>
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
    </StyledTableContainer>
  );
};
