import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
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
import { useProductionsByEmployee } from '@/hooks/useProductionsByEmployee'

import { Add, CloseCircle, Edit, Send, Trash } from 'iconsax-react';
import { TableFooter } from '@mui/material';
import { set } from 'lodash';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create({ products: mr_products, employees, colors }) {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const { data, setData, post, errors, processing, recentlySuccessful, transform } =
        useForm({
            employee_id: '',
            payroll_date: new Date(),
            notes: '',
            sub_price: 0,
            minus: 0,
            cashbon: 0,
            tip: 0,
            remains: 0,
            total_price: 0,
            products: [],
        });

    transform((data) => ({
        ...data,
        payroll_date: data.payroll_date ? format(data.payroll_date, 'yyyy-MM-dd HH:mm:ss') : null
    }));

    const { productions, loading } = useProductionsByEmployee(data.employee_id);
    const [selectedProductions, setSelectedProductions] = useState([]);

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('payrolls.store'));
    };

    useEffect(() => {
        let totalPrice = 0;
        data.products.forEach((product) => {
            totalPrice += product.total_price;
        });

        setData('sub_price', totalPrice);

        if(data.minus){
            totalPrice = totalPrice - data.minus;
        }
        if(data.cashbon){
            totalPrice = totalPrice - data.cashbon;
        }
        if(data.tip){
            totalPrice = totalPrice + data.tip;
        }

        setData('total_price', totalPrice);

    }, [data]);

    useEffect(() => {
        const selected = employees.find(employee => employee.id == data.employee_id);
        if(selected){
            setData('cashbon', selected.cashbon || 0);
        }
        console.log(selected)
        setData('products', []);
        setSelectedProductions([]);
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

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedProductions( typeof value === 'string' ? value.split(',') : value);
        const allProducts = getProductsFromSelected(value, productions);
        console.log(allProducts);
        setData('products', allProducts);

    };

    function getProductsFromSelected(selectedIds, productions) {
        return productions
            .filter(pr => selectedIds.includes(pr.id))
            .flatMap(pr => pr.products);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Payroll
                </h2>
            }>
            <Head title="Add Payroll" />
            <MainCard content={false} title="Add Payroll" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
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
                                    <InputLabel htmlFor="payroll_date" required>Payroll Date</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={data.payroll_date}
                                            // minDate={minDate}
                                            onChange={(e) => setData('payroll_date', e)}
                                            sx={{ width: 1 }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                {errors.payroll_date && (
                                    <FormHelperText error id="personal-payroll_date-helper">
                                        {errors.payroll_date}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-production" required>Production</InputLabel>
                                    <Select
                                        labelId="purchase-requests-label"
                                        multiple
                                        value={selectedProductions}
                                        onChange={handleChange}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={productions.find((o) => o.id === value)?.code ?? value} />
                                                ))}
                                            </Box>
                                        )}
                                        disabled={loading || !productions.length}
                                    >
                                        {!loading && productions.map((production) => (
                                            <MenuItem key={production.id} value={production.id}>
                                                {production.code}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Stack>
                                {errors.production && (
                                    <FormHelperText error id="personal-production-helper">
                                        {errors.production}
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
                                                        {colors.map((colorItem, indexItem) => (
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
                                                    {errors[`payrolls.${index}.products.${index}.price`] && (
                                                        <FormHelperText error id="payroll.price-helper">
                                                            {errors[`payrolls.${index}.products.${index}.price`]}
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
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
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
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <Divider />
                            {errors.products && !Array.isArray(errors?.products) && (
                                <Stack direction="row" justifyContent="center" sx={{ p: 1.5 }}>
                                    <FormHelperText error={true}>{errors.products}</FormHelperText>
                                </Stack>
                            )}
                            <Grid container justifyContent="space-between" sx={{ mt: 5 }}>
                                <Grid item xs={12} sm={6}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={18}
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
                                <Grid item xs={12} md={4}>
                                    <Grid item xs={12}>
                                        <Stack spacing={2}>
                                            <Stack spacing={0}>
                                                <InputLabel htmlFor="sub_price" required>Total</InputLabel>
                                                <NumericFormat
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    customInput={TextField}
                                                    id="sub_price"
                                                    value={data.sub_price}
                                                    name="sub_price"
                                                    min={0}
                                                    max={100}
                                                    InputProps={{
                                                        startAdornment: 'Rp'
                                                    }}
                                                    onValueChange={(values) => {
                                                        setData('sub_price', values.floatValue);
                                                    }}
                                                    placeholder="Enter Total"
                                                    autoFocus
                                                />
                                                {errors.sub_price && (
                                                    <FormHelperText error id="sub_price-helper">
                                                        {errors.sub_price}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                            <Stack spacing={0}>
                                                <InputLabel htmlFor="minus" required>Min</InputLabel>
                                                <NumericFormat
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    customInput={TextField}
                                                    id="minus"
                                                    value={data.minus}
                                                    name="minus"
                                                    min={0}
                                                    max={100}
                                                    InputProps={{
                                                        startAdornment: 'Rp'
                                                    }}
                                                    onValueChange={(values) => {
                                                        setData('minus', values.floatValue);
                                                    }}
                                                    placeholder="Enter Total"
                                                    autoFocus
                                                />

                                                {errors.minus && (
                                                    <FormHelperText error id="minus-helper">
                                                        {errors.minus}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                            <Stack spacing={0}>
                                                <InputLabel htmlFor="cashbon" required>Cashbon</InputLabel>
                                                <NumericFormat
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    customInput={TextField}
                                                    id="cashbon"
                                                    value={data.cashbon}
                                                    name="cashbon"
                                                    min={0}
                                                    max={100}
                                                    InputProps={{
                                                        startAdornment: 'Rp'
                                                    }}
                                                    onValueChange={(values) => {
                                                        setData('cashbon', values.floatValue);
                                                    }}
                                                    placeholder="Enter Total"
                                                    autoFocus
                                                />

                                                {errors.cashbon && (
                                                    <FormHelperText error id="cashbon-helper">
                                                        {errors.cashbon}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                            <Stack spacing={0}>
                                                <InputLabel htmlFor="tip" required>Tip</InputLabel>
                                                <NumericFormat
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    customInput={TextField}
                                                    id="tip"
                                                    value={data.tip}
                                                    name="tip"
                                                    min={0}
                                                    max={100}
                                                    InputProps={{
                                                        startAdornment: 'Rp'
                                                    }}
                                                    onValueChange={(values) => {
                                                        setData('tip', values.floatValue);
                                                    }}
                                                    placeholder="Enter Total"
                                                    autoFocus
                                                />

                                                {errors.tip && (
                                                    <FormHelperText error id="tip-helper">
                                                        {errors.tip}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                            <Stack spacing={0}>
                                                <InputLabel htmlFor="total_price" required>Sisa</InputLabel>
                                                <NumericFormat
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    customInput={TextField}
                                                    id="total_price"
                                                    value={data.total_price}
                                                    name="total_price"
                                                    min={0}
                                                    max={100}
                                                    InputProps={{
                                                        startAdornment: 'Rp'
                                                    }}
                                                    onValueChange={(values) => {
                                                        setData('total_price', values.floatValue);
                                                    }}
                                                    placeholder="Enter Total"
                                                    autoFocus
                                                />

                                                {errors.total_price && (
                                                    <FormHelperText error id="total_price-helper">
                                                        {errors.total_price}
                                                    </FormHelperText>
                                                )}
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
                            <Link href={route('payrolls.index')}>
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
