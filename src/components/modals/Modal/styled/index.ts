import { theme } from '@/theme/theme';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ModalSlot = styled(Box)`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: black;
  box-shadow: 0px 40px 32px -24px rgba(0, 0, 0, 0.12);
  padding: 24px 16px;
  border-radius: 8px;
  overflow-y: scroll;

  ${theme.breakpoints.down('md')} {
    padding: 24px;
    width: unset;
  }
`;
