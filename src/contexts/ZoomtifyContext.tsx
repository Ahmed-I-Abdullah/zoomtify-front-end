import React, { useState } from "react";
import Contact from "../models/Contact";
import Meeting from "../models/Meeting";
import clientInstance from "../httpClient";

interface IZoomtifyContext {
  meetings: null | Meeting[];
  setMeetings: React.Dispatch<React.SetStateAction<null | Meeting[]>>;
  contacts: null | Contact[];
  setContacts: React.Dispatch<React.SetStateAction<null | Contact[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchMeetings: () => void;
  fetchContacts: () => void;
}

const ZoomtifyContext = React.createContext<IZoomtifyContext>({
  meetings: null,
  setMeetings: () => {},
  contacts: null,
  setContacts: () => {},
  loading: false,
  setLoading: () => {},
  fetchMeetings: () => {},
  fetchContacts: () => {},
});

const API_URL = process.env.REACT_APP_API_URL;

export const ZoomtifyProvider = ({ children }: { children: any }) => {
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState<null | Meeting[]>(null);
  const [contacts, setContacts] = useState<null | Contact[]>(null);

  const fetchMeetings = () => {
    setLoading(true);
    clientInstance
      .get("meetings")
      .then((resp) => {
        setMeetings(resp.data);
      })
      .catch((err) => console.log("error fetching meetings", err))
      .finally(() => setLoading(false));
  };

  const fetchContacts = () => {
    setLoading(true);
    clientInstance
      .get("contacts")
      .then((resp) => {
        setContacts(resp.data);
      })
      .catch((err) => console.log("error fetching contacts", err))
      .finally(() => setLoading(false));
  };

  return (
    <ZoomtifyContext.Provider
      value={{
        meetings,
        setMeetings,
        contacts,
        setContacts,
        loading,
        setLoading,
        fetchMeetings,
        fetchContacts,
      }}
    >
      {children}
    </ZoomtifyContext.Provider>
  );
};

export default ZoomtifyContext;
