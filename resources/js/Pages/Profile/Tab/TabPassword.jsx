import { useState, useRef } from 'react';

import { useForm } from '@inertiajs/react';

// material-ui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';

// project-imports
import UserProfile from '@/Pages/Profile/Edit';
import MainCard from '@/components/MainCard';
import IconButton from '@/components/@extended/IconButton';
import { Transition } from '@headlessui/react';
import { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength } from '@/utils/password-validation';

// assets
import { Eye, EyeSlash, Minus, TickCircle } from 'iconsax-react';

// ==============================|| USER PROFILE - PASSWORD CHANGE ||============================== //

export default function TabPassword() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
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
        <UserProfile>

            <MainCard title="Change Password">
                <form noValidate onSubmit={updatePassword}>
                    <Grid container spacing={3}>
                        <Grid item container spacing={3} xs={12} sm={6}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-current">Current Password</InputLabel>
                                    <OutlinedInput
                                        placeholder="Enter Current Password"
                                        ref={currentPasswordInput}
                                        id="password-current"
                                        type={showOldPassword ? 'text' : 'password'}
                                        value={data.current_password}
                                        name="current_password"
                                        onChange={(e) =>
                                            setData('current_password', e.target.value)
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowOldPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                    color="secondary"
                                                >
                                                    {showOldPassword ? <Eye /> : <EyeSlash />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        autoComplete="password-current"
                                    />
                                </Stack>
                                {errors.current_password && (
                                    <FormHelperText error id="password-current-helper">
                                        {errors.current_password}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-password">New Password</InputLabel>
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
                                    <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
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
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                                <Button variant="outlined" color="secondary">
                                    Cancel
                                </Button>
                                <Button disabled={processing} type="submit" variant="contained">
                                    Save
                                </Button>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">
                                        Saved.
                                    </p>
                                </Transition>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </MainCard>
        </UserProfile>
    );
}
