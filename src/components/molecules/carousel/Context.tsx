import { createContext, Dispatch } from 'react';

export interface IProps {
  currentImgSrc: string;
  currentImgTitle: string;
}

export const InitialData: IProps = {
  currentImgSrc: '',
  currentImgTitle: '',
};

export const Instance = createContext<any | [IProps, Dispatch<any>]>(undefined);
