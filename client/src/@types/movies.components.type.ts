export interface searchResultsType {
  id: string;
  titleText: {
    text: string;
  };
  primaryImage?: {
    url: string;
  };
}

export interface MovieListItemProps {
  src: string;
  alt: string;
}
