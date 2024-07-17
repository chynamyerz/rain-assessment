import { useState } from 'react';

export const useNavBarDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return {
    open,
    toggleDrawer,
  };
};
