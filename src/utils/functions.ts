let timer: any = null

export const debounce = (func: Function, args: any, wait: number) => {
  clearTimeout(timer)
  timer = setTimeout(func, wait, args)
}
