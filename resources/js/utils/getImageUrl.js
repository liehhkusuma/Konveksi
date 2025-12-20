export let ImagePath;

(function (ImagePath) {
  ImagePath['LANDING'] = 'landing';
  ImagePath['USERS'] = 'users';
  ImagePath['ECOMMERCE'] = 'e-commerce';
  ImagePath['PROFILE'] = 'profile';
  ImagePath['WIDGET'] = 'widget';
})(ImagePath || (ImagePath = {}));

// ==============================|| NEW URL - GET IMAGE URL ||============================== //

export function getImageUrl(directory, path) {
  return directory+'/'+path;
  return new URL(directory+'/'+path, import.meta.url).href;
}
