const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

const Events = [
  {
    title: 'Surgery: Laparoscopic Hysterectomy - Patient: Jane Doe',
    allDay: true,
    start: new Date(y, m, d + 2), // Surgery scheduled two days from today
    end: new Date(y, m, d + 2),
    color: 'red',
  },
  {
    title: 'Prenatal Checkup - Patient: Emily Smith',
    start: new Date(y, m, d + 3, 10, 0), // Checkup scheduled three days from today
    end: new Date(y, m, d + 3, 11, 0),
    allDay: false,
    color: 'green',
  },
  {
    title: 'Ultrasound - Patient: Sarah Johnson',
    start: new Date(y, m, d + 4, 14, 30), // Ultrasound scheduled four days from today
    end: new Date(y, m, d + 4, 15, 30),
    allDay: false,
    color: 'blue',
  },
  {
    title: 'Postpartum Follow-up - Patient: Lisa Brown',
    start: new Date(y, m, d + 1, 9, 0), // Follow-up scheduled one day from today
    end: new Date(y, m, d + 1, 10, 0),
    allDay: false,
    color: 'azure',
  },
  {
    title: 'Administrative Meeting',
    start: new Date(y, m, d + 7, 12, 0), // Meeting scheduled seven days from today
    end: new Date(y, m, d + 7, 13, 0),
    allDay: false,
    color: 'orange',
  },
  {
    title: 'Patient Consultation: Annual Exam - Patient: Anne Baker',
    start: new Date(y, m, d - 1, 16, 0), // Consultation scheduled one day ago
    end: new Date(y, m, d - 1, 17, 0),
    allDay: false,
    color: 'purple',
  },
  {
    title: 'Research Presentation on New Gynecological Procedures',
    start: new Date(y, m, d + 10, 14, 0), // Presentation scheduled ten days from today
    end: new Date(y, m, d + 10, 16, 0),
    color: 'default',
  },
];

export default Events;
