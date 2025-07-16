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

export interface AddToWatchListProps {
  imdbId: string;
  title: string;
  imageURL: string;
}
