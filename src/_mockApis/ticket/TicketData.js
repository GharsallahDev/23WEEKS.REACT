import mock from '../mock';
import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';
import user4 from 'src/assets/images/profile/user-4.jpg';
import user5 from 'src/assets/images/profile/user-5.jpg';

const TicketData = [
  {
    Id: 1,
    ticketTitle: 'Experiencing severe morning sickness',
    ticketDescription:
      'I have been having severe morning sickness for the past week. Could you recommend any medications or remedies to help?',
    Status: 'Closed',
    Label: 'error',
    thumb: user1,
    AgentName: 'Kwame',
    Date: '08-02-2024',
    deleted: false,
  },
  {
    Id: 2,
    ticketTitle: 'Concern about frequent headaches',
    ticketDescription:
      'I have been getting frequent headaches lately, and I am worried it might be affecting my pregnancy. Can you provide some guidance?',
    Status: 'Pending',
    Label: 'warning',
    thumb: user2,
    AgentName: 'Amina',
    Date: '08-05-2024',
    deleted: false,
  },
  {
    Id: 3,
    ticketTitle: 'Difficulty sleeping at night',
    ticketDescription:
      'I am finding it difficult to sleep at night due to discomfort. What can I do to get better sleep during pregnancy?',
    Status: 'Open',
    Label: 'success',
    thumb: user3,
    AgentName: 'Kofi',
    Date: '08-07-2024',
    deleted: false,
  },
  {
    Id: 4,
    ticketTitle: 'Swelling in legs and feet',
    ticketDescription:
      'My legs and feet are swelling a lot. Should I be concerned, and what steps can I take to reduce the swelling?',
    Status: 'Closed',
    Label: 'error',
    thumb: user4,
    AgentName: 'Fatima',
    Date: '08-10-2024',
    deleted: false,
  },
  {
    Id: 5,
    ticketTitle: 'Concerned about baby’s movement',
    ticketDescription:
      'I am worried because I haven’t felt the baby move as much today. Should I come in for a check-up?',
    Status: 'Closed',
    Label: 'error',
    thumb: user5,
    AgentName: 'Yemi',
    Date: '08-12-2024',
    deleted: false,
  },
  {
    Id: 6,
    ticketTitle: 'Managing high blood pressure',
    ticketDescription:
      'I have been diagnosed with high blood pressure. What can I do to manage it during my pregnancy?',
    Status: 'Pending',
    Label: 'warning',
    thumb: user1,
    AgentName: 'Zainab',
    Date: '08-15-2024',
    deleted: false,
  },
  {
    Id: 7,
    ticketTitle: 'Nutrition advice during pregnancy',
    ticketDescription:
      'Can you provide me with a diet plan or advice on what foods are best to eat during my pregnancy?',
    Status: 'Open',
    Label: 'success',
    thumb: user2,
    AgentName: 'Amara',
    Date: '08-18-2024',
    deleted: false,
  },
  {
    Id: 8,
    ticketTitle: 'Back pain getting worse',
    ticketDescription:
      'I’ve been experiencing worsening back pain. Are there any exercises or treatments you recommend?',
    Status: 'Closed',
    Label: 'error',
    thumb: user3,
    AgentName: 'Chidi',
    Date: '08-20-2024',
    deleted: false,
  },
];

mock.onGet('/api/data/ticket/TicketData').reply(() => {
  return [200, TicketData];
});
export default TicketData;
