export interface SearchParamProps{
    params?: Promise<SegmentParams>;
    searchParams: Promise<{[key: string]:string | string[] | undefined}>
}

export interface files{
  _id: string,
  owner: string,
  path: string,
  originalname: string,
  imageURL: string,
  fileType: string
  createdAt: string,
  fileSize: number,
  shareuser: string[]
}