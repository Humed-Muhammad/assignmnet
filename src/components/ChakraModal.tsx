import React from 'react';
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import LoadingDots from './Core/icons/loading-dots';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode | React.ReactNode[];
  command?: () => void;
  loading?: boolean;
  actionText?: string;
}

/**
 * It's a modal that takes in a title, children, and a command to run when the user clicks the action
 * button
 * @param {Props}  - isOpen - boolean - whether the modal is open or not
 * @returns A modal component
 */
export function ChakraModal({
  isOpen,
  actionText = 'Create',
  onClose,
  title,
  children,
  command,
  loading,
}: Props) {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>

          <ModalFooter>
            <Button
              onClick={command}
              colorScheme={loading ? 'gray' : 'green'}
              mr={3}
            >
              {loading ? (
                <Center>
                  <LoadingDots />
                </Center>
              ) : (
                actionText
              )}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
