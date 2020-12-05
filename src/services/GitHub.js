import axios from 'axios';

/**
 * 3 pages comprise ~300 records. Retrieving such a
 * huge number for each endpoint would not be feasible by
 * the application and may lead to exceeding the API's rate
 * limit. This may be overridden by passing true to
 * the getAll argument in the getDetails function. */
const TOO_MANY_PAGES = 3;
const PER_PAGE = 100;

const endpoints = [
	'repos',
	'gists',
	'followers',
	'following',
	'starred'
];

const getEndpoint = async (username, endpoint, pageNumber = 1, perPage = PER_PAGE) => {
	// URL for the API endpoint
	const url = `https://api.github.com/users/${username}/${endpoint}?per_page=${perPage}&page=${pageNumber}`;
	const resp = await axios.get(url);
	return resp.data.length > 0 ? resp.data : null;
};

const getDetails = async (username, getAll = false) => {
	/**
	 * The API returns atmost 30 entries by default unless the
	 * 'per_page' GET parameter is specified, which can be a
	 * 100 at maximum. Multiple calls for each page are required
	 * to fetch all entries. */

	// Initiate each call from page 1
	let endpointPages = {};
	let results = { username };
	for (let ep of endpoints) {
		endpointPages[ep] = 1;
		results[ep] = [];
	}

	// Build data object
	for (const ep of endpoints) {
		let newData;
		while (true) {
			newData = await getEndpoint(username, ep, endpointPages[ep]);
			//console.log(ep, await newData);
			if (newData !== null) {
				results[ep] = [
					...results[ep],
					...(await newData)
				];
			} else
				break;
			if ((endpointPages[ep] === TOO_MANY_PAGES && !getAll) || newData.length < PER_PAGE)
				break;
			endpointPages[ep]++;
		}
	};

	//console.log(await results);

	return new Promise(async (res) => {
		let response = await results;

		// Convert each empty array to null
		for (let key in response) {
			if (response[key].length < 1)
				response[key] = null;
		}
		return res(response);
	});
};

const api = {
	endpoints,
	getEndpoint,
	getDetails
};

export default api;