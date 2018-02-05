// @flow weak

export const getLocationOrigin: () => string = () => {
  return `${window.location.protocol}//${window.location.hostname}:8080`;
};

export default getLocationOrigin;
