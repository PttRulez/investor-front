import Head from 'next/head';
import {Inter} from 'next/font/google';
import MoexSearch from '@/components/ui/StocksSearch/MoexSearch';
import {Box} from '@mui/material';

const inter = Inter({subsets: ['latin']});

export default function Home() {
	return (
		<>
			<Head>
				<title>Главная страница</title>
			</Head>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
				<MoexSearch />
			</Box>

		</>
	);
}
