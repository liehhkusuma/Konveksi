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

import { NumericFormat } from 'react-number-format';

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import MainCard from '@/components/MainCard';
import { ThemeMode } from '@/config';
import { Transition } from '@headlessui/react';

import { Add, CloseCircle, Edit, Send, Trash } from 'iconsax-react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create({ materials: mr_materials, measurements }) {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: '',
            type: 'item',
            purchase_price: 0,
            packing_price: 0,
            other_price: 0,
            base_production_price: 0,
            exterior_production_price: 0,
            interior_production_price: 0,
            price: 0,
            img: '',
            desc: '',
            is_active: true,
            materials: [],
        });

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('products.store'));
    };

    useEffect(() => {
        let totalPrice = 0;
        data.materials.forEach((material) => {
            totalPrice += material.total_price;
        });

        if (data.base_production_price) {
            totalPrice += data.base_production_price;
        }
        if (data.exterior_production_price) {
            totalPrice += data.exterior_production_price;
        }
        if (data.interior_production_price) {
            totalPrice += data.interior_production_price;
        }
        if (data.packing_price) {
            totalPrice += data.packing_price;
        }
        if (data.other_price) {
            totalPrice += data.other_price;
        }

        setData('purchase_price', totalPrice);

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
                    Add Product
                </h2>
            }>
            <Head title="Add Product" />
            <MainCard content={false} title="Add Product" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-name" required>Name</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-name"
                                        value={data.name}
                                        name="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter Name"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.name && (
                                    <FormHelperText error id="personal-name-helper">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="is_active">Status</InputLabel>
                                <Switch
                                    edge="end"
                                    id="is_active"
                                    name="is_active"
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    checked={data.is_active ? true : false}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-is_active-2'
                                    }}
                                />
                                {errors.is_active && (
                                    <FormHelperText error id="personal-is_active-helper">
                                        {errors.is_active}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="purchase_price" required>Purchase Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="purchase_price"
                                        value={data.purchase_price}
                                        name="purchase_price"
                                        min={0}
                                        max={100}
                                        disabled
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('purchase_price', values.floatValue);
                                        }}
                                        placeholder="Enter Purchase Price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.purchase_price && (
                                    <FormHelperText error id="purchase_price-helper">
                                        {errors.purchase_price}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="packing_price" required>Packing Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="packing_price"
                                        value={data.packing_price}
                                        name="packing_price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('packing_price', values.floatValue);
                                        }}
                                        placeholder="Enter Packing Price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.packing_price && (
                                    <FormHelperText error id="packing_price-helper">
                                        {errors.packing_price}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="other_price" required>Other Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="other_price"
                                        value={data.other_price}
                                        name="other_price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('other_price', values.floatValue);
                                        }}
                                        placeholder="Enter Other Price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.other_price && (
                                    <FormHelperText error id="other_price-helper">
                                        {errors.other_price}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="base_production_price" required>Base Production Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="base_production_price"
                                        value={data.base_production_price}
                                        name="base_production_price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('base_production_price', values.floatValue);
                                        }}
                                        placeholder="Enter Base Production Price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.base_production_price && (
                                    <FormHelperText error id="base_production_price-helper">
                                        {errors.base_production_price}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="exterior_production_price" required>Exterior Production Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="exterior_production_price"
                                        value={data.exterior_production_price}
                                        name="exterior_production_price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('exterior_production_price', values.floatValue);
                                        }}
                                        placeholder="Enter Exterior Production Price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.exterior_production_price && (
                                    <FormHelperText error id="exterior_production_price-helper">
                                        {errors.exterior_production_price}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="interior_production_price" required>Interior Production Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="interior_production_price"
                                        value={data.interior_production_price}
                                        name="interior_production_price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('interior_production_price', values.floatValue);
                                        }}
                                        placeholder="Enter Interior Production Price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.interior_production_price && (
                                    <FormHelperText error id="interior_production_price-helper">
                                        {errors.interior_production_price}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel htmlFor="desc">Desc</InputLabel>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    id="desc"
                                    name="desc"
                                    placeholder="Enter desc"
                                    value={data.desc}
                                    onChange={(e) => setData('desc', e.target.value)}
                                />
                                {errors.desc && (
                                    <FormHelperText error id="personal-desc-helper">
                                        {errors.desc}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="price" required>Price</InputLabel>
                                    <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        customInput={TextField}
                                        id="price"
                                        value={data.price}
                                        name="price"
                                        min={0}
                                        max={100}
                                        InputProps={{
                                            startAdornment: 'Rp'
                                        }}
                                        onValueChange={(values) => {
                                            setData('price', values.floatValue);
                                        }}
                                        placeholder="Enter Price"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.price && (
                                    <FormHelperText error id="price-helper">
                                        {errors.price}
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
                                            <TableCell>Notes</TableCell>
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
                                                    {errors[`products.${index}.materials.${index}.price`] && (
                                                        <FormHelperText error id="product.price-helper">
                                                            {errors[`products.${index}.materials.${index}.price`]}
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
                                                <TableCell >
                                                    <TextField
                                                        id="notes"
                                                        value={material.notes}
                                                        name="notes"
                                                        minimum={1}
                                                        onChange={(e) => handleMaterialChange(index, 'notes', e.target.value)}
                                                        placeholder="Enter Notes"
                                                        autoFocus
                                                    />
                                                    {errors[`materials.${index}.notes`] && (
                                                        <FormHelperText error id="material.notes-helper">
                                                            {errors[`materials.${index}.notes`]}
                                                        </FormHelperText>
                                                    )}
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
                                                    expected_date: new Date(),
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
                            </Grid>
                        </>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href={route('products.index')}>
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
