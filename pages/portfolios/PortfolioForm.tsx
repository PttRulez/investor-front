import {Box, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {Portfolio} from '@/types/portfolio';
import FormText from '@/components/ui/Forms/FormText';
import FormCheckBox from '@/components/ui/Forms/FormCheckBox';

interface PortfolioFormProps {
	account: Portfolio;
	afterSuccesfulSubmit: () => void;
}

export default function PortfolioForm<PortfolioFormProps>({
																														portfolio,
																														afterSuccesfulSubmit,
																													}) {
	const {control, handleSubmit, watch} = useForm<Portfolio>({
		defaultValues: portfolio,
	});
	const watchAll = watch();

	const onSubmit = (formData: Portfolio) => {
		try {

		} catch (e) {

		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{backgroundColor: 'white'}}
		>
			<Stack component="form">
				<FormText
					control={control}
					name="name"
					label="Название"
					value={watchAll.name}
				/>
				<FormCheckBox
					control={control}
					name="compound"
					label="Составной"
					checked={watchAll.compound}
				/>
			</Stack>
		</Box>
	);
}
