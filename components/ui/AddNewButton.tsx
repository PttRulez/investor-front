import AddIcon from '@mui/icons-material/Add';
import { FC } from 'react';
import {RightBottomFab} from '@/components/ui/styled/RightBottomFab';
import {SxProp} from '@/types/common';

interface Props {
  onClick: () => void;
  sx?: SxProp;
}

const AddNewButton: FC<Props> = ({ onClick, sx }) => {
  return (
    <RightBottomFab onClick={onClick} sx={sx}>
      <AddIcon />
    </RightBottomFab>
  );
};

export default AddNewButton;
