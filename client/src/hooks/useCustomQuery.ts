import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseQueryProps<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData> {
	queryKey: QueryKey;
	queryFn: QueryFunction<TQueryFnData>;
	options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, "queryKey" | "queryFn">;
}

const useCustmQuery = ({ queryKey, queryFn, options }: UseQueryProps) => {
	return useQuery({
		queryKey: queryKey,
		queryFn: queryFn,
		...options, // Pass the options from the hook parameters
	});
};

export default useCustmQuery;
