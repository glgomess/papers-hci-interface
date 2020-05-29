
interface Years {
  first: number,
  last: number,
  set: number[]
}

interface PaperInfoResponse {
  abstract_PT: string,
  authors: string[],
  title: string
}

interface PaperRefsResponse {
  cited: Array<[number, string]>,
  citedBy: Array<[number, string]>
}