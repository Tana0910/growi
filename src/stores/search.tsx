import useSWR, { SWRResponse } from 'swr';
import { apiv3Get } from '~/client/js/util/apiv3-client';
import { SearchIndicesInfo as ISearchIndicesInfo } from '~/interfaces/search';

export const useSearchIndicesInfoSWR = (): SWRResponse<ISearchIndicesInfo, Error> => {

  const fetcher = async (endpoint) => {
    try {
      return await apiv3Get(endpoint)
    }
    catch (error) {
      throw error
    }
  }

  return useSWR(
    '/search/indices', fetcher, { revalidateOnFocus: false },
  );
};
