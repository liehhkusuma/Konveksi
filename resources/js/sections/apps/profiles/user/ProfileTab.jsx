import { useEffect, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

// material-ui
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// assets
import { CardCoin, Lock, Profile, Setting3 } from 'iconsax-react';

function getPathIndex(pathname) {
    let selectedTab = 0;
    switch (pathname) {
        case 'profile/password':
            selectedTab = 1;
            break;
        case 'profile/setting':
            selectedTab = 2;
            break;
        case 'profile/personal':
        default:
            selectedTab = 0;
    }
    return selectedTab;
}

// ==============================|| USER PROFILE - BASIC ||============================== //

export default function ProfileTab() {
    const { pathname } = usePage().props.ziggy;
    const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
    const handleListItemClick = (index, route) => {
        setSelectedIndex(index);
        if (route != '') {
            router.visit(route, { method: 'get' })
        }
    };

    useEffect(() => {
        setSelectedIndex(getPathIndex(pathname));
    }, [pathname]);

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: 'secondary.main' } }}>
            <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/profile/personal')}>
                <ListItemIcon>
                    <Profile size={18} />
                </ListItemIcon>
                <ListItemText primary="Personal Information" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, '/profile/password')}>
                <ListItemIcon>
                    <Lock size={18} />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
            </ListItemButton>
            {/* <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2, '')}>
                <ListItemIcon>
                    <Setting3 size={18} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItemButton> */}
        </List>
    );
}
