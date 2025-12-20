import AuthenticatedLayout from '@/layouts/Dashboard';
import { Head, router, usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Add, Edit, Trash, TickSquare, CloseSquare } from 'iconsax-react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

// project-imports
import MainCard from '@/components/MainCard';
import { Tooltip } from '@mui/material';
import IconButton from '@/components/@extended/IconButton';

import { ThemeMode } from '@/types/config';
import AlertCustomerDelete from './Modal/AlertCustomerDelete';
import { EmptyTable } from '@/components/third-party/react-table';

// table filter
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells = [
    {
        id: 'code',
        numeric: false,
        disablePadding: true,
        label: 'Code'
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name'
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email'
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: true,
        label: 'Phone'
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'Status'
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action'
    }
];


function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : undefined}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box sx={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function Customer({ customers }) {

    const { auth } = usePage().props;
    const theme = useTheme();
    const mode = theme.palette.mode;

    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [dense] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [resourceDeleteId, setResourceDeleteId] = useState('');
    const [resourceDeleteTitle, setResourceDeleteTitle] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedId = customers.data.map((n) => n.name);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        const selectedRowData = customers.data.filter((customer) => newSelected.includes(customer.code.toString()));
        setSelectedValue(selectedRowData);
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        router.get(route('customers.index'), { page: newPage }, { preserveState: true });
    };

    const handleSearch = (event) => {
        setGlobalFilter(event?.target.value)
        router.get(route('customers.index'), { search: event?.target.value }, { preserveState: true });
    };

    const handleClose = () => {
        setOpen(!open);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = customers?.data.length > 0 ? 0 : customers.per_page;


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Business Partner
                </h2>
            }
        >
            <Head title="Business Partner" />
            <MainCard title="Business Partner">
                {/* <RowSelection selected={selected.length} /> */}

                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 3, paddingTop: 0 }}>
                    <TextField
                        value={globalFilter}
                        onChange={(e) => handleSearch(e)}
                        placeholder={`Search ${customers.total} records...`}
                        autoFocus
                    />

                    <Stack direction="row" alignItems="center" spacing={2}>
                        {auth.can.customer_create ? (
                            <Button variant="contained" startIcon={<Add />} onClick={() => {

                                router.get(route('customers.create'))
                            }} size="large">
                                Add Business Partner
                            </Button>) : null}
                    </Stack>
                </Stack>

                {/* table */}
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={customers.total}
                        />
                        <TableBody>
                            {stableSort(customers.data, getComparator(order, orderBy))
                                .map((customer, index) => {
                                    if (typeof customer === 'number') return null;
                                    const isItemSelected = isSelected(customer.code);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, customer.code)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={customer.code}
                                            selected={isItemSelected}
                                        >
                                            <TableCell sx={{ pl: 3 }} padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {customer.code}
                                            </TableCell>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.phone}</TableCell>
                                            <TableCell>{customer.is_active ? 'Active' : 'Inactive'}</TableCell>
                                            <TableCell sx={{ pr: 3 }} align="right">
                                                {auth.can.customer_edit ? (<Tooltip
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                                                                opacity: 0.9
                                                            }
                                                        }
                                                    }}
                                                    title="Edit"
                                                >
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            router.get(`customers/${customer.id}/edit`)
                                                        }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>) : null}
                                                {auth.can.customer_destroy ? (<Tooltip
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                                                                opacity: 0.9
                                                            }
                                                        }
                                                    }}
                                                    title="Delete"
                                                >
                                                    <IconButton
                                                        color="primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleClose();
                                                            setResourceDeleteId(Number(customer.id));
                                                            setResourceDeleteTitle(`${customer.name} - ${customer.code}`);
                                                        }}
                                                    >
                                                        <Trash />
                                                    </IconButton>
                                                </Tooltip>) : null}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow sx={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={8} >
                                        <EmptyTable msg={'Sorry, currently there is no data available.'} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
                {/* table pagination */}
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="end" sx={{ padding: 3 }}>
                    <Pagination
                        count={customers.last_page}
                        page={page}
                        onChange={handleChangePage}
                    />
                </Stack>

                <AlertCustomerDelete id={Number(resourceDeleteId)} title={resourceDeleteTitle} open={open} handleClose={handleClose} />
            </MainCard>
        </AuthenticatedLayout>
    );
}

EnhancedTableHead.propTypes = {
    onSelectAllClick: PropTypes.any,
    order: PropTypes.any,
    orderBy: PropTypes.any,
    numSelected: PropTypes.any,
    rowCount: PropTypes.any,
    onRequestSort: PropTypes.any
};
