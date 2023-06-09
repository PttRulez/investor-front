import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import React, { FC, useState } from 'react';
import Link, {LinkProps} from 'next/link';
import * as Muicon from '@mui/icons-material';
import { useRouter } from "next/router";
import cn from 'classnames'

interface IMenuItem {
  title: string;
  iconName?: string;
  link?: string;
  children?: IMenuItem[];

}

const StyledListItemButton = styled(ListItemButton)<
  LinkProps & { component: typeof Link }
>(({ theme }) => ({
  paddingY: 2,
  color: theme.palette.grey[700],
  '&.active': {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.grey[50]
  },
}));

const CollapsingMenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { title, iconName, children } = item;

  return (
    <>
      <StyledListItemButton
        onClick={() => setOpen((prev) => !prev)}
      >
        <ListItemIcon>
          {Muicon[iconName as keyof typeof Muicon] &&
            React.createElement(Muicon[iconName as keyof typeof Muicon])}
        </ListItemIcon>
        <ListItemText primary={title} />
        <ListItemIcon>
          {open ? <Muicon.ExpandLess /> : <Muicon.ExpandMore />}
        </ListItemIcon>
      </StyledListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children!.map((item) => (
          <MenuItem item={item} key={`${item.link} ${item.title}`} />
        ))}
      </Collapse>
    </>
  );
};

const SimpleMenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const { link, title, iconName } = item;
  const router = useRouter();
  return (
    <StyledListItemButton component={Link} href={link!} sx={{ paddingY: 2 }} end className={cn({active: router.asPath === item.link})}>
      <ListItemIcon>
        {Muicon[iconName as keyof typeof Muicon] &&
          React.createElement(Muicon[iconName as keyof typeof Muicon])}
      </ListItemIcon>
      <ListItemText primary={title} />
    </StyledListItemButton>
  );
};

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  if (item.children) {
    return <CollapsingMenuItem item={item} />;
  } else {
    return <SimpleMenuItem item={item} />;
  }
};

export default MenuItem;
