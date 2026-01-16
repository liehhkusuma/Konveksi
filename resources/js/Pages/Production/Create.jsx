import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { NumericFormat } from 'react-number-format';

// project-imports
import { parseISO, format } from 'date-fns';
import AuthenticatedLayout from '@/layouts/Dashboard';
import MainCard from '@/components/MainCard';
import { ThemeMode } from '@/config';
import { Transition } from '@headlessui/react';

import { Add, CloseCircle, Edit, Send, Trash } from 'iconsax-react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create({ products: mr_products, employees }) {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const { data, setData, post, errors, processing, recentlySuccessful, transform } =
        useForm({
            employee_id: '',
            production_date: new Date(),
            notes: '',
            status: 'progress',
            sub_price: 0,
            total_price: 0,
            products: [],
        });

    transform((data) => ({
        ...data,
        production_date: data.production_date ? format(data.production_date, 'yyyy-MM-dd HH:mm:ss') : null,
    }));

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const newProductTemplate  = {
        product_id: '',
        product: '',
        color: '',
        colors: [],
        quantity: 1,
        complete_quantity: 0,
        complete_date: null,
        price: 0,
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('productions.store'));
    };

    useEffect(() => {
        let totalPrice = 0;
        data.products.forEach((product) => {
            totalPrice += product.total_price;
        });

        setData('sub_price', totalPrice);
        setData('total_price', totalPrice);

    }, [data.products]);

    useEffect(() => {
        setData('products', []);
    }, [data.employee_id]);

    const addProduct = (product) => {
        setData('products', [...data.products, product]);
    }

    const removeProduct = (index) => {
        const newProducts = [...data.products];
        newProducts.splice(index, 1);
        setData('products', newProducts);
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...data.products];
        newProducts[index][field] = value;


        if (field === 'product_id') {
            const selected = mr_products.find(product => product.id == value);
            if (selected) {
                newProducts[index].product = selected.name;
                newProducts[index].colors = selected?.colors || [];
                newProducts[index].price = selected.price;
                newProducts[index].total_price = selected.price * newProducts[index].complete_quantity;
                const selectedEmployee = employees.find(employee => employee.id == data.employee_id);
                if(selectedEmployee){
                    newProducts[index].price = selectedEmployee?.type === 'external' ? selected.external_production_price : selected.internal_production_price;
                }
            } else {
                newProducts[index].product = '';
            }
        }

        if (field === 'price') {
            newProducts[index].total_price = newProducts[index].price * newProducts[index].complete_quantity;
        }
        if (field === 'complete_quantity') {
            newProducts[index].total_price = newProducts[index].price * newProducts[index].complete_quantity;
        }

        setData('products', newProducts);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Production
                </h2>
            }>
            <Head title="Add Production" />
            <MainCard content={false} title="Add Production" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="employee_id" required>Employee</InputLabel>
                                    <Select
                                        fullWidth
                                        value={data.employee_id}
                                        name="employee_id"
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                    >
                                        {employees.map((employee, index) => (
                                            <MenuItem key={index} value={employee.id} selected={data.employee_id == employee.id}>
                                                {employee.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Stack>
                                {errors.employee_id && (
                                    <FormHelperText error id="employee_id-helper">
                                        {errors.employee_id}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="production_date" required>Production Date</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={data.production_date}
                                            // minDate={minDate}
                                            onChange={(e) => setData('production_date', e)}
                                            sx={{ width: 1 }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                {errors.production_date && (
                                    <FormHelperText error id="personal-production_date-helper">
                                        {errors.production_date}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="notes">Notes</InputLabel>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    id="notes"
                                    name="notes"
                                    placeholder="Enter notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                />
                                {errors.notes && (
                                    <FormHelperText error id="personal-notes-helper">
                                        {errors.notes}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="status">Status</InputLabel>
                                    <Select
                                        fullWidth
                                        value={data.status}
                                        name="status"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <MenuItem value="progress">Progress</MenuItem>
                                        <MenuItem value="complete">Complete</MenuItem>
                                        <MenuItem value="paid">Paid</MenuItem>
                                    </Select>
                                </Stack>
                                {errors.status && (
                                    <FormHelperText error id="personal-status-helper">
                                        {errors.status}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Color</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Complete</TableCell>
                                            <TableCell>Complete Date</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.products?.map((product, index) => (
                                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={index}>
                                                <TableCell>{data.products.indexOf(product) + 1}</TableCell>
                                                <TableCell >
                                                    <Select
                                                        fullWidth
                                                        value={product.product_id}
                                                        name="product_id"
                                                        onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
                                                    >
                                                        {mr_products.map((productItem, indexIten) => (
                                                            <MenuItem key={indexIten} value={productItem.id} selected={product.product_id == productItem.id}>
                                                                {productItem.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors[`products.${index}.product_id`] && (
                                                        <FormHelperText error id="product.product_id-helper">
                                                            {errors[`products.${index}.product_id`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell >
                                                    <Select
                                                        fullWidth
                                                        value={product.color}
                                                        name="color"
                                                        onChange={(e) => handleProductChange(index, 'color', e.target.value)}
                                                    >
                                                        {product.colors.map((colorItem, indexItem) => (
                                                            <MenuItem key={indexItem} value={colorItem} selected={product.color == colorItem}>
                                                                {colorItem}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors[`products.${index}.color`] && (
                                                        <FormHelperText error id="product.color-helper">
                                                            {errors[`products.${index}.color`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell >
                                                    <TextField
                                                        type="number"
                                                        id="quantity"
                                                        value={product.quantity}
                                                        name="quantity"
                                                        minimum={1}
                                                        onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                                        placeholder="Enter Quantity"
                                                        autoFocus
                                                    />
                                                    {errors[`products.${index}.quantity`] && (
                                                        <FormHelperText error id="product.quantity-helper">
                                                            {errors[`products.${index}.quantity`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell >
                                                    <TextField
                                                        type="number"
                                                        id="complete_quantity"
                                                        value={product.complete_quantity}
                                                        name="complete_quantity"
                                                        minimum={1}
                                                        onChange={(e) => handleProductChange(index, 'complete_quantity', e.target.value)}
                                                        placeholder="Enter Complete Quantity"
                                                        autoFocus
                                                    />
                                                    {errors[`products.${index}.complete_quantity`] && (
                                                        <FormHelperText error id="product.complete_quantity-helper">
                                                            {errors[`products.${index}.complete_quantity`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell >
                                                    <Stack spacing={1}>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <DatePicker
                                                                value={product.complete_date}
                                                                // minDate={minDate}
                                                                onChange={(e) => handleProductChange(index, 'complete_date', e)}
                                                                sx={{ width: 1 }}
                                                            />
                                                        </LocalizationProvider>
                                                    </Stack>

                                                    {errors[`products.${index}.complete_date`] && (
                                                        <FormHelperText error id="product.complete_date-helper">
                                                            {errors[`products.${index}.complete_date`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="column" justifyContent="flex-end" spacing={2}>
                                                        <Box sx={{ pl: 2 }}>
                                                            <Typography>{formatter.format((product.total_price||0).toFixed(2))}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {data.products.length > 1 ? (
                                                        <Tooltip
                                                            componentsProps={{
                                                                tooltip: {
                                                                    sx: {
                                                                        backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                                                                        opacity: 0.9
                                                                    }
                                                                }
                                                            }}
                                                            title="Remove Product"
                                                        >
                                                            <Button color="error" onClick={() => removeProduct(index)}>
                                                                <Trash />
                                                            </Button>
                                                        </Tooltip>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider />
                            {errors.products && !Array.isArray(errors?.products) && (
                                <Stack direction="row" justifyContent="center" sx={{ p: 1.5 }}>
                                    <FormHelperText error={true}>{errors.products}</FormHelperText>
                                </Stack>
                            )}
                            <Grid container justifyContent="space-between" sx={{ mt: 5 }}>
                                <Grid item xs={12} md={8}>
                                    <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
                                        <Button
                                            color="primary"
                                            startIcon={<Add />}
                                            onClick={() =>
                                                addProduct(newProductTemplate)
                                            }
                                            variant="dashed"
                                            sx={{ bgcolor: 'transparent !important' }}
                                        >
                                            Add Product
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href={route('productions.index')}>
                                <Button variant="outlined" color="secondary">
                                    Back
                                </Button>
                            </Link>
                            <Button disabled={processing} type="submit" variant="contained">
                                Create
                            </Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">
                                    Created.
                                </p>
                            </Transition>
                        </Stack>
                    </Box>
                </form>
            </MainCard>
        </AuthenticatedLayout>
    );
}
