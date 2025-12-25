import { Head, Link, useForm, usePage } from '@inertiajs/react';

// meterial-ui
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

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import MainCard from '@/components/MainCard';
import { ThemeMode } from '@/config';
import { Transition } from '@headlessui/react';

import { Add, CloseCircle, Edit, Send, Trash } from 'iconsax-react';

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create() {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: '',
            store: '',
            phone: '',
            address: '',
            is_active: true,
            members: [],
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('distributors.store'));
    };

    const addMember = (member) => {
        setData('members', [...data.members, member]);
    }

    const removeMember = (index) => {
        const newMembers = [...data.members];
        newMembers.splice(index, 1);
        setData('members', newMembers);
    };

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...data.members];
        newMembers[index][field] = value;

        setData('members', newMembers);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Distributor
                </h2>
            }>
            <Head title="Add Distributor" />
            <MainCard content={false} title="Add Distributor" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-store">Store</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-store"
                                        value={data.store}
                                        name="store"
                                        onChange={(e) => setData('store', e.target.value)}
                                        placeholder="Enter Store"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.store && (
                                    <FormHelperText error id="personal-store-helper">
                                        {errors.store}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-first-name" required>Name</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-first-name"
                                        value={data.name}
                                        name="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter Name"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.name && (
                                    <FormHelperText error id="personal-first-name-helper">
                                        {errors.name}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-phone" required>Phone</InputLabel>
                                    <TextField
                                        fullWidth
                                        id="personal-phone"
                                        value={data.phone}
                                        name="phone"
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="Enter Phone"
                                        autoFocus
                                    />
                                </Stack>
                                {errors.phone && (
                                    <FormHelperText error id="personal-phone-helper">
                                        {errors.phone}
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
                                <InputLabel htmlFor="address">Address</InputLabel>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    id="address"
                                    name="address"
                                    placeholder="Enter address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                {errors.address && (
                                    <FormHelperText error id="personal-address-helper">
                                        {errors.address}
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
                                            <TableCell>Name</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.members?.map((member, index) => (
                                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={index}>
                                                <TableCell>{data.members.indexOf(member) + 1}</TableCell>
                                                <TableCell >
                                                    <TextField
                                                        id="name"
                                                        value={member.name}
                                                        name="name"
                                                        minimum={1}
                                                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                                        placeholder="Enter Name"
                                                        autoFocus
                                                    />
                                                    {errors[`members.${index}.name`] && (
                                                        <FormHelperText error id="member.name-helper">
                                                            {errors[`members.${index}.name`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell >
                                                    <TextField
                                                        type="number"
                                                        id="phone"
                                                        value={member.phone}
                                                        name="phone"
                                                        minimum={1}
                                                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                                        placeholder="Enter Phone"
                                                        autoFocus
                                                    />
                                                    {errors[`members.${index}.phone`] && (
                                                        <FormHelperText error id="member.phone-helper">
                                                            {errors[`members.${index}.phone`]}
                                                        </FormHelperText>
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {data.members.length > 1 ? (
                                                        <Tooltip
                                                            componentsProps={{
                                                                tooltip: {
                                                                    sx: {
                                                                        backgroundColor: mode === ThemeMode.DARK ? theme.palette.grey[50] : theme.palette.grey[700],
                                                                        opacity: 0.9
                                                                    }
                                                                }
                                                            }}
                                                            title="Remove Member"
                                                        >
                                                            <Button color="error" onClick={() => removeMember(index)}>
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
                            {errors.members && !Array.isArray(errors?.members) && (
                                <Stack direction="row" justifyContent="center" sx={{ p: 1.5 }}>
                                    <FormHelperText error={true}>{errors.members}</FormHelperText>
                                </Stack>
                            )}
                            <Grid container justifyContent="space-between" sx={{ mt: 5 }}>
                                <Grid item xs={12} md={8}>
                                    <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
                                        <Button
                                            color="primary"
                                            startIcon={<Add />}
                                            onClick={() =>
                                                addMember({
                                                    member_id: '',
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
                                            Add Member
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href={route('distributors.index')}>
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
