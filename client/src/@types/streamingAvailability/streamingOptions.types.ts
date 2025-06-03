export interface StreamingOption {
  service: Service;
  type: string;
  addon: Addon;
  link: string;
  audio: Language[];
  subtitles: Language[];
  expiresSoon: boolean;
  expiresOn: number;
  availableSince: number;
}

export interface Service {
  id: string;
  name: string;
  homePage: string;
  themeColorCode: string;
  imageSet: ImageSetColors;
}

export interface Addon {
  id: string;
  name: string;
  homePage: string;
  themeColorCode: string;
  imageSet: ImageSetColors;
}

export interface ImageSetColors {
  lightThemeImage: string;
  darkThemeImage: string;
  whiteImage: string;
}

export interface Language {
  language: string;
}
