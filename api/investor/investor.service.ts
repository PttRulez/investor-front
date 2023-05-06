import { investorApi } from './investor';
import {AxiosResponse} from 'axios';
import {Portfolio} from '@/types/portfolio';

export const investorService = {
  allPortfolios(): Promise<AxiosResponse<Portfolio[]> | void> {
    return investorApi
      .get('/portfolios')
      .then(res => {
        return res.data;
      })
      .catch(err => console.log('investorApi.allPortfolios', err));
  },

};
