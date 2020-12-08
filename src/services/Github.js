import axios from 'axios';

const api = {
	getDetails: (username) => {
		// URLs to be used for different API endpointsz
		const reposUrl = `https://api.github.com/users/${username}/repos`,
		gistsUrl = `https://api.github.com/users/${username}/gists`,
		followersUrl = `https://api.github.com/users/${username}/followers`,
		followingUrl = `https://api.github.com/users/${username}/following`,
		starredUrl = `https://api.github.com/users/${username}/starred`,
		profileUrl = `https://api.github.com/users/${username}`;

		/**
		 * The API returns atmost 30 entries by default unless the
		 * 'per_page' GET parameter is specified, which can be a
		 * 100 at maximum. Multiple calls for each page are required
		 * to fetch all entries. */
		const requests = [
			axios.get(reposUrl, { params: { per_page: 100 } }),
			axios.get(gistsUrl, { params: { per_page: 100 } }),
			axios.get(followersUrl, { params: { per_page: 100 } }),
			axios.get(followingUrl, { params: { per_page: 100 } }),
			axios.get(starredUrl, { params: { per_page: 100 } }),
			axios.get(profileUrl, { params: { per_page: 100 } }),
		];

		return axios.all(requests)
			.then(axios.spread((...responses) => {
				const repos = responses[0],
						gists = responses[1],
						followers = responses[2],
						following = responses[3],
						starred = responses[4],
						profile = responses[5];

				const data = {
					username,
					repos: repos.statusText === 'OK' ? repos.data : null,
					gists: gists.statusText === 'OK' ? gists.data : null,
					followers: followers.statusText === 'OK' ? followers.data : null,
					following: following.statusText === 'OK' ? following.data : null,
					starred: starred.statusText === 'OK' ? starred.data : null,
					profile: profile.statusText === 'OK' ? profile.data : null,
				};

				return data;
			}), err => console.log(err))
	}
};

export default api;