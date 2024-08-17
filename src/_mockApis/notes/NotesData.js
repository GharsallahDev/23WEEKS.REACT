import mock from '../mock';

const NotesData = [
  {
    id: 1,
    color: 'info',
    title:
      'Patient: Jane Doe. Symptoms: Irregular menstrual cycles and abdominal pain. Diagnosis: Suspected PCOS. Treatment Plan: Schedule an ultrasound, prescribe metformin, and recommend lifestyle changes.',
    datef: '2024-08-10T09:30:00.000Z',
    deleted: false,
  },
  {
    id: 2,
    color: 'error',
    title:
      'Patient: Emily Smith. Symptoms: Severe pelvic pain and heavy bleeding. Diagnosis: Endometriosis. Treatment Plan: Laparoscopy scheduled, prescribe pain management medication, and hormonal therapy.',
    datef: '2024-08-09T11:15:00.000Z',
    deleted: false,
  },
  {
    id: 3,
    color: 'warning',
    title:
      'Patient: Sarah Johnson. Symptoms: Persistent vaginal discharge and itching. Diagnosis: Yeast infection. Treatment Plan: Prescribe antifungal medication, advise on hygiene practices, follow-up in two weeks.',
    datef: '2024-08-08T14:45:00.000Z',
    deleted: false,
  },
  {
    id: 4,
    color: 'success',
    title:
      'Patient: Lisa Brown. Symptoms: Missed period and fatigue. Diagnosis: Early pregnancy confirmed. Treatment Plan: Prenatal vitamins prescribed, schedule first trimester ultrasound, and discuss prenatal care.',
    datef: '2024-08-07T16:20:00.000Z',
    deleted: false,
  },
];

mock.onGet('/api/data/notes/NotesData').reply(() => {
  return [200, NotesData];
});

export default NotesData;
