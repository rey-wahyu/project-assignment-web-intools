interface Header {
  label: string;
  key: string;
}

export interface PROPS {
  fileName: string;
  header: Header[];
  params: Record<any, any>;
  apiUrl: string;
  apiListResponseTransform: (any) => any;
}
