'use client';
import {ChangeEvent, FC, FormEventHandler, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useQuery} from '@tanstack/react-query';
import useDebounce from '@/hooks/useDebounce';
import {useRouter} from 'next/navigation';
import {moexService} from '@/api/moex/moex.service';
import {Box, Typography} from '@mui/material';
import {moexGroupToMarket, moexStockTypes} from '@/constants/moex';

interface ISearchField {
	searchTerm: string;
	handleSubmit?: FormEventHandler<HTMLFormElement> | undefined;
	handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StocksSearch: FC = () => {
	const router = useRouter();
	const [submittedTicker, setSubmittedTicker] = useState<string>('');
	const debouncedValue = useDebounce<string>(submittedTicker, 500);

	const {data: stocksOptions, refetch} = useQuery({
		queryKey: ['search', debouncedValue],
		queryFn: ({queryKey}) => moexService.search(queryKey[1] as string),
		enabled: false,
		select: (data) => {
			return data.securities.data.map(sec => ({
				id: sec[1],
				label: sec[2],
				type: sec.at(-4),
				group: sec.at(-3),
				primary_boardid: sec.at(-2)
			}));
		}
	});

	useEffect(() => {
		if (debouncedValue) {
			refetch();
		}

	}, [debouncedValue]);

	const inputHandler = (e, value, reason) => {
		if (reason === 'input' && value) {
			setSubmittedTicker(value);
		}
	};

	const changeHandler = (e, value, reason) => {
		router.push(`/moex/stock/${moexGroupToMarket[value.group]}/${value.primary_boardid}/${value.id}`);
	};

	console.log('stocksOptions', stocksOptions);
	const typesUnique = new Set();
	if (stocksOptions) {
		for (const sec of stocksOptions) {
			typesUnique.add(sec.group);
		}
	}

	console.log('types', typesUnique);
	return <Autocomplete
		disablePortal
		id="combo-box-demo"
		options={stocksOptions ?? []}
		onInputChange={inputHandler}
		onChange={changeHandler}
		renderOption={(props, option) => {
			return <Box
				component="li"
				{...props}
				key={option.id}
			>{option.label} <Typography variant="body1" sx={{fontStyle: 'italic', color: 'grey.500'}}
			>- {moexStockTypes[option.type]}</Typography></Box>;
		}}
		// getOptionLabel={(option) => option.name ? `${option.symbol} - ${option.name}` : ""}
		sx={{minWidth: 500}}
		// @ts-ignore
		renderInput={(params) => <TextField {...params} label="Ticker"/>}
	/>;
};

export default StocksSearch;
