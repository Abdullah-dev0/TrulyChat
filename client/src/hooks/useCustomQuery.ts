import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

export default function useCustomQuery<TData = unknown, TError = unknown>(
	queryKey: QueryKey,
	queryFn: QueryFunction<TData>,
	options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
): UseQueryResult<TData, TError> {
	return useQuery({
		queryKey,
		queryFn,
		...options,
	});
}
