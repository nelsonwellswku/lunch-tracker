import React from 'react';

export type RevisitEnum = 'unsure' | 'yes' | 'no';

export interface ILunch {
  lunchId: number;
  restaurant: string | null,
  cost: number | null,
  revisit: RevisitEnum | null,
  date: Date | null,
}

export interface ILunchContext {
  lunches: {
    [key: number]: ILunch
  },
  currentLunchId: number | null,
  AddOrUpdateLunch: (lunchId: number, lunch: ILunch) => void;
  setCurrentLunchId: (lunchId: number) => void;
}

const LunchContext = React.createContext<ILunchContext>({
  lunches: {},
  currentLunchId: null,
  AddOrUpdateLunch: (lunchId: number, lunch: ILunch) => { },
  setCurrentLunchId: (lunchId: number) => { },
});

export default LunchContext;
