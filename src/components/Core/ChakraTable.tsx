import React, { useEffect, useState } from 'react';
import {
  Center,
  Flex,
  IconButton,
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
import { CloudOff, Edit } from 'react-feather';
import styled from '@emotion/styled';
import {
  selectAllDefaultSlice,
  selectConnectedAccount,
} from '../../store/defaultSlice/slice/selector';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from '../CopyToClipboard';
import { TooltipHolder } from './Tooltip';
import { ChakraModal } from '../ChakraModal';
import { IChangeRoleTypes } from 'src/store/defaultSlice/slice/types';
import { actions } from '../../store/defaultSlice/slice';

import { gasLimit } from '../../utils/constant';

interface Props extends TableProps {
  data: any[] | undefined;
  emptyText?: string;
  fromMembers?: boolean;
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
  const stateData = useSelector(selectAllDefaultSlice);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState<IChangeRoleTypes>({
    address: '',
    status: 'Activate',
  });
  const dispatch = useDispatch();
  const fetchSingleUserRole = async () => {
    const transactionResponse: any[] = await stateData?.contract?.userRole(
      values.address,
      gasLimit,
    );
    setValues(prev => ({
      ...prev,
      status: transactionResponse?.[1] ? 'Activate' : 'Deactivate',
    }));
  };
  useEffect(() => {
    fetchSingleUserRole();
  }, [isOpen]);
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
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data?.map((item, index) => (
            <Tr key={index}>
              <Td flexGrow={1}>
                <Center justifyContent="flex-start">
                  <Text isTruncated w="56" variant="truncated">
                    {item}
                  </Text>
                </Center>
              </Td>
              <Td>
                <CopyToClipboard value={item} />
                {rest.fromMembers && (
                  <TooltipHolder label="Edit members status Activate/Deactivate">
                    <IconButton
                      onClick={() => {
                        onOpen();
                        setValues(prev => ({ ...prev, address: item }));
                      }}
                      aria-label="Edit members status"
                      icon={<Edit />}
                    />
                  </TooltipHolder>
                )}
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
        isOpen={isOpen}
        onClose={onClose}
        title="Change members status"
        actionText="Ok"
        loading={stateData.changingMembersStatus}
        command={() => dispatch(actions.changeMembersStatus(values))}
      >
        <Select
          onChange={e =>
            setValues(prev => ({
              ...prev,
              status: e.target.value as 'Activate' | 'Deactivate',
            }))
          }
          value={values?.status}
        >
          <option value={'Activate'}>Activate</option>
          <option value={'Deactivate'}>Deactivate</option>
        </Select>
      </ChakraModal>
    </StyledTableContainer>
  );
};
