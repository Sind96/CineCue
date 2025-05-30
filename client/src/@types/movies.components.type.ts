import type { ReactNode } from "react";

export interface TitleProps {
  title: ReactNode;
}

export interface searchResultsType {
  id: string;
  titleText: {
    text: string;
  };
  primaryImage?: {
    url: string;
  };
}
