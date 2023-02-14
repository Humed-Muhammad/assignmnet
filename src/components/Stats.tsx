import React from 'react';
import {
  Card,
  Flex,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAllDefaultSlice } from '../store/defaultSlice/slice/selector';

/**
 * It's a React component that renders a component statics of the smart contract
 */
export const Stats = () => {
  const stateData = useSelector(selectAllDefaultSlice);
  return (
    <Flex
      position="relative"
      experimental_spaceX={['0', '5', '10']}
      experimental_spaceY={['5', '0']}
      justifyContent="center"
      width={'100%'}
      mb={10}
      bg="gray.100"
      p={5}
      flexWrap={['wrap', 'nowrap', 'nowrap']}
    >
      <Card p={2} pl={4} width={'64'}>
        <Stat>
          <StatLabel>Members with role</StatLabel>
          <StatNumber>{stateData.membersCount}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {stateData?.membersCount && stateData?.membersCount} %
          </StatHelpText>
        </Stat>
      </Card>
      <Card p={2} pl={4} width={'64'}>
        <Stat>
          <StatLabel>Total roles</StatLabel>
          <StatNumber>{stateData.roleTypesCount}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {stateData?.roleTypesCount && stateData?.roleTypesCount} %
          </StatHelpText>
        </Stat>
      </Card>
    </Flex>
  );
};
