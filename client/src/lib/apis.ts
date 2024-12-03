export const getAllUsers = async (search: string) => {
	const params = new URLSearchParams({ search }).toString();
	console.log("params", params);
	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/getallusers?${params}`, {
		credentials: "include",
	});

	const data = await response.json();

	if (response.status !== 200) {
		throw new Error("Failed to fetch friends");
	}

	return data;
};

export const getConversations = async () => {
	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/getAllUserConversations`, {
		credentials: "include",
	});

	const data = await response.json();

	if (response.status !== 200) {
		throw new Error("Failed to fetch conversations");
	}

	return data;
};
