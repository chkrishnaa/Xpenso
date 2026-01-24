import {
    LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuLogOut} from 'react-icons/lu';

export const NAVBAR_HEIGHT=55;

export const SIDE_MENU_DATA = [
    {
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },
    {
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income"
    },
    {
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        label: "Logout",
        icon: LuLogOut,
        path: "/logout"
    }
]
