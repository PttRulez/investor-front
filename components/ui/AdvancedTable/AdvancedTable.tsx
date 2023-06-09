import * as React from 'react';
import { FC, ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { SxProp } from '../../../types/common';
import AdvancedCell from './AdvancedCell';

type Align = 'left' | 'right' | 'center' | 'inherit' | 'justify';

export interface AdvancedTableColumn<T = { [key: string] : any}> {
  align?: Align;
  format?: (value: any, row: T) => any;
  label: string;
  minWidth?: number;
  name: string;
  render?: (value: any, row: T) => ReactNode;
}

interface AdvancedTableProps {
  columns: AdvancedTableColumn[];
  rows: { [key: string] : any}[];
  sx?: SxProp;
  rowSx?: (row: { [key: string] : any}) => SxProp;
  pagination?: boolean;
}

const AdvancedTable: FC<AdvancedTableProps> = ({ columns, pagination = true, rows, rowSx, sx }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.label}
                  align={column.align ?? 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={rowSx ? rowSx(row) : {}}>
                    {columns.map((column) => (
                      <AdvancedCell
                        column={column}
                        value={row[column.name]}
                        row={row}
                        key={column.name}
                      />
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ overflow: 'visible' }}
      />}
    </Paper>
  );
};

export default AdvancedTable;
