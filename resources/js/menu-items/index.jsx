import {
    Box1,
    Box2,
    KeySquare,
    Layer,
    User,
    SecurityUser,
    Setting2
} from 'iconsax-react';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [
        {
            id: 'group-master-data',
            title: 'Master Data',
            type: 'group',
            children: [
                { id: 'distributors', title: 'Distributor', type: 'item', url: route('distributors.index'), pathname: 'distributors', access: 'distributor_view', icon: Box1, target: true, },
                { id: 'material', title: 'Material', type: 'item', url: route('materials.index'), pathname: 'materials', access: 'material_view', icon: Layer, target: true },
                { id: 'products', title: 'Product', type: 'item', url: route('products.index'), pathname: 'products', access: 'product_view', icon: Box1, target: true, },
                { id: 'measurement', title: 'Measurement', type: 'item', url: route('measurements.index'), pathname: 'measurements', access: 'measurement_view', icon: Box2, target: true },
                { id: 'employees', title: 'Employee', type: 'item', url: route('employees.index'), pathname: 'employees', access: 'employee_view', icon: User, target: true, },
                { id: 'sellers', title: 'Seller', type: 'item', url: route('sellers.index'), pathname: 'sellers', access: 'seller_view', icon: User, target: true, },
            ]
        },
        {
            id: 'group-transaction',
            title: 'Transaction',
            type: 'group',
            children: [
                { id: 'purchases', title: 'Purchase', type: 'item', url: route('purchases.index'), pathname: 'purchases', access: 'purchase_view', icon: Box1, target: true, },
                { id: 'sales', title: 'Sale', type: 'item', url: route('sales.index'), pathname: 'sales', access: 'sale_view', icon: Box1, target: true, },
                { id: 'production', title: 'Potongan', type: 'item', url: route('productions.index'), pathname: 'productions', access: 'production_view', icon: Box1, target: true, },
            ]
        },
        {
            id: 'group-setting',
            title: 'Setting',
            type: 'group',
            children: [
                { id: 'user-account', title: 'Management Account', type: 'item', url: route('user-accounts.index'), pathname: 'user-accounts', access: 'user_account_view', icon: SecurityUser, target: true },
                { id: 'authorization', title: 'Account Authorization', type: 'item', url: route('roles.index'), pathname: 'roles', access: 'role_view', icon: KeySquare, target: true },
                { id: 'configuration', title: 'Apps Configuration', type: 'item', url: route('configurations.index'), pathname: 'configurations', access: 'configuration_view', icon: Setting2, target: true },
            ]
        },
    ]
};

export default menuItems;
