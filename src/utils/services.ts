import axios from 'axios';
import { ResponseError } from './errors';
import { logResponseError } from './helpers';
import {
  GetDeviceModelsSignature,
  GetDevicesSignature,
  AddDeviceSignature,
  UpdateDeviceSignature,
  DeleteDeviceSignature,
  GetDSSSignature,
  AddDSSSignature,
  UpdateDSSSignature,
  DeleteDSSSignature,
} from '../types';

const baseUrl = 'https://test.telsmart.ch/api';
const headers = {
  Authorization: 'Token 3123fbab332c21a88c585fc3141e3d7d9431a181',
};
const axiosConfig = { headers };

const getDeviceModels: GetDeviceModelsSignature = async () => {
  const endpoint = `${baseUrl}/device_models/`;

  try {
    const response = await axios.get(endpoint, axiosConfig);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new ResponseError('getDeviceModels', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const getDevices: GetDevicesSignature = async () => {
  const endpoint = `${baseUrl}/devices/`;

  try {
    const response = await axios.get(endpoint, axiosConfig);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new ResponseError('getDevices', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const addDevice: AddDeviceSignature = async deviceBody => {
  const endpoint = `${baseUrl}/devices/`;

  try {
    const response = await axios.post(endpoint, deviceBody, axiosConfig);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new ResponseError('addDevice', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const updateDevice: UpdateDeviceSignature = async (deviceId, deviceBody) => {
  const endpoint = `${baseUrl}/devices/${deviceId}/`;

  try {
    const response = await axios.put(endpoint, deviceBody, axiosConfig);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new ResponseError('updateDevice', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const deleteDevice: DeleteDeviceSignature = async deviceId => {
  const endpoint = `${baseUrl}/devices/${deviceId}/`;

  try {
    const response = await axios.delete(endpoint, axiosConfig);

    if (response.status !== 204) {
      throw new ResponseError('deleteDevice', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const getDSSs: GetDSSSignature = async deviceId => {
  const endpoint = `${baseUrl}/dss/`;
  const params = {
    device: deviceId,
  };

  try {
    const response = await axios.get(endpoint, { ...axiosConfig, params });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new ResponseError('getDSS', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const addDSS: AddDSSSignature = async dssBody => {
  const endpoint = `${baseUrl}/dss/`;

  try {
    const response = await axios.post(endpoint, dssBody, axiosConfig);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new ResponseError('addDSS', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const updateDSS: UpdateDSSSignature = async (dssId, dssBody) => {
  const endpoint = `${baseUrl}/dss/${dssId}/`;

  try {
    const response = await axios.put(endpoint, dssBody, axiosConfig);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new ResponseError('updateDSS', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const deleteDSS: DeleteDSSSignature = async dssId => {
  const endpoint = `${baseUrl}/dss/${dssId}/`;

  try {
    const response = await axios.delete(endpoint, axiosConfig);

    if (response.status !== 204) {
      throw new ResponseError('deleteDSS', response.status);
    }
  } catch (err) {
    logResponseError(err);
  }
};

const services = {
  getDeviceModels,
  getDevices,
  addDevice,
  updateDevice,
  deleteDevice,
  getDSSs,
  addDSS,
  updateDSS,
  deleteDSS,
};

export default services;
