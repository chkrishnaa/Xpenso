import {
    LuLayoutDashboard, LuHandCoins, LuWalletMinimal, LuUserRoundCog, LuLogOut, LuUser} from 'react-icons/lu';
import { FaHome } from 'react-icons/fa';

export const NAVBAR_HEIGHT=64;

export const SIDE_MENU_DATA = [
    {
        label: "Home",
        icon: FaHome,
        path: "/"
    },
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
        label: "Profile",
        icon: LuUserRoundCog,
        path: "/profile"
    }
    // ,
    // {
    //     label: "Logout",
    //     icon: LuLogOut,
    //     path: "/logout"
    // }
]
