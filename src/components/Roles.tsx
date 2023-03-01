import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ChakraModal } from './ChakraModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDefaultSlice } from '../store/defaultSlice/slice/selector';
import { actions as defaultActions } from '../store/defaultSlice/slice';
import { ErrorMessage, Formik } from 'formik';
import { roleValidation } from '../utils/validation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Roles = ({ isOpen, onClose }: Props) => {
  const stateData = useSelector(selectAllDefaultSlice);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ roleName: '' }}
      onSubmit={values => {
        dispatch(defaultActions.createRole(values.roleName));
      }}
      validationSchema={roleValidation}
    >
      {({ handleSubmit, touched, handleChange, values, handleReset }) => (
        <ChakraModal
          loading={stateData.creatingRole}
          command={handleSubmit}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            handleReset();
          }}
          title="Create role"
        >
          <FormControl>
            <FormLabel>Role name</FormLabel>
            <Input
              value={values.roleName}
              onChange={handleChange}
              placeholder="Role name"
              name="roleName"
            />
            {touched.roleName && (
              <ErrorMessage name="roleName">
                {message => (
                  <Text color="red.400" fontSize="sm">
                    {message}
                  </Text>
                )}
              </ErrorMessage>
            )}
          </FormControl>
        </ChakraModal>
      )}
    </Formik>
  );
};
