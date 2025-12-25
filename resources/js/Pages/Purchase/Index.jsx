import PropTypes from 'prop-types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Divider, TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

// third-party
import { DndProvider } from 'react-dnd';
import { parseISO, format } from 'date-fns';
import { isMobile } from 'react-device-detect';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { EmptyTable } from '@/components/third-party/react-table';

// THIRD - PARTY
import {
    useFilters,
    useExpanded,
    useGlobalFilter,
    useRowSelect,
    useSortBy,
    useTable,
    usePagination,
    Column,
    HeaderGroup,
    Row,
    Cell,
    HeaderProps
} from 'react-table';

// project-imports
import ScrollX from '@/components/ScrollX';
import MainCard from '@/components/MainCard';
import IconButton from '@/components/@extended/IconButton';
import LinearWithLabel from '@/components/@extended/progress/LinearWithLabel';
import { CSVExport, DraggableRow } from '@/components/third-party/react-table';
import AuthenticatedLayout from '@/layouts/Dashboard';
import AlertPurchaseDelete from './Modal/AlertPurchaseDelete';
import { ThemeMode } from '@/types/config';

// assets
import { Add, CloseCircle, Eye, Edit, Note, Send, TickCircle, Trash } from 'iconsax-react';

import { ImagePath, getImageUrl } from '@/utils/getImageUrl';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ defaultColumns, defaultData }) {
    const { auth, ziggy } = usePage().props;

    const [columns] = useState(() => [...defaultColumns]);
    const [data, setData] = useState([...defaultData.data]);

    const [page, setPage] = useState(1);
    const [globalFilter, setGlobalFilter] = useState('');

    const handleSearch = (event) => {
        setGlobalFilter(event?.target.value)
        router.get(route('purchases.index'), { search: event?.target.value }, { preserveState: true });
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        router.get(route('purchases.index'), { page: newPage }, { preserveState: true });
    };

    useEffect(() => {
        setData([...defaultData.data]);
    }, [defaultData.data]);

    const repurchaseRow = (draggedRowIndex, targetRowIndex) => {
        data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
        router.post(route('purchases.sort'), { purchases: data }, { preserveState: true });
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // getRowId: (row) => row.id.toString(), // good to have guaranteed unique row ids/keys for rendering
        // debugTable: true,
        // debugHeaders: true,
        // debugColumns: true
    });

    let headers = [];
    table.getAllColumns().map((columns) =>
        columns.columnDef.accessorKey &&
        headers.push({
            label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
            // @ts-ignore
            key: columns.columnDef.accessorKey
        })
    );

    return (
        <ScrollX>
            <TableContainer>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 3, paddingTop: 0 }}>
                    <TextField
                        value={globalFilter}
                        onChange={(e) => handleSearch(e)}
                        placeholder={`Search ${data.length} records...`}
                        autoFocus
                    />

                    <Stack direction="row" alignItems="center" spacing={2}>
                        {auth.can.purchase_create ? (<Button variant="contained" startIcon={<Add />} onClick={() => {
                            router.get(route('purchases.create'))
                        }} size="large">
                            Add Purchase
                        </Button>) : null}
                    </Stack>
                </Stack>
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (

                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))) : (
                            <TableRow>
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
            <Stack direction="row" spacing={2} alignItems="right" justifyContent="end" sx={{ padding: 3 }}>
                <Pagination
                    count={defaultData.last_page}
                    page={page}
                    onChange={handleChangePage}
                />
            </Stack>
        </ScrollX>
    );
}

// ==============================|| ROW - DRAG & DROP ||============================== //

export default function RowDragDrop({ purchases }) {
    const { auth, ziggy } = usePage().props;
    const urlUploads = ziggy.uploads;
    const theme = useTheme();
    const mode = theme.palette.mode;

    const [open, setOpen] = useState(false);
    const [resourceDeleteId, setResourceDeleteId] = useState('');
    const [resourceDeleteTitle, setResourceDeleteTitle] = useState('');

    const [openCreateVisit, setOpenCreateVisit] = useState(false);
    const [resourceCreateVisitId, setResourceCreateVisitId] = useState('');
    const [resourceCreateVisitTitle, setResourceCreateVisitTitle] = useState('');

    const [openApproval, setOpenApproval] = useState(false);
    const [resourceApprovalId, setResourceApprovalId] = useState('');
    const [resourceApprovalTitle, setResourceApprovalTitle] = useState('');

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const handleClose = () => {
        setOpen(!open);
    };
    const handleCreateVisitClose = () => {
        setOpenCreateVisit(!openCreateVisit);
    };
    const handleApprovalClose = () => {
        setOpenApproval(!openApproval);
    };

    const defaultColumns = [
        {
            id: 'code',
            header: 'Code',
            accessorKey: 'code'
        },
        {
            id: 'purchase_date',
            header: 'Purchase date',
            accessorKey: 'purchase_date',
            cell: (props) => {
                return format(parseISO(props.getValue()), 'dd MMMM yyyy');
            }
        },
        {
            id: 'total_price',
            header: 'Total Purchase',
            accessorKey: 'total_price',
            cell: ({ row }) => {
                return formatter.format(row.original.total_price);
            }
        },
        {
            id: 'edit',
            header: 'Actions',
            cell: ({ row }) => (
                <Stack direction="row" spacing={1} alignItems="center">
                    {auth.can.purchase_edit ? (<Tooltip
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
                                router.get(route('purchases.edit', { purchase: row.original?.id }));
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>) : null}
                    {/* {auth.can.purchase_destroy ? (<Tooltip
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
                                setResourceDeleteId(Number(row.original?.id));
                                setResourceDeleteTitle(row.original?.name);
                            }}
                        >
                            <Trash />
                        </IconButton>
                    </Tooltip>) : null} */}
                </Stack>
            ),
            meta: {
                className: 'cell-center'
            }
        }
    ];

    return (

        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Purchase
                </h2>
            }
        >
            <Head title="Backoffice Purchase" />
            <MainCard title="Purchase">
                <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                    <ReactTable {...{ defaultColumns, defaultData: purchases }} />
                </DndProvider>
                <AlertPurchaseDelete id={Number(resourceDeleteId)} title={resourceDeleteTitle} open={open} handleClose={handleClose} />
            </MainCard>
        </AuthenticatedLayout>
    );
}

RowDragDrop.propTypes = { getValue: PropTypes.func };

ReactTable.propTypes = { defaultColumns: PropTypes.array, defaultData: PropTypes.array };
