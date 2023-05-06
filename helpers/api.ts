import {urls} from '@/constants/common';

export const apiHelper = {
	fmp3Url: (url, params = {}) => {
		let paramsString = '';
		paramsString = Object.entries(params).reduce((acc, [key, value]) => {
			return acc + '&' + key + '=' + value
		}, `?apikey=${process.env.FMP_API_KEY}`)

		return `${urls.fmp3}/${url}${paramsString}`
	}
}

