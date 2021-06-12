export default interface Meeting {
    id: number;
    link: string;
    message: string;
    name: string;
    notified_contacts: NotifiedContacts;
    start_date_time: string;
  };

interface NotifiedContacts extends Array<number>{}