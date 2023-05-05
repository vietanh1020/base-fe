import { useCallback, useEffect, useState } from "react";

export const useSelection = (items = []) => {
  const [selected, setSelected] = useState<any>([]);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const handleSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  const handleSelectOne = useCallback((item: any) => {
    setSelected((prevState: any) => [...prevState, item]);
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  const handleDeselectOne = useCallback((item: any) => {
    setSelected((prevState: any) => {
      return prevState.filter((_item: any) => _item !== item);
    });
  }, []);

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected,
  };
};
