export interface watchListType {
  imdbId: string;
  title: string;
  imageURL: string;
}

export interface ImFeelingLuckyButtonProps {
  watchList: watchListType[];
}
