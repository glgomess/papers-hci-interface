let timer: any = null

export const debounce = (func: Function, args: any, wait: number) => {
  clearTimeout(timer)
  timer = setTimeout(func, wait, args)
}

export const toTitleCase = (str) => {
  return str.replace(
      /\w\S*/g,
      (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
 }