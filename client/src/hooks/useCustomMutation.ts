import { MutationFunction, UseMutationOptions, useMutation } from "@tanstack/react-query";

interface UseCustomMutationProps<TData, TVariables, TError> {
	mutationFn: MutationFunction<TData, TVariables>;
	options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">;
}

export const useCustomMutation = <TData = unknown, TError = Error, TVariables = void>({
	mutationFn,
	options,
}: UseCustomMutationProps<TData, TVariables, TError>) => {
	return useMutation({
		mutationFn,
		retry: 2,
		...options,
	});
};
