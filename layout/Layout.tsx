import {FC} from 'react';
import Head from 'next/head';
import Sidebar from '@/layout/sidebar/Sidebar';
import {Box, CssBaseline} from '@mui/material';

const Layout: FC = ({children}) => {
	return (
		<>
			<CssBaseline />
			<Head>
				<title>Сайт отважных инвесторов</title>
			</Head>
			<Sidebar/>
			<Box component={'main'} sx={{ marginLeft: '240px', minHeight: '100vh', padding: '20px' }}>
			{children}
			</Box>
		</>
	);
};

export default Layout;
