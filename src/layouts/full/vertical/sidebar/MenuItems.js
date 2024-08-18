import {
  IconNotes,
  IconCalendar,
  IconTicket,
  IconUserCircle,
  IconChartDonut3,
  IconHelp,
  IconWoman,
  IconBuildingHospital,
  IconMessage2,
  IconBabyCarriage,
  IconAlarm,
  IconReportMedical,
  IconCircleDotted,
  IconCone,
  IconPhoto,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Doctor Dashboard',
    icon: IconBuildingHospital,
    href: '/dashboards/doctor',
    // chip: 'New',
    chipColor: 'secondary',
    userType: 'doctor',
  },
  {
    id: uniqueId(),
    title: 'Woman Dashboard',
    icon: IconWoman,
    href: '/dashboards/woman',
    userType: 'user',
  },
  {
    navlabel: true,
    subheader: 'Artificial Intelligence',
  },
  {
    id: uniqueId(),
    title: 'Quality Enhancement',
    icon: IconPhoto,
    href: '/ultrasoud/enhance_quality',
    userType: 'doctor',
  },
  {
    id: uniqueId(),
    title: 'Entity Classification',
    icon: IconCone,
    href: '/ultrasound/entity_classification',
    userType: 'doctor',
  },
  {
    id: uniqueId(),
    title: 'Head Circumference',
    icon: IconCircleDotted,
    href: '/ultrasound/head_circumference',
    userType: 'doctor',
  },
  {
    id: uniqueId(),
    title: 'Report Generation',
    icon: IconReportMedical,
    href: '/ultrasound/report_generation',
    userType: 'doctor',
  },
  {
    id: uniqueId(),
    title: 'Chat',
    icon: IconMessage2,
    href: '/generator/chat',
    userType: 'user',
  },
  {
    id: uniqueId(),
    title: 'Baby Names Generator',
    icon: IconBabyCarriage,
    href: '/generator/names',
    userType: 'user',
  },
  {
    id: uniqueId(),
    title: 'Smart Reminders',
    icon: IconAlarm,
    href: '/generator/reminders',
    userType: 'user',
  },
  {
    navlabel: true,
    subheader: 'Apps',
  },
  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconNotes,
    href: '/apps/notes',
    userType: 'doctor',
  },
  {
    id: uniqueId(),
    title: 'Blog',
    icon: IconChartDonut3,
    href: '/apps/blog/posts',
    userType: 'user',
  },
  {
    id: uniqueId(),
    title: 'Calendar',
    icon: IconCalendar,
    href: '/apps/calendar',
  },
  {
    id: uniqueId(),
    title: 'Messages',
    icon: IconTicket,
    href: '/apps/tickets',
  },
  {
    navlabel: true,
    subheader: 'Pages',
  },
  {
    id: uniqueId(),
    title: 'Account Setting',
    icon: IconUserCircle,
    href: '/pages/account-settings',
  },
  {
    id: uniqueId(),
    title: 'FAQ',
    icon: IconHelp,
    href: '/pages/faq',
  },
];

export default Menuitems;
