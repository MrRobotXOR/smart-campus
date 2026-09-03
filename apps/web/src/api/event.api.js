import api from "./client";

export const getEventsApi = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const getEventByIdApi = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};
export const registerEventApi = async(id)=>{
  return api.post(`/registrations/${id}/register`);
};