
export interface PaperInfoResponse {
  abstract_PT: string,
  authors: string[],
  title: string
}

export interface PaperRefsResponse {
  cited: Array<[number, string]>,
  citedBy: Array<[number, string]>
}