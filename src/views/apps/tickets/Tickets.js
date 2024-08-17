import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import TicketListing from '../../../components/apps/tickets/TicketListing';
import TicketFilter from '../../../components/apps/tickets/TicketFilter';
import ChildCard from 'src/components/shared/ChildCard';
import breadcrumbImg from 'src/assets/images/breadcrumb/gyno.png';
import {
  Box
 
} from '@mui/material';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'messages box',
  },
];

const TicketList = () => {
  return (
    <PageContainer title="Messages" description="This page displays messages from patients seeking assistance from gynecologists.">
      <Breadcrumb title="Messages" items={BCrumb} >
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="150px" />
        </Box>
      </Breadcrumb>
      <ChildCard>
        <TicketFilter />
        <TicketListing />
      </ChildCard>
    </PageContainer>
  );
};

export default TicketList;
