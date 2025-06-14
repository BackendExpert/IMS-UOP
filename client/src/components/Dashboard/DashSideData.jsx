import { MdDashboard, MdAdminPanelSettings, MdContactEmergency, MdBedroomParent } from "react-icons/md";
import { FaSchool, FaUserGraduate, FaGear, FaUsers, FaUserLock, FaHouseUser } from "react-icons/fa6";
import { FaClipboardList, FaChalkboardTeacher, FaEnvelopeOpenText, FaUserFriends, FaCalendarCheck, FaProjectDiagram, FaIdBadge } from "react-icons/fa";

const dashsidedata = [
    {
        id: 1,
        name: 'Dashboard',
        link: '/Dashboard/Home',
        icon: MdDashboard
    },
    {
        id: 2,
        name: 'Manage Interns',
        link: '/Dashboard/ManageInterns',
        icon: FaUserGraduate
    },
    {
        id: 3,
        name: 'Manage Supervisor',
        link: '/Dashboard/ManageSupervisor',
        icon: FaChalkboardTeacher
    },
    {
        id: 4,
        name: 'Projects',
        link: '/Dashboard/Projects',
        icon: FaProjectDiagram
    },
    {
        id: 5,
        name: 'Attendance',
        link: '/Dashboard/Attendance',
        icon: FaCalendarCheck
    },
    // {
    //     id: 6,
    //     name: 'Letters',
    //     link: '/Dashboard/Letters',
    //     icon: FaEnvelopeOpenText
    // },

    // supervisor
    {
        id: 8,
        name: 'My Interns',
        link: '/Dashboard/MyInterns',
        icon: FaUserFriends
    },

    // Intern
    // {
    //     id: 9,
    //     name: 'My Letters',
    //     link: '/Dashboard/MyLetters',
    //     icon: FaEnvelopeOpenText
    // },

    // Supervisor
    {
        id: 10,
        name: 'Supervisor Projects',
        link: '/Dashboard/SupervisorProjects',
        icon: FaProjectDiagram
    },

    // Intern
    {
        id: 11,
        name: 'My Projects',
        link: '/Dashboard/MyProjects',
        icon: FaClipboardList
    },

    {
        id: 12,
        name: 'Interns Attendance',
        link: '/Dashboard/InternsAttendance',
        icon: FaCalendarCheck
    },

    {
        id: 13,
        name: 'My Attendance',
        link: '/Dashboard/MyAttendance',
        icon: FaIdBadge
    },
    {
        id: 14,
        name: 'Profile',
        link: '/Dashboard/Profile',
        icon: FaGear,
    },
    {
        id: 15,
        name: 'Permission',
        link: '/Dashboard/Permissions',
        icon: FaUserLock
    },
    {
        id: 16,
        name: 'Users',
        link: '/Dashboard/Users',
        icon: FaUsers
    },
];

export { dashsidedata };
