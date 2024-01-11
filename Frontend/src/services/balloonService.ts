// balloonService.js

import axios from 'axios';

const backendUrl = 'http://localhost:5044/api/balloons';

interface Balloon {
  id?: number;
  color: string;
  guardian: string;
}

export const getBalloons = async (): Promise<Balloon[]> => {
  try {
      const response = await axios.get<Balloon[]>(`${backendUrl}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching balloons:', error);
      return [];
  }
};

export const addBalloon = async (balloonData: Balloon): Promise<Balloon | null> => {
    try {
        const response = await axios.post<Balloon>(`${backendUrl}`, balloonData);
        return response.data;
    } catch (error) {
        console.error('Error adding balloon:', error);
        return null;
    }
};

export const updateBalloon = async (balloonData: Balloon): Promise<Balloon | null> => {
    try {
        const response = await axios.put<Balloon>(`${backendUrl}/${balloonData.id}`, balloonData);
        return 'success'
    } catch (error) {
        console.error('Error updating balloon:', error);
        return null;
    }
  };

  export const deleteBalloon = async (id: number): Promise<boolean> => {
    try {
        await axios.delete(`${backendUrl}/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting balloon:', error);
        return false;
    }
  };