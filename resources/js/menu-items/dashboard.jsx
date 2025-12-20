// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2 } from 'iconsax-react';

// type

// icons
const icons = {
    dashboard: DocumentCode2
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    url: '/dashboard',
    icon: icons.dashboard
};

export default dashboard;
