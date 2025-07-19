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
  imdbId: string | undefined;
  title: string | undefined;
  imageURL: string | undefined;
}
