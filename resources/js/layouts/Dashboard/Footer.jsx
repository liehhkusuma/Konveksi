import { Link as RouterLink } from '@inertiajs/react';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

export default function Footer() {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auhref' }}>
            <Typography variant="caption">&copy; Namires ♥ crafted by Team</Typography>
            <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
                <Link component={RouterLink} href="" target="_blank" variant="caption" color="text.primary">
                    Home
                </Link>
                <Link
                    component={RouterLink}
                    href=""
                    target="_blank"
                    variant="caption"
                    color="text.primary"
                >
                    Contact
                </Link>
                <Link component={RouterLink} href="" target="_blank" variant="caption" color="text.primary">
                    Support
                </Link>
            </Stack>
        </Stack>
    );
}
