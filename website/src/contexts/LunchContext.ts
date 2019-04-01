import React from 'react';

export interface ILunch {
  restaurant: string | null,
  cost: number | null,
  revisit: 'unsure' | 'yes' | 'no',
  date: Date,
}


export interface ILunchContext {
  lunches: {
    [key: number]: ILunch
  },
  currentLunchId: number | null,
  addLunch: (lunchId: number, lunch: ILunch) => void,
  updateLunch: (lunchId: number, lunch: ILunch) => void;
  setCurrentLunchId: (lunchId: number) => void;
}

const LunchContext = React.createContext<ILunchContext>({
  lunches: {},
  currentLunchId: null,
  addLunch: (lunchId: number, lunch: ILunch) => { },
  updateLunch: (lunchId: number, lunch: ILunch) => { },
  setCurrentLunchId: (lunchId: number) => { },
});

export default LunchContext;
