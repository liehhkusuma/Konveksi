import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';

// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party

// project-imports
import AuthenticatedLayout from '@/layouts/Dashboard';
import IconButton from '@/components/@extended/IconButton';
import MainCard from '@/components/MainCard';
import { Transition } from '@headlessui/react';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from '@/utils/password-validation';

// assets
import { Add, Eye, EyeSlash, Minus, TickCircle } from 'iconsax-react';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = { PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP } } };

const skills = [
    'Adobe XD',
    'After Effect',
    'Angular',
    'Animation',
    'ASP.Net',
    'Bootstrap',
    'C#',
    'CC',
    'Corel Draw',
    'CSS',
    'DIV',
    'Dreamweaver',
    'Figma',
    'Graphics',
    'HTML',
    'Illustrator',
    'J2Ee',
    'Java',
    'Javascript',
    'JQuery',
    'Logo Design',
    'Material UI',
    'Motion',
    'MVC',
    'MySQL',
    'NodeJS',
    'npm',
    'Photoshop',
    'PHP',
    'React',
    'Redux',
    'Reduxjs & tooltit',
    'SASS',
    'SCSS',
    'SQL Server',
    'SVG',
    'UI/UX',
    'User Interface Designing',
    'Wordpress'
];

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function Create({ roles }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: '',
            email: '',
            is_active: true,
            current_password: '',
            password: '',
            password_confirmation: '',
            role_id: '',
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('user-accounts.store'));
    };

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Account
                </h2>
            }>
            <Head title="Add Account" />
            <MainCard content={false} title="Add Account" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
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
                                    <InputLabel htmlFor="role_id" required>Role</InputLabel>
                                    <Grid container columnSpacing={1}>
                                        <Grid item xs={10} sm={10}>
                                            <Select
                                                fullWidth
                                                value={data.role_id}
                                                name="role_id"
                                                onChange={(e) => setData('role_id', e.target.value)}
                                            >
                                                {roles.map((role, index) => (
                                                    <MenuItem key={index} value={role.id} selected={data.role_id == role.id}>
                                                        {role.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                        <Grid item xs={2} sm={2}>
                                            <Button sx={{ height: '100%' }} variant="outlined" target='_blank' onClick={(e) => {
                                                e.preventDefault();
                                                window.open(route('roles.create'));
                                            }} size='large'><Add /></Button>
                                        </Grid>
                                    </Grid>
                                </Stack>
                                {errors.role_id && (
                                    <FormHelperText error id="personal-role_id-helper">
                                        {errors.role_id}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="personal-email" required>Email Address</InputLabel>
                                    <TextField
                                        type="email"
                                        fullWidth
                                        value={data.email}
                                        name="email"
                                        onChange={(e) => setData('email', e.target.value)}
                                        id="personal-email"
                                        placeholder="Enter Email Address"
                                    />
                                </Stack>
                                {errors.email && (
                                    <FormHelperText error id="personal-email-helper">
                                        {errors.email}
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
                        </Grid>
                    </Box>
                    <Box sx={{ p: 2.5 }}>

                        <Grid container spacing={3}>

                            <Grid item container spacing={3} xs={12} sm={6}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-password" required>Password</InputLabel>
                                        <OutlinedInput
                                            placeholder="Enter New Password"
                                            id="password-password"
                                            ref={passwordInput}
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={data.password}
                                            name="password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowNewPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                        color="secondary"
                                                    >
                                                        {showNewPassword ? <Eye /> : <EyeSlash />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            autoComplete="password-password"
                                        />
                                    </Stack>
                                    {errors.password && (
                                        <FormHelperText error id="password-password-helper">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-confirm" required>Confirm Password</InputLabel>
                                        <OutlinedInput
                                            placeholder="Enter Confirm Password"
                                            id="password-confirm"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={data.password_confirmation}
                                            name="password_confirmation"
                                            onChange={(e) =>
                                                setData('password_confirmation', e.target.value)
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                        color="secondary"
                                                    >
                                                        {showConfirmPassword ? <Eye /> : <EyeSlash />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            autoComplete="password-confirm"
                                        />
                                    </Stack>
                                    {errors.password_confirmation && (
                                        <FormHelperText error id="password-confirm-helper">
                                            {errors.password_confirmation}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ p: { xs: 0, sm: 2, md: 4, lg: 5 } }}>
                                    <Typography variant="h5">New password must contain:</Typography>
                                    <List sx={{ p: 0, mt: 1 }}>
                                        <ListItem divider>
                                            <ListItemIcon sx={{ color: minLength(data.password) ? 'success.main' : 'inherit' }}>
                                                {minLength(data.password) ? <TickCircle /> : <Minus />}
                                            </ListItemIcon>
                                            <ListItemText primary="At least 8 characters" />
                                        </ListItem>
                                        <ListItem divider>
                                            <ListItemIcon sx={{ color: isLowercaseChar(data.password) ? 'success.main' : 'inherit' }}>
                                                {isLowercaseChar(data.password) ? <TickCircle /> : <Minus />}
                                            </ListItemIcon>
                                            <ListItemText primary="At least 1 lower letter (a-z)" />
                                        </ListItem>
                                        <ListItem divider>
                                            <ListItemIcon sx={{ color: isUppercaseChar(data.password) ? 'success.main' : 'inherit' }}>
                                                {isUppercaseChar(data.password) ? <TickCircle /> : <Minus />}
                                            </ListItemIcon>
                                            <ListItemText primary="At least 1 uppercase letter (A-Z)" />
                                        </ListItem>
                                        <ListItem divider>
                                            <ListItemIcon sx={{ color: isNumber(data.password) ? 'success.main' : 'inherit' }}>
                                                {isNumber(data.password) ? <TickCircle /> : <Minus />}
                                            </ListItemIcon>
                                            <ListItemText primary="At least 1 number (0-9)" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon sx={{ color: isSpecialChar(data.password) ? 'success.main' : 'inherit' }}>
                                                {isSpecialChar(data.password) ? <TickCircle /> : <Minus />}
                                            </ListItemIcon>
                                            <ListItemText primary="At least 1 special characters" />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                            <Link href="/user-accounts">
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
