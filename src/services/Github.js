import axios from 'axios';

/**
 * 3 pages comprise ~300 records. Retrieving such a
 * huge number for each endpoint would not be feasible by
 * the application and may lead to exceeding the API's rate
 * limit. This may be overridden by passing true to
 * the getAll argument in the getDetails function. */
const TOO_MANY_PAGES = 3;
const PER_PAGE = 100;
const API_URL = 'https://api.github.com';

// All endpoints
const endpoints = [
	'repos',
	'gists',
	'followers',
	'following',
	'starred',
  'profile'
];

// Get a page from a particular endpoint
const getEndpoint = async (username, endpoint, pageNumber = 1, perPage = PER_PAGE) => {
	// URL for the API endpoint
  if(endpoint === 'profile') {
    const url = `${API_URL}/users/${username}`;
  	const resp = await axios.get(url);
    //Putting data into an array because getDetails need arrays
    const respArr = [resp.data];
  	return respArr.length > 0 ? respArr : null;
  } else {
    const url = `${API_URL}/users/${username}/${endpoint}?per_page=${perPage}&page=${pageNumber}`;
  	const resp = await axios.get(url);
  	return resp.data.length > 0 ? resp.data : null;
  }


};

// Get the data object for a user
const getDetails = async (username, getAll = false) => {
	/**
	 * The API returns atmost 30 entries by default unless the
	 * 'per_page' GET parameter is specified, which can be a
	 * 100 at maximum. Multiple calls for each page are required
	 * to fetch all entries. */

	// Initiate each call from page 1
	let endpointPages = {};
	let results = { username },
		resultArray = [];
	for (let ep of endpoints) {
		endpointPages[ep] = 1;
		results[ep] = [];
		resultArray.push([ep, []]);
	}

	// Build data array
	resultArray = await Promise.all(resultArray.map(async ([ep, arr]) => {
		let newData;
		while (true) {
			newData = await getEndpoint(username, ep, endpointPages[ep]);
			//console.log(ep, newData);
			if (newData !== null) {
				arr = [
					...arr,
					...newData
				];
			} else
				break;
			if ((endpointPages[ep] === TOO_MANY_PAGES && !getAll) || newData.length < PER_PAGE)
				break;
			endpointPages[ep]++;
		}

		return [ep, arr];
	}));

	// Convert to object
	for (let [ep, arr] of resultArray) {
		if (arr.length > 0)
			results[ep] = arr;
		else
			results[ep] = null;
	}

	return new Promise(async (res) => res(await results));
};

// Exported object
const api = {
	endpoints,
	getEndpoint,
	getDetails
};

export default api;
