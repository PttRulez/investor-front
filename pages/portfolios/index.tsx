import AddIcon from '@mui/icons-material/Add';
import {useState} from 'react';
import {IconButton, Modal, Stack} from '@mui/material';
import {RightBottomFab} from '@/components/ui/styled/RightBottomFab';
import AddNewButton from '@/components/ui/AddNewButton';
import {emptyPortfolio} from '@/constants/empties';
import PortfolioForm from '@/pages/portfolios/PortfolioForm';
import {Portfolio} from '@/types/portfolio';
import {useQuery} from '@tanstack/react-query';
import {investorService} from '@/api/investor/investor.service';
import AdvancedTable, {AdvancedTableColumn} from '@/components/ui/AdvancedTable/AdvancedTable';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Index() {
	const [portfolioToEdit, setPortfolioToEdit] = useState<Portfolio | null>(null);
	const addPortfolioClicked = (e) => {

	};
	const { data: portfolioList } = useQuery({
		queryKey: ['allPortfolios'],
		queryFn: () => investorService.allPortfolios()
	});
	console.log('portfolios data', portfolioList)
	const addNewPortfolio = () => {
			setPortfolioToEdit(emptyPortfolio);
	}

	const columns: AdvancedTableColumn[] = [
		{
			name: 'name',
			label: 'Название'
		},
		{
			name: 'compound',
			label: 'Составной',
			format: (compound: boolean) => {
				return  compound ? <CheckIcon sx={{ color: 'success.main'}} /> : <CloseIcon sx={{ color: 'error.main'}} />
			},
			align: 'center'
		},
	]

	return (
		<>
			<AdvancedTable
				columns={columns}
				rows={portfolioList?.data ?? []}
				pagination={false}
			/>
			<AddNewButton
				onClick={addNewPortfolio}
			/>
			<Modal
				open={!!portfolioToEdit}
				onClose={() => setPortfolioToEdit(null)}
        sx={{
          '.MuiPaper-root.MuiDialog-paper': {
            maxWidth: '90%',
            maxHeight: '90%',
          },
        }}
			>
				<PortfolioForm
					afterSuccesfulSubmit={() => setPortfolioToEdit(null)}
				/>
			</Modal>
			</>
	);
}
