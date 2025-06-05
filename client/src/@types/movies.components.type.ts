export interface searchResultsType {
  id: string;
  imdbId: string;
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
