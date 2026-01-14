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

export default function Create({ products: mr_products, sellers }) {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const { data, setData, post, errors, processing, recentlySuccessful, transform } =
        useForm({
            seller_id: '',
            sale_date: new Date(),
            notes: '',
            sub_price: 0,
            total_price: 0,
            products: [],
        });

    transform((data) => ({
        ...data,
        sale_date: data.sale_date ? format(data.sale_date, 'yyyy-MM-dd HH:mm:ss') : null
    }));

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('sales.store'));
    };

    useEffect(() => {
        let totalPrice = 0;
        data.products.forEach((product) => {
            totalPrice += product.total_price;
        });

        setData('sub_price', totalPrice);
        setData('total_price', totalPrice);

    }, [data.products]);

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
            } else {
                newProducts[index].name = '';
            }
        }

        if (field === 'price') {
            newProducts[index].total_price = newProducts[index].price * newProducts[index].quantity;
        }
        if (field === 'quantity') {
            newProducts[index].total_price = newProducts[index].price * newProducts[index].quantity;
        }

        setData('products', newProducts);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Sale
                </h2>
            }>
            <Head title="Add Sale" />
            <MainCard content={false} title="Add Sale" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="seller_id" required>Seller</InputLabel>
                                    <Select
                                        fullWidth
                                        value={data.seller_id}
                                        name="seller_id"
                                        onChange={(e) => setData('seller_id', e.target.value)}
                                    >
                                        {sellers.map((seller, index) => (
                                            <MenuItem key={index} value={seller.id} selected={data.seller_id == seller.id}>
                                                {seller.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Stack>
                                {errors.seller_id && (
                                    <FormHelperText error id="seller_id-helper">
                                        {errors.seller_id}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="sale_date" required>Sale Date</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={data.sale_date}
                                            // minDate={minDate}
                                            onChange={(e) => setData('sale_date', e)}
                                            sx={{ width: 1 }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                {errors.sale_date && (
                                    <FormHelperText error id="personal-sale_date-helper">
                                        {errors.sale_date}
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
                                            <TableCell>Price</TableCell>
                                            <TableCell>Total</TableCell>
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
                                                        {mr_products.map((productItem, indexItem) => (
                                                            <MenuItem key={indexItem} value={productItem.name} selected={product.name == productItem.name}>
                                                                {productItem.name}
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
                                                    <NumericFormat
                                                        fullWidth
                                                        thousandSeparator="."
                                                        decimalSeparator=","
                                                        customInput={TextField}
                                                        id="product-price"
                                                        value={product.price}
                                                        name="product-price"
                                                        onValueChange={(values) => {
                                                            handleProductChange(index, 'price', values.floatValue || 0);
                                                        }}
                                                        placeholder="Enter Price"
                                                        autoFocus
                                                    />
                                                    {errors[`sales.${index}.products.${index}.price`] && (
                                                        <FormHelperText error id="sale.price-helper">
                                                            {errors[`sales.${index}.products.${index}.price`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="column" justifyContent="flex-end" spacing={2}>
                                                        <Box sx={{ pl: 2 }}>
                                                            <Typography>{formatter.format((product.total_price).toFixed(2))}</Typography>
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
                                                addProduct({
                                                    product_id: '',
                                                    color: '',
                                                    product: '',
                                                    measurement: '',
                                                    quantity: 1,
                                                    price: 0,
                                                    total_price: 0,
                                                })
                                            }
                                            variant="dashed"
                                            sx={{ bgcolor: 'transparent !important' }}
                                        >
                                            Add Product
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Grid item xs={12}>
                                        <Stack spacing={2}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="subtitle1">Grand Total:</Typography>
                                                <Typography variant="subtitle1" align="left">
                                                    {' '}
                                                    {data.total_price % 1 === 0
                                                        ? formatter.format(data.total_price)
                                                        : formatter.format(data.total_price.toFixed(2))}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href={route('sales.index')}>
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
