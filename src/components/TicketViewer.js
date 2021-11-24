import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import TicketCard from './TicketCard';

const TicketViewer = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {

  }, [page])

  const tickets = [
    {
      "requester_id": 1,
      "assignee_id": 5,
      "subject": "velit eiusmod reprehenderit officia cupidatat",
      "description": "Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n\nAliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.",
      "tags": [
        "est",
        "nisi",
        "incididunt"
      ]
    },
    {
      "requester_id": 2,
      "assignee_id": 8,
      "subject": "excepteur laborum ex occaecat Lorem",
      "description": "Exercitation amet in laborum minim. Nulla et veniam laboris dolore fugiat aliqua et sit mollit. Dolor proident nulla mollit culpa in officia pariatur officia magna eu commodo duis.\n\nAliqua reprehenderit aute qui voluptate dolor deserunt enim aute tempor ad dolor fugiat. Mollit aliquip elit aliqua eiusmod. Ex et anim non exercitation consequat elit dolore excepteur. Aliqua reprehenderit non culpa sit consequat cupidatat elit.",
      "tags": [
        "labore",
        "voluptate",
        "amet"
      ]
    },
    {
      "requester_id": 3,
      "assignee_id": 10,
      "subject": "ad sunt qui aute ullamco",
      "description": "Sunt incididunt officia proident elit anim ullamco reprehenderit ut. Aliqua sint amet aliquip cillum minim magna consequat excepteur fugiat exercitation est exercitation. Adipisicing occaecat nisi aliqua exercitation.\n\nAute Lorem aute tempor sunt mollit dolor in consequat non cillum irure reprehenderit. Nulla deserunt qui aliquip officia duis incididunt et est velit nulla irure in fugiat in. Deserunt proident est in dolore culpa mollit exercitation ea anim consequat incididunt. Mollit et occaecat ullamco ut id incididunt laboris occaecat qui.",
      "tags": [
        "laborum",
        "mollit",
        "proident"
      ]
    },
    {
      "requester_id": 4,
      "assignee_id": 10,
      "subject": "aliquip mollit quis laborum incididunt",
      "description": "Pariatur voluptate laborum voluptate sunt ad magna exercitation nulla. In in Lorem minim dolor laboris reprehenderit ad Lorem. Cupidatat laborum qui mollit nostrud magna ullamco. Tempor nisi ex ipsum fugiat dolor proident qui consectetur anim sunt. Dolore consectetur in ex esse et aliqua fugiat enim Lorem ea Lorem incididunt. Non amet elit pariatur commodo labore officia esse anim. In do mollit commodo nulla ullamco culpa cillum incididunt.\n\nEt nostrud aute fugiat voluptate tempor ad labore in elit et sunt. Enim quis nulla eu ut sit. Pariatur irure officia occaecat non dolor est excepteur anim incididunt commodo ea cupidatat minim excepteur. Cillum proident tempor laborum amet est ipsum ipsum aliqua sit sunt reprehenderit fugiat aliqua ea.",
      "tags": [
        "consectetur",
        "mollit",
        "sit"
      ]
    },
    {
      "requester_id": 5,
      "assignee_id": 10,
      "subject": "nisi aliquip ipsum nostrud amet",
      "description": "Aute Lorem fugiat ad consectetur sint fugiat. Et qui ipsum in qui nostrud nulla qui et occaecat culpa ad occaecat. Aute mollit occaecat mollit proident nostrud non ea laboris adipisicing deserunt officia. Eiusmod sint fugiat veniam consectetur consequat exercitation esse est.\n\nVelit est ipsum labore aliquip quis mollit laborum in. Consectetur cillum proident ullamco exercitation pariatur. Incididunt consectetur tempor adipisicing esse minim mollit Lorem.",
      "tags": [
        "et",
        "occaecat",
        "cillum"
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Zendesk | Ticket Viewer</title>
      </Helmet>
      <Box
        sx={{
          mx: 30,
          my: 10,
          p: 5,
          minHeight: "100%"
        }}
      >
        {tickets.map((ticket) => <TicketCard ticket={ticket} />)}
      </Box>
    </>
  )
}

export default TicketViewer;
