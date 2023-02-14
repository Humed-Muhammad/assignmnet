import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { useCopyToClipboard } from '../utils/hooks';

import { Copy } from 'react-feather';
import { Check } from 'react-feather';
import { TooltipHolder } from './Core/Tooltip';
interface Props {
  value: string | undefined;
}
/**
 * It's a button that copies the value passed to it to the clipboard
 * @param {Props}  - `value` - the value to copy to the clipboard
 * @returns A component that is a button with an icon.
 */
export const CopyToClipboard = ({ value }: Props) => {
  const { copyToClipboard, copyed } = useCopyToClipboard();
  return (
    <TooltipHolder label="Copy to clipboard">
      <IconButton
        onClick={() => {
          copyToClipboard(value);
        }}
        bg="transparent"
        color="gray.600"
        rounded="full"
        aria-label="copy to clipboard"
        icon={copyed ? <Check size={20} color="green" /> : <Copy size={20} />}
      />
    </TooltipHolder>
  );
};
