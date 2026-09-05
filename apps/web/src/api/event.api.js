import api from "./client";

// Student
export const getEventsApi = async () => {
  const { data } = await api.get("/events");
  return data;
};

export const getEventByIdApi = async (id) => {
  const { data } = await api.get(`/events/${id}`);
  return data;
};

export const registerEventApi = async (id) => {
  const { data } = await api.post(`/registrations/${id}/register`);
  return data;
};

// Club Head
export const getMyEventsApi = async () => {
  const { data } = await api.get("/events/my-events");
  return data;
};

// HOD
export const getPendingEventsApi = async () => {
  const { data } = await api.get("/events/pending");
  return data;
};

export const approveEventApi = async (id) => {
  const { data } = await api.patch(`/events/${id}/approve`);
  return data;
};

export const rejectEventApi = async (id) => {
  const { data } = await api.patch(`/events/${id}/reject`);
  return data;
};