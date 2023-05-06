import {AxiosResponse} from 'axios';
import {moexApi} from '@/api/moex/moex';

export const moexService = {
  search(searchParam: string): Promise<AxiosResponse<any> | void> {
    return moexApi
      .get(`/securities.json?q=${searchParam}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log('fmpService.search', err));
  }
}
