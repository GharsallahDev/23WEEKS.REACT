import {
  Calendar,
  Activity,
  Baby,
  FileText,
  MessageCircle,
  Stethoscope,
  HeartPulse,
  Apple,
  Bell,
  UserRound,
  Clipboard,
  Pill,
  Microscope,
  ChartLine,
  BookOpen,
} from 'lucide-react';

import icon1 from 'src/assets/images/svgs/icon-account.svg';
import icon2 from 'src/assets/images/svgs/icon-inbox.svg';
import icon3 from 'src/assets/images/svgs/icon-tasks.svg';

import ddIcon1 from 'src/assets/images/svgs/icon-dd-chat.svg';
import ddIcon2 from 'src/assets/images/svgs/icon-dd-cart.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-invoice.svg';
import ddIcon4 from 'src/assets/images/svgs/icon-dd-date.svg';
import ddIcon5 from 'src/assets/images/svgs/icon-dd-mobile.svg';
import ddIcon6 from 'src/assets/images/svgs/icon-dd-lifebuoy.svg';
import ddIcon7 from 'src/assets/images/svgs/icon-dd-message-box.svg';
import ddIcon8 from 'src/assets/images/svgs/icon-dd-application.svg';

//
// Notifications dropdown
//
const notifications = [
  // Doctor notifications
  {
    icon: Calendar,
    title: 'Upcoming Appointments',
    subtitle: 'You have 3 consultations scheduled today',
    forDoctor: true,
    forPatient: false,
  },
  {
    icon: Activity,
    title: 'New Health Data Available',
    subtitle: 'Patient Sarah J. has updated her health logs',
    forDoctor: true,
    forPatient: false,
  },
  {
    icon: Stethoscope,
    title: 'Patient Request',
    subtitle: 'Emily R. has requested a consultation',
    forDoctor: true,
    forPatient: false,
  },
  {
    icon: FileText,
    title: 'Test Results Ready',
    subtitle: 'New lab results available for review',
    forDoctor: true,
    forPatient: false,
  },
  {
    icon: Bell,
    title: 'Medical Conference',
    subtitle: 'Upcoming webinar on "Advances in Prenatal Care"',
    forDoctor: true,
    forPatient: false,
  },
  {
    icon: Clipboard,
    title: 'Patient Notes Update',
    subtitle: 'You have 5 patient notes pending review',
    forDoctor: true,
    forPatient: false,
  },
  {
    icon: Microscope,
    title: 'New Research Publication',
    subtitle: 'Latest findings in maternal-fetal medicine',
    forDoctor: true,
    forPatient: false,
  },

  // Patient notifications
  {
    icon: Calendar,
    title: 'Upcoming Appointment',
    subtitle: 'Your next check-up is tomorrow at 10:00 AM',
    forDoctor: false,
    forPatient: true,
  },
  {
    icon: Baby,
    title: 'Fetal Movement Tracker',
    subtitle: "Remember to log your baby's movements today",
    forDoctor: false,
    forPatient: true,
  },
  {
    icon: MessageCircle,
    title: 'New Message',
    subtitle: 'Dr. Smith sent you a new message',
    forDoctor: false,
    forPatient: true,
  },
  {
    icon: HeartPulse,
    title: 'Elevated Blood Pressure',
    subtitle: 'Your last reading was higher than usual',
    forDoctor: false,
    forPatient: true,
  },
  {
    icon: Pill,
    title: 'Medication Reminder',
    subtitle: 'Time to take your prenatal vitamins',
    forDoctor: false,
    forPatient: true,
  },
  {
    icon: Apple,
    title: 'Nutrition Tip',
    subtitle: 'New article: "Healthy Eating in Your Third Trimester"',
    forDoctor: false,
    forPatient: true,
  },
  {
    icon: ChartLine,
    title: 'Pregnancy Progress',
    subtitle: 'View your week-by-week pregnancy timeline',
    forDoctor: false,
    forPatient: true,
  },
];

//
// Profile dropdown
//
const profile = [
  {
    href: '/pages/account-settings',
    title: 'My Profile',
    subtitle: 'Account Settings',
    icon: icon1,
  },
  {
    href: '/pages/faq',
    title: 'FAQ',
    subtitle: 'Frequently asked questions',
    icon: icon3,
  },
];

// apps dropdown

const appsLink = [
  {
    href: '/apps/chats',
    title: 'Chat Application',
    subtext: 'Messages & Emails',
    avatar: ddIcon1,
  },
  {
    href: '/apps/ecommerce/shop',
    title: 'eCommerce App',
    subtext: 'Messages & Emails',
    avatar: ddIcon2,
  },
  {
    href: '/',
    title: 'Invoice App',
    subtext: 'Messages & Emails',
    avatar: ddIcon3,
  },
  {
    href: '/apps/calendar',
    title: 'Calendar App',
    subtext: 'Messages & Emails',
    avatar: ddIcon4,
  },
  {
    href: '/apps/contacts',
    title: 'Contact Application',
    subtext: 'Account settings',
    avatar: ddIcon5,
  },
  {
    href: '/apps/tickets',
    title: 'Tickets App',
    subtext: 'Account settings',
    avatar: ddIcon6,
  },
  {
    href: '/apps/email',
    title: 'Email App',
    subtext: 'To-do and Daily tasks',
    avatar: ddIcon7,
  },
  {
    href: '/dashboards/ecommerce',
    title: 'Ecom Dashboard ',
    subtext: 'Data-genic Dashbaords',
    avatar: ddIcon8,
  },
];

const pageLinks = [
  {
    href: '/pricing',
    title: 'Pricing Page',
  },
  {
    href: '/auth/login',
    title: 'Authentication Design',
  },
  {
    href: '/auth/register',
    title: 'Register Now',
  },
  {
    href: '/404',
    title: '404 Error Page',
  },
  {
    href: '/apps/notes',
    title: 'Notes App',
  },
  {
    href: '/user-profile',
    title: 'User Application',
  },
  {
    href: '/apps/blog/posts',
    title: 'Blog Design',
  },
  {
    href: '/apps/ecommerce/eco-checkout',
    title: 'Shopping Cart',
  },
];

export { notifications, profile, pageLinks, appsLink };
