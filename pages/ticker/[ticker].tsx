import {apiHelper} from '@/helpers/api';
import lodash from 'lodash';
import {fmpService} from '@/api/fmp/fmp.service';
import SimpleTable from '@/components/ui/SimpleTable';
import Head from 'next/head';
import {useState} from 'react';

async function getTickerData(ticker) {
	const res = await fetch(apiHelper.fmp3Url(`key-metrics-ttm/${ticker}`));

	if (!res.ok) {
		throw new Error('cannot get ticker data');
	}

}

export default function Ticker({tableData, ticker}) {
	const [value, setValue] = useState('incomeStatementAnnual');
	const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<>
			<Head>
				<title>{ticker}</title>
			</Head>
			<SimpleTable data={tableData} ticker={ticker}/>

		</>
	);
}

export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: true
	};
};

export const getStaticProps = async ({params}) => {
	let tableData = [];

	try {
		const {data: incomeStatement} = await fmpService.incomeStatementAnnual(params.ticker);
		const {data: balanceSheet} = await fmpService.balanceSheetStatementAnnual(params.ticker);
		// const res = await Micex.securityMarketdata('SBERP');
		//
		// console.log('micex', res)

		const length = incomeStatement.length > 15 ? 15 : incomeStatement.length;

		for (let i = 0; i < length; i++) {
			tableData.push(Object.assign({},
				lodash.pick(incomeStatement[i], ['revenue', 'costOfRevenue', 'grossProfit', 'netIncome', 'date']),
				lodash.pick(balanceSheet[i], ['totalAssets', 'totalLiabilities'])));
		}
	} catch (e) {
		console.log('catched incomeStatementAnnual oshibka');
	}

	return {
		props: {
			tableData,
			ticker: params.ticker,
		},
		revalidate: 3600
	};
};
