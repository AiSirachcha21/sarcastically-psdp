/**
 * Properties for a media query screen
 */
type ScreenProps = {
 max?: number;
 min?: number;
};

/**
 * Screen Types
 */
type Screen = {
 mobile: ScreenProps;
 tablet: ScreenProps;
 desktop: ScreenProps;
};

/**
 * Screen Sizes for Media Queries
 */
export const ScreenSizes: Screen = {
 mobile: {
  max: 767
 },
 tablet: {
  min: 768,
  max: 1023
 },
 desktop: {
  min: 1024
 }
};
