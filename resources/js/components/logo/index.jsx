import PropTypes from 'prop-types';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

// project-imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import { Link, usePage } from '@inertiajs/react';

import { APP_DEFAULT_PATH } from '@/config';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ isIcon, sx, to }) {
    const isLoggedIn = usePage().props.auth;

    return (
        <ButtonBase disableRipple {...(isLoggedIn && { component: Link, href: APP_DEFAULT_PATH, sx })}>
            {/* {isIcon ? <LogoIcon /> : <Logo />} */}
            <Typography color="secondary">Convection</Typography>
        </ButtonBase>
    );
}

LogoSection.propTypes = { isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
