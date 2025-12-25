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

export default function Create({ materials: mr_materials, measurements, distributors }) {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const { data, setData, post, errors, processing, recentlySuccessful, transform } =
        useForm({
            distributor_id: '',
            purchase_date: new Date(),
            notes: '',
            total_price: 0,
            materials: [],
        });

    transform((data) => ({
        ...data,
        purchase_date: data.purchase_date ? format(data.purchase_date, 'yyyy-MM-dd HH:mm:ss') : null
    }));

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('purchases.store'));
    };

    useEffect(() => {
        let totalPrice = 0;
        data.materials.forEach((material) => {
            totalPrice += material.total_price;
        });

        setData('total_price', totalPrice);

    }, [data]);

    const addMaterial = (material) => {
        setData('materials', [...data.materials, material]);
    }

    const removeMaterial = (index) => {
        const newMaterials = [...data.materials];
        newMaterials.splice(index, 1);
        setData('materials', newMaterials);
    };

    const handleMaterialChange = (index, field, value) => {
        const newMaterials = [...data.materials];
        newMaterials[index][field] = value;


        if (field === 'material_id') {
            const selected = mr_materials.find(material => material.id == value);
            if (selected) {
                newMaterials[index].material = selected.name;
                newMaterials[index].measurement_id = selected.measurement_id;
                const measurement = measurements.find(measurement => measurement.id == selected.measurement_id);
                if (measurement) {
                    newMaterials[index].measurement = measurement.name;
                } else {
                    newMaterials[index].measurement = '';
                }
            } else {
                newMaterials[index].name = '';
            }
        }
        // Auto fill measurement
        if (field === 'measurement_id') {
            const selected = measurements.find(measurement => measurement.id == value);
            if (selected) {
                newMaterials[index].measurement = selected.name;
            } else {
                newMaterials[index].measurement = '';
            }
        }

        if (field === 'price') {
            newMaterials[index].total_price = newMaterials[index].price * newMaterials[index].quantity;
        }
        if (field === 'quantity') {
            newMaterials[index].total_price = newMaterials[index].price * newMaterials[index].quantity;
        }

        setData('materials', newMaterials);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Purchase
                </h2>
            }>
            <Head title="Add Purchase" />
            <MainCard content={false} title="Add Purchase" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={0}>
                                    <InputLabel htmlFor="distributor_id" required>Distributor</InputLabel>
                                    <Select
                                        fullWidth
                                        value={data.distributor_id}
                                        name="distributor_id"
                                        onChange={(e) => setData('distributor_id', e.target.value)}
                                    >
                                        {distributors.map((distributor, index) => (
                                            <MenuItem key={index} value={distributor.id} selected={data.distributor_id == distributor.id}>
                                                {distributor.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Stack>
                                {errors.distributor_id && (
                                    <FormHelperText error id="distributor_id-helper">
                                        {errors.distributor_id}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="purchase_date" required>Purchase Date</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={data.purchase_date}
                                            // minDate={minDate}
                                            onChange={(e) => setData('purchase_date', e)}
                                            sx={{ width: 1 }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                {errors.purchase_date && (
                                    <FormHelperText error id="personal-purchase_date-helper">
                                        {errors.purchase_date}
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
                                            <TableCell>Material</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Mesurement</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Total</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.materials?.map((material, index) => (
                                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={index}>
                                                <TableCell>{data.materials.indexOf(material) + 1}</TableCell>
                                                <TableCell >
                                                    <Select
                                                        fullWidth
                                                        value={material.material_id}
                                                        name="material_id"
                                                        onChange={(e) => handleMaterialChange(index, 'material_id', e.target.value)}
                                                    >
                                                        {mr_materials.map((materialItem, indexIten) => (
                                                            <MenuItem key={indexIten} value={materialItem.id} selected={material.material_id == materialItem.id}>
                                                                {materialItem.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors[`materials.${index}.material_id`] && (
                                                        <FormHelperText error id="material.material_id-helper">
                                                            {errors[`materials.${index}.material_id`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell >
                                                    <TextField
                                                        type="number"
                                                        id="quantity"
                                                        value={material.quantity}
                                                        name="quantity"
                                                        minimum={1}
                                                        onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                                                        placeholder="Enter Quantity"
                                                        autoFocus
                                                    />
                                                    {errors[`materials.${index}.quantity`] && (
                                                        <FormHelperText error id="material.quantity-helper">
                                                            {errors[`materials.${index}.quantity`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell><TableCell >
                                                    <Select
                                                        fullWidth
                                                        value={material.measurement_id}
                                                        name="measurement_id"
                                                        onChange={(e) => handleMaterialChange(index, 'measurement_id', e.target.value)}
                                                    >
                                                        {measurements.map((measurementItem, indexItem) => (
                                                            <MenuItem key={indexItem} value={measurementItem.id} selected={material.measurement_id == measurementItem.id}>
                                                                {measurementItem.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors[`materials.${index}.measurement_id`] && (
                                                        <FormHelperText error id="material.measurement_id-helper">
                                                            {errors[`materials.${index}.measurement_id`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>

                                                <TableCell >
                                                    <NumericFormat
                                                        fullWidth
                                                        thousandSeparator="."
                                                        decimalSeparator=","
                                                        customInput={TextField}
                                                        id="material-price"
                                                        value={material.price}
                                                        name="material-price"
                                                        onValueChange={(values) => {
                                                            handleMaterialChange(index, 'price', values.floatValue || 0);
                                                        }}
                                                        placeholder="Enter Price"
                                                        autoFocus
                                                    />
                                                    {errors[`purchases.${index}.materials.${index}.price`] && (
                                                        <FormHelperText error id="purchase.price-helper">
                                                            {errors[`purchases.${index}.materials.${index}.price`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="column" justifyContent="flex-end" spacing={2}>
                                                        <Box sx={{ pl: 2 }}>
                                                            <Typography>{formatter.format((material.total_price).toFixed(2))}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {data.materials.length > 1 ? (
                                                        <Tooltip
                                                            componentsProps={{
                                                                tooltip: {
                                                                    sx: {
                                                                        backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                                                                        opacity: 0.9
                                                                    }
                                                                }
                                                            }}
                                                            title="Remove Material"
                                                        >
                                                            <Button color="error" onClick={() => removeMaterial(index)}>
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
                            {errors.materials && !Array.isArray(errors?.materials) && (
                                <Stack direction="row" justifyContent="center" sx={{ p: 1.5 }}>
                                    <FormHelperText error={true}>{errors.materials}</FormHelperText>
                                </Stack>
                            )}
                            <Grid container justifyContent="space-between" sx={{ mt: 5 }}>
                                <Grid item xs={12} md={8}>
                                    <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
                                        <Button
                                            color="primary"
                                            startIcon={<Add />}
                                            onClick={() =>
                                                addMaterial({
                                                    material_id: '',
                                                    measurement_id: '',
                                                    material: '',
                                                    measurement: '',
                                                    quantity: 1,
                                                    price: 0,
                                                    total_price: 0,
                                                })
                                            }
                                            variant="dashed"
                                            sx={{ bgcolor: 'transparent !important' }}
                                        >
                                            Add Material
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
                            <Link href={route('purchases.index')}>
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
