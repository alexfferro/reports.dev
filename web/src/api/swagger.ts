/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Report API
 * A REST API for generating reports.
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
export type UpdateTutorial404 = {
  message: string;
};

export type UpdateTutorial200 = {
  id: number;
};

export type UpdateTutorialBodyCategory = typeof UpdateTutorialBodyCategory[keyof typeof UpdateTutorialBodyCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateTutorialBodyCategory = {
  OTHERS: 'OTHERS',
  MOVEMENT: 'MOVEMENT',
  REGISTER: 'REGISTER',
  FINANCIAL: 'FINANCIAL',
} as const;

export type UpdateTutorialBody = {
  category?: UpdateTutorialBodyCategory;
  content?: string;
  /** @minLength 1 */
  title?: string;
};

export type GetTutorial404 = {
  message: string;
};

export type GetTutorial200Category = typeof GetTutorial200Category[keyof typeof GetTutorial200Category];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetTutorial200Category = {
  OTHERS: 'OTHERS',
  MOVEMENT: 'MOVEMENT',
  REGISTER: 'REGISTER',
  FINANCIAL: 'FINANCIAL',
} as const;

export type GetTutorial200 = {
  category: GetTutorial200Category;
  /** @nullable */
  content: string | null;
  id: number;
  title: string;
};

export type GetTutorials200ItemCategory = typeof GetTutorials200ItemCategory[keyof typeof GetTutorials200ItemCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetTutorials200ItemCategory = {
  OTHERS: 'OTHERS',
  MOVEMENT: 'MOVEMENT',
  REGISTER: 'REGISTER',
  FINANCIAL: 'FINANCIAL',
} as const;

export type GetTutorials200Item = {
  category: GetTutorials200ItemCategory;
  id: number;
  title: string;
};

export type CreateTutorial201 = {
  id: number;
};

export type CreateTutorialBodyCategory = typeof CreateTutorialBodyCategory[keyof typeof CreateTutorialBodyCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateTutorialBodyCategory = {
  OTHERS: 'OTHERS',
  MOVEMENT: 'MOVEMENT',
  REGISTER: 'REGISTER',
  FINANCIAL: 'FINANCIAL',
} as const;

export type CreateTutorialBody = {
  category: CreateTutorialBodyCategory;
  /** @minLength 1 */
  title: string;
};

export type DeleteFiles404 = {
  message: string;
};

export type DeleteFiles201 = { [key: string]: unknown };

export type UpdateFiles500 = {
  message: string;
};

export type UpdateFiles404 = {
  message: string;
};

export type UpdateFiles201 = { [key: string]: unknown };

export type CreateFiles500 = {
  message: string;
};

export type CreateFiles201 = { [key: string]: unknown };

export type GetFiles200ItemType = typeof GetFiles200ItemType[keyof typeof GetFiles200ItemType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetFiles200ItemType = {
  PDF: 'PDF',
  REPORT: 'REPORT',
} as const;

export type GetFiles200Item = {
  reportId: number;
  type: GetFiles200ItemType;
  url: string;
};

export type CreateReport201 = {
  id: number;
};

export type CreateReportBodyCategory = typeof CreateReportBodyCategory[keyof typeof CreateReportBodyCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateReportBodyCategory = {
  OTHERS: 'OTHERS',
  MOVEMENT: 'MOVEMENT',
  REGISTER: 'REGISTER',
  FINANCIAL: 'FINANCIAL',
} as const;

export type CreateReportBody = {
  category: CreateReportBodyCategory;
  description: string;
  title: string;
};

export type DeleteReport404 = {
  message: string;
};

export type DeleteReport200 = { [key: string]: unknown };

export type UpdateReport201 = { [key: string]: unknown };

export type UpdateReportBodyCategory = typeof UpdateReportBodyCategory[keyof typeof UpdateReportBodyCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateReportBodyCategory = {
  OTHERS: 'OTHERS',
  MOVEMENT: 'MOVEMENT',
  REGISTER: 'REGISTER',
  FINANCIAL: 'FINANCIAL',
} as const;

export type UpdateReportBody = {
  category?: UpdateReportBodyCategory;
  description?: string;
  title?: string;
};

export type GetReport404 = {
  message: string;
};

export type GetReport200 = {
  category?: string;
  description?: string;
  /** @nullable */
  file_url: string | null;
  id?: number;
  /** @nullable */
  pdf_url: string | null;
  title?: string;
};

export type GetReports200ItemCategory = typeof GetReports200ItemCategory[keyof typeof GetReports200ItemCategory];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetReports200ItemCategory = {
  OTHERS: 'OTHERS',
  MOVEMENT: 'MOVEMENT',
  REGISTER: 'REGISTER',
  FINANCIAL: 'FINANCIAL',
} as const;

export type GetReports200Item = {
  category: GetReports200ItemCategory;
  description: string;
  /** @nullable */
  file_url: string | null;
  id: number;
  /** @nullable */
  pdf_url: string | null;
  title: string;
};





/**
 * List all reports
 */
export type getReportsResponse = {
  data: GetReports200Item[];
  status: number;
  headers: Headers;
}

export const getGetReportsUrl = () => {


  return `http://localhost:3333/reports`
}

export const getReports = async ( options?: RequestInit): Promise<getReportsResponse> => {
  
  const res = await fetch(getGetReportsUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}



export const getGetReportsQueryKey = () => {
    return [`http://localhost:3333/reports`] as const;
    }

    
export const getGetReportsQueryOptions = <TData = Awaited<ReturnType<typeof getReports>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReports>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetReportsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getReports>>> = ({ signal }) => getReports({ signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getReports>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetReportsQueryResult = NonNullable<Awaited<ReturnType<typeof getReports>>>
export type GetReportsQueryError = unknown


export function useGetReports<TData = Awaited<ReturnType<typeof getReports>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReports>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getReports>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetReports<TData = Awaited<ReturnType<typeof getReports>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReports>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getReports>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetReports<TData = Awaited<ReturnType<typeof getReports>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReports>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetReports<TData = Awaited<ReturnType<typeof getReports>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReports>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetReportsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * List an report
 */
export type getReportResponse = {
  data: GetReport200;
  status: number;
  headers: Headers;
}

export const getGetReportUrl = (id: number,) => {


  return `http://localhost:3333/report/${id}`
}

export const getReport = async (id: number, options?: RequestInit): Promise<getReportResponse> => {
  
  const res = await fetch(getGetReportUrl(id),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}



export const getGetReportQueryKey = (id: number,) => {
    return [`http://localhost:3333/report/${id}`] as const;
    }

    
export const getGetReportQueryOptions = <TData = Awaited<ReturnType<typeof getReport>>, TError = GetReport404>(id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReport>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetReportQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getReport>>> = ({ signal }) => getReport(id, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getReport>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetReportQueryResult = NonNullable<Awaited<ReturnType<typeof getReport>>>
export type GetReportQueryError = GetReport404


export function useGetReport<TData = Awaited<ReturnType<typeof getReport>>, TError = GetReport404>(
 id: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReport>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getReport>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetReport<TData = Awaited<ReturnType<typeof getReport>>, TError = GetReport404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReport>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getReport>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetReport<TData = Awaited<ReturnType<typeof getReport>>, TError = GetReport404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReport>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetReport<TData = Awaited<ReturnType<typeof getReport>>, TError = GetReport404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getReport>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetReportQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Update a report
 */
export type updateReportResponse = {
  data: UpdateReport201;
  status: number;
  headers: Headers;
}

export const getUpdateReportUrl = (id: number,) => {


  return `http://localhost:3333/report/${id}`
}

export const updateReport = async (id: number,
    updateReportBody: UpdateReportBody, options?: RequestInit): Promise<updateReportResponse> => {
  
  const res = await fetch(getUpdateReportUrl(id),
  {      
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      updateReportBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getUpdateReportMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateReport>>, TError,{id: number;data: UpdateReportBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof updateReport>>, TError,{id: number;data: UpdateReportBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateReport>>, {id: number;data: UpdateReportBody}> = (props) => {
          const {id,data} = props ?? {};

          return  updateReport(id,data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateReportMutationResult = NonNullable<Awaited<ReturnType<typeof updateReport>>>
    export type UpdateReportMutationBody = UpdateReportBody
    export type UpdateReportMutationError = unknown

    export const useUpdateReport = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateReport>>, TError,{id: number;data: UpdateReportBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof updateReport>>,
        TError,
        {id: number;data: UpdateReportBody},
        TContext
      > => {

      const mutationOptions = getUpdateReportMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * Delete an report
 */
export type deleteReportResponse = {
  data: DeleteReport200;
  status: number;
  headers: Headers;
}

export const getDeleteReportUrl = (id: number,) => {


  return `http://localhost:3333/report/${id}`
}

export const deleteReport = async (id: number, options?: RequestInit): Promise<deleteReportResponse> => {
  
  const res = await fetch(getDeleteReportUrl(id),
  {      
    ...options,
    method: 'DELETE'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getDeleteReportMutationOptions = <TError = DeleteReport404,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteReport>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof deleteReport>>, TError,{id: number}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteReport>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteReport(id,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteReportMutationResult = NonNullable<Awaited<ReturnType<typeof deleteReport>>>
    
    export type DeleteReportMutationError = DeleteReport404

    export const useDeleteReport = <TError = DeleteReport404,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteReport>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteReport>>,
        TError,
        {id: number},
        TContext
      > => {

      const mutationOptions = getDeleteReportMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * Create a report
 */
export type createReportResponse = {
  data: CreateReport201;
  status: number;
  headers: Headers;
}

export const getCreateReportUrl = () => {


  return `http://localhost:3333/report`
}

export const createReport = async (createReportBody: CreateReportBody, options?: RequestInit): Promise<createReportResponse> => {
  
  const res = await fetch(getCreateReportUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      createReportBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getCreateReportMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createReport>>, TError,{data: CreateReportBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof createReport>>, TError,{data: CreateReportBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createReport>>, {data: CreateReportBody}> = (props) => {
          const {data} = props ?? {};

          return  createReport(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateReportMutationResult = NonNullable<Awaited<ReturnType<typeof createReport>>>
    export type CreateReportMutationBody = CreateReportBody
    export type CreateReportMutationError = unknown

    export const useCreateReport = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createReport>>, TError,{data: CreateReportBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof createReport>>,
        TError,
        {data: CreateReportBody},
        TContext
      > => {

      const mutationOptions = getCreateReportMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * List all files
 */
export type getFilesResponse = {
  data: GetFiles200Item[];
  status: number;
  headers: Headers;
}

export const getGetFilesUrl = () => {


  return `http://localhost:3333/files`
}

export const getFiles = async ( options?: RequestInit): Promise<getFilesResponse> => {
  
  const res = await fetch(getGetFilesUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}



export const getGetFilesQueryKey = () => {
    return [`http://localhost:3333/files`] as const;
    }

    
export const getGetFilesQueryOptions = <TData = Awaited<ReturnType<typeof getFiles>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getFiles>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetFilesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getFiles>>> = ({ signal }) => getFiles({ signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getFiles>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetFilesQueryResult = NonNullable<Awaited<ReturnType<typeof getFiles>>>
export type GetFilesQueryError = unknown


export function useGetFiles<TData = Awaited<ReturnType<typeof getFiles>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getFiles>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getFiles>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetFiles<TData = Awaited<ReturnType<typeof getFiles>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getFiles>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getFiles>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetFiles<TData = Awaited<ReturnType<typeof getFiles>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getFiles>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetFiles<TData = Awaited<ReturnType<typeof getFiles>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getFiles>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetFilesQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Create an file
 */
export type createFilesResponse = {
  data: CreateFiles201;
  status: number;
  headers: Headers;
}

export const getCreateFilesUrl = (id: number,) => {


  return `http://localhost:3333/files/${id}`
}

export const createFiles = async (id: number, options?: RequestInit): Promise<createFilesResponse> => {
  
  const res = await fetch(getCreateFilesUrl(id),
  {      
    ...options,
    method: 'POST'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getCreateFilesMutationOptions = <TError = CreateFiles500,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createFiles>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof createFiles>>, TError,{id: number}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createFiles>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  createFiles(id,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateFilesMutationResult = NonNullable<Awaited<ReturnType<typeof createFiles>>>
    
    export type CreateFilesMutationError = CreateFiles500

    export const useCreateFiles = <TError = CreateFiles500,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createFiles>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof createFiles>>,
        TError,
        {id: number},
        TContext
      > => {

      const mutationOptions = getCreateFilesMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * Update an file
 */
export type updateFilesResponse = {
  data: UpdateFiles201;
  status: number;
  headers: Headers;
}

export const getUpdateFilesUrl = (id: number,) => {


  return `http://localhost:3333/files/${id}`
}

export const updateFiles = async (id: number, options?: RequestInit): Promise<updateFilesResponse> => {
  
  const res = await fetch(getUpdateFilesUrl(id),
  {      
    ...options,
    method: 'PUT'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getUpdateFilesMutationOptions = <TError = UpdateFiles404 | UpdateFiles500,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateFiles>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof updateFiles>>, TError,{id: number}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateFiles>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  updateFiles(id,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateFilesMutationResult = NonNullable<Awaited<ReturnType<typeof updateFiles>>>
    
    export type UpdateFilesMutationError = UpdateFiles404 | UpdateFiles500

    export const useUpdateFiles = <TError = UpdateFiles404 | UpdateFiles500,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateFiles>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof updateFiles>>,
        TError,
        {id: number},
        TContext
      > => {

      const mutationOptions = getUpdateFilesMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * Delete an file
 */
export type deleteFilesResponse = {
  data: DeleteFiles201;
  status: number;
  headers: Headers;
}

export const getDeleteFilesUrl = (id: number,) => {


  return `http://localhost:3333/files/${id}`
}

export const deleteFiles = async (id: number, options?: RequestInit): Promise<deleteFilesResponse> => {
  
  const res = await fetch(getDeleteFilesUrl(id),
  {      
    ...options,
    method: 'DELETE'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getDeleteFilesMutationOptions = <TError = DeleteFiles404,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteFiles>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof deleteFiles>>, TError,{id: number}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteFiles>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteFiles(id,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteFilesMutationResult = NonNullable<Awaited<ReturnType<typeof deleteFiles>>>
    
    export type DeleteFilesMutationError = DeleteFiles404

    export const useDeleteFiles = <TError = DeleteFiles404,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteFiles>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteFiles>>,
        TError,
        {id: number},
        TContext
      > => {

      const mutationOptions = getDeleteFilesMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * Create an new Tutorial
 */
export type createTutorialResponse = {
  data: CreateTutorial201;
  status: number;
  headers: Headers;
}

export const getCreateTutorialUrl = () => {


  return `http://localhost:3333/tutorials`
}

export const createTutorial = async (createTutorialBody: CreateTutorialBody, options?: RequestInit): Promise<createTutorialResponse> => {
  
  const res = await fetch(getCreateTutorialUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      createTutorialBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getCreateTutorialMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTutorial>>, TError,{data: CreateTutorialBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof createTutorial>>, TError,{data: CreateTutorialBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createTutorial>>, {data: CreateTutorialBody}> = (props) => {
          const {data} = props ?? {};

          return  createTutorial(data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateTutorialMutationResult = NonNullable<Awaited<ReturnType<typeof createTutorial>>>
    export type CreateTutorialMutationBody = CreateTutorialBody
    export type CreateTutorialMutationError = unknown

    export const useCreateTutorial = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createTutorial>>, TError,{data: CreateTutorialBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof createTutorial>>,
        TError,
        {data: CreateTutorialBody},
        TContext
      > => {

      const mutationOptions = getCreateTutorialMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * List all Tutorials
 */
export type getTutorialsResponse = {
  data: GetTutorials200Item[];
  status: number;
  headers: Headers;
}

export const getGetTutorialsUrl = () => {


  return `http://localhost:3333/tutorials`
}

export const getTutorials = async ( options?: RequestInit): Promise<getTutorialsResponse> => {
  
  const res = await fetch(getGetTutorialsUrl(),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}



export const getGetTutorialsQueryKey = () => {
    return [`http://localhost:3333/tutorials`] as const;
    }

    
export const getGetTutorialsQueryOptions = <TData = Awaited<ReturnType<typeof getTutorials>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorials>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTutorialsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTutorials>>> = ({ signal }) => getTutorials({ signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTutorials>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetTutorialsQueryResult = NonNullable<Awaited<ReturnType<typeof getTutorials>>>
export type GetTutorialsQueryError = unknown


export function useGetTutorials<TData = Awaited<ReturnType<typeof getTutorials>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorials>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTutorials>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetTutorials<TData = Awaited<ReturnType<typeof getTutorials>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorials>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTutorials>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetTutorials<TData = Awaited<ReturnType<typeof getTutorials>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorials>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetTutorials<TData = Awaited<ReturnType<typeof getTutorials>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorials>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetTutorialsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Get a tutorial by ID
 */
export type getTutorialResponse = {
  data: GetTutorial200;
  status: number;
  headers: Headers;
}

export const getGetTutorialUrl = (id: number,) => {


  return `http://localhost:3333/tutorials/${id}`
}

export const getTutorial = async (id: number, options?: RequestInit): Promise<getTutorialResponse> => {
  
  const res = await fetch(getGetTutorialUrl(id),
  {      
    ...options,
    method: 'GET'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}



export const getGetTutorialQueryKey = (id: number,) => {
    return [`http://localhost:3333/tutorials/${id}`] as const;
    }

    
export const getGetTutorialQueryOptions = <TData = Awaited<ReturnType<typeof getTutorial>>, TError = GetTutorial404>(id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorial>>, TError, TData>>, fetch?: RequestInit}
) => {

const {query: queryOptions, fetch: fetchOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTutorialQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTutorial>>> = ({ signal }) => getTutorial(id, { signal, ...fetchOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTutorial>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetTutorialQueryResult = NonNullable<Awaited<ReturnType<typeof getTutorial>>>
export type GetTutorialQueryError = GetTutorial404


export function useGetTutorial<TData = Awaited<ReturnType<typeof getTutorial>>, TError = GetTutorial404>(
 id: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorial>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTutorial>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetTutorial<TData = Awaited<ReturnType<typeof getTutorial>>, TError = GetTutorial404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorial>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getTutorial>>,
          TError,
          TData
        > , 'initialData'
      >, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetTutorial<TData = Awaited<ReturnType<typeof getTutorial>>, TError = GetTutorial404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorial>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetTutorial<TData = Awaited<ReturnType<typeof getTutorial>>, TError = GetTutorial404>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getTutorial>>, TError, TData>>, fetch?: RequestInit}

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetTutorialQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * Update a tutorial by ID
 */
export type updateTutorialResponse = {
  data: UpdateTutorial200;
  status: number;
  headers: Headers;
}

export const getUpdateTutorialUrl = (id: number,) => {


  return `http://localhost:3333/tutorials/${id}`
}

export const updateTutorial = async (id: number,
    updateTutorialBody: UpdateTutorialBody, options?: RequestInit): Promise<updateTutorialResponse> => {
  
  const res = await fetch(getUpdateTutorialUrl(id),
  {      
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      updateTutorialBody,)
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getUpdateTutorialMutationOptions = <TError = UpdateTutorial404,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTutorial>>, TError,{id: number;data: UpdateTutorialBody}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof updateTutorial>>, TError,{id: number;data: UpdateTutorialBody}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateTutorial>>, {id: number;data: UpdateTutorialBody}> = (props) => {
          const {id,data} = props ?? {};

          return  updateTutorial(id,data,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateTutorialMutationResult = NonNullable<Awaited<ReturnType<typeof updateTutorial>>>
    export type UpdateTutorialMutationBody = UpdateTutorialBody
    export type UpdateTutorialMutationError = UpdateTutorial404

    export const useUpdateTutorial = <TError = UpdateTutorial404,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateTutorial>>, TError,{id: number;data: UpdateTutorialBody}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof updateTutorial>>,
        TError,
        {id: number;data: UpdateTutorialBody},
        TContext
      > => {

      const mutationOptions = getUpdateTutorialMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
/**
 * Delete a tutorial by ID
 */
export type deleteTutorialResponse = {
  data: void;
  status: number;
  headers: Headers;
}

export const getDeleteTutorialUrl = (id: number,) => {


  return `http://localhost:3333/tutorials/${id}`
}

export const deleteTutorial = async (id: number, options?: RequestInit): Promise<deleteTutorialResponse> => {
  
  const res = await fetch(getDeleteTutorialUrl(id),
  {      
    ...options,
    method: 'DELETE'
    
    
  }

  )
  const data = await res.json()

  return { status: res.status, data, headers: res.headers }
}




export const getDeleteTutorialMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTutorial>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationOptions<Awaited<ReturnType<typeof deleteTutorial>>, TError,{id: number}, TContext> => {
const {mutation: mutationOptions, fetch: fetchOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteTutorial>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteTutorial(id,fetchOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteTutorialMutationResult = NonNullable<Awaited<ReturnType<typeof deleteTutorial>>>
    
    export type DeleteTutorialMutationError = unknown

    export const useDeleteTutorial = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteTutorial>>, TError,{id: number}, TContext>, fetch?: RequestInit}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteTutorial>>,
        TError,
        {id: number},
        TContext
      > => {

      const mutationOptions = getDeleteTutorialMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
