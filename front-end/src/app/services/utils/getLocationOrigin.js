// @flow weak

export const getLocationOrigin: () => string = () => {
  if (!window.location.origin) {
    window.location.origin = `${window.location.protocol}//${window.location.hostname}:8080`;
  }
  return window.location.origin;
};

export default getLocationOrigin;
