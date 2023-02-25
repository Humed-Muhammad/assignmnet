import {
  Button,
  Card,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { Plus } from 'react-feather';
import { useSelector } from 'react-redux';
import { selectAllDefaultSlice } from '../store/defaultSlice/slice/selector';
import { ChakraTable } from './Core/ChakraTable';

interface Props {
  onOpen: () => void;
  onOpenSecond: () => void;
}

export const TableTabList = ({ onOpen, onOpenSecond }: Props) => {
  const stateData = useSelector(selectAllDefaultSlice);
  return (
    <Card p={10} width={['full']}>
      <Flex justifyContent="space-between"></Flex>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Roles</Tab>
          <Tab>Members</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Button
              leftIcon={<Plus />}
              onClick={onOpen}
              m={2}
              aria-label="Create role"
            >
              Add Role
            </Button>
            <ChakraTable
              emptyText="No roles have been created!."
              data={stateData.roles}
            />
          </TabPanel>
          <TabPanel>
            <Button
              leftIcon={<Plus />}
              m={2}
              onClick={onOpenSecond}
              colorScheme="gray"
            >
              Add Member
            </Button>
            <ChakraTable
              emptyText="No members have been created!."
              data={stateData.usersAddress}
              fromMembers
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};
