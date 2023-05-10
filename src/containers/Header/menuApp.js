export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },

            {
                name: 'menu.admin.manage-staff', link: '/system/manage-staff'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },

            {
                name: 'menu.staff.manage-schedule', link: '/staff/manage-schedule'
            },
        ]
    },

    { //quản lý cửa hàng
        name: 'menu.admin.shop',
        menus: [
            {
                name: 'menu.admin.manage-shop', link: '/system/manage-shop'
            },
        ]
    },

    { //quản lý liệu trình
        name: 'menu.admin.treatment',
        menus: [
            {
                name: 'menu.admin.manage-treatment', link: '/system/manage-treatment'
            },
        ]
    },

    {
        name: 'menu.staff.statistic',
        menus: [
            {
                name: 'menu.staff.statistic-revenue', link: '/staff/manage-revenue'
            }]
    }

];

export const staffMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {//quản lý kế hoạch liệu trình
                name: 'menu.staff.manage-schedule', link: '/staff/manage-schedule'
            },

            {//quản lý khách hàng liệu trình của nhân viên
                name: 'menu.staff.manage-customer', link: '/staff/manage-customer'
            },
        ],

    },

    {
        name: 'menu.staff.statistic',
        menus: [
            {
                name: 'menu.staff.statistic-revenue', link: '/staff/manage-revenue'
            }]
    }
];