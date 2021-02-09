import {
  createContext,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppAction,
  AppContext,
  PaginationIndex,
  AppState,
  DeviceBody,
  DeviceModel,
  DSSBody,
  MappedDevices,
  DSSs,
} from '../types';
import services from '../utils/services';

const appContext = createContext<AppContext>({
  displayedPage: 'device',
  displayedDevices: [],
  displayedDSSs: [],
  searchValue: '',
  activePagination: 0,
  deviceModels: [],
  homePageNavigated: () => {},
  dssPageNavigated: deviceId => {},
  filterDevices: searchValue => {},
  navigatePagination: paginationIndex => {},
  addDevice: body => {},
  addDSS: body => {},
  updateDevice: (id, body) => {},
  updateDSS: (id, body) => {},
  deleteDSS: id => {},
  deleteDevice: id => {},
  reorderDSSs: dsss => {},
});

const reducer: Reducer<AppState, AppAction> = (state, action) => {
  const newState = {
    ...state,
  };

  switch (action.type) {
    case 'initial-fetch': {
      const deviceModels = action.payload!.deviceModels!;
      const devices = action.payload!.devices!;

      newState.deviceModels = deviceModels;
      newState.initialDevices = devices;
      newState.displayedDevices = devices;

      return newState;
    }
    case 'home-page-navigated': {
      newState.displayedPage = 'device';
      newState.displayedDSSs = [];
      return newState;
    }
    case 'dss-page-navigated': {
      const dsss = action.payload!.dsss!;
      newState.displayedPage = 'dss';
      newState.displayedDSSs = dsss.sort((a, b) => a.key - b.key);
      return newState;
    }
    case 'filter-devices': {
      const searchValue = action.payload!.searchValue!;
      newState.searchValue = searchValue;
      newState.activePagination = 0;
      if (searchValue.length > 0) {
        newState.displayedDevices = state.initialDevices.filter(device =>
          device.customer.toString().includes(searchValue)
        );
      } else {
        newState.displayedDevices = state.initialDevices;
      }

      return newState;
    }
    case 'pagination-navigated': {
      const newPaginationIndex = action.payload!.paginationIndex!;

      if (newPaginationIndex === 'first') {
        newState.activePagination = 0;
      } else if (newPaginationIndex === 'last') {
        newState.activePagination = Math.floor(state.initialDevices.length / 3);
      } else {
        newState.activePagination = newPaginationIndex;
      }

      return newState;
    }
    case 'add-device': {
      const newDevice = action.payload!.device!;

      newState.displayedDevices = [newDevice, ...state.displayedDevices];
      newState.initialDevices = [newDevice, ...state.initialDevices];

      if (newState.searchValue !== '') {
        newState.searchValue = '';
      }

      return newState;
    }
    case 'add-dss': {
      const newDSS = action.payload!.dss!;

      newState.displayedDSSs = [newDSS, ...state.displayedDSSs];

      return newState;
    }
    case 'update-device': {
      const newDevice = action.payload!.device!;
      const index = state.initialDevices.findIndex(
        device => device.id === newDevice.id
      );

      newState.displayedDevices.splice(index, 1, newDevice);
      newState.initialDevices.splice(index, 1, newDevice);

      if (newState.searchValue !== '') {
        newState.searchValue = '';
      }

      return newState;
    }
    case 'update-dss': {
      const newDSS = action.payload!.dss!;
      const index = state.displayedDSSs.findIndex(dss => dss.id === newDSS.id);

      newState.displayedDSSs.splice(index, 1, newDSS);

      return newState;
    }
    case 'delete-device': {
      const deviceId = action.payload!.deviceId!;
      newState.initialDevices = state.initialDevices.filter(
        device => device.id !== deviceId
      );
      newState.displayedDevices = state.displayedDevices.filter(
        device => device.id !== deviceId
      );

      return newState;
    }
    case 'delete-dss': {
      const dssId = action.payload!.dssId!;

      newState.displayedDSSs = state.displayedDSSs.filter(
        dss => dss.id !== dssId
      );

      return newState;
    }
    case 'reorder-dsss': {
      const newDsss = action.payload!.dsss!;

      newState.displayedDSSs = newDsss;
      console.log(newDsss);

      return newState;
    }
    default:
      throw new Error('unknown action type');
  }
};

const initialState: AppState = {
  displayedPage: 'device',
  deviceModels: [],
  initialDevices: [],
  displayedDevices: [],
  displayedDSSs: [],
  searchValue: '',
  activePagination: 0,
};

const AppContextProvider: FC = ({ children }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialFetch = () => {
    services.getDeviceModels().then(deviceModels => {
      services.getDevices().then(initialDevices => {
        const mappedDevices: MappedDevices = initialDevices.map(device => ({
          ...device,
          model: deviceModels.find(
            model => model.id === device.model
          ) as DeviceModel,
        }));

        dispatch({
          type: 'initial-fetch',
          payload: {
            deviceModels,
            devices: mappedDevices,
          },
        });
      });
    });
  };

  const homePageNavigated = () => {
    history.push('/devices/');
    dispatch({
      type: 'home-page-navigated',
    });
  };

  const dssPageNavigated = (deviceId: number) => {
    history.push(`/dss/${deviceId}/`);
    services.getDSSs(deviceId).then(dsss => {
      dispatch({
        type: 'dss-page-navigated',
        payload: {
          dsss,
        },
      });
    });
  };

  const filterDevices = (searchValue: string) => {
    dispatch({
      type: 'filter-devices',
      payload: {
        searchValue,
      },
    });
  };

  const navigatePagination = (paginationIndex: PaginationIndex) => {
    dispatch({
      type: 'pagination-navigated',
      payload: {
        paginationIndex,
      },
    });
  };

  const addDevice = (body: DeviceBody) => {
    services.addDevice(body).then(newDevice => {
      const newMappedDevice = {
        ...newDevice,
        model: state.deviceModels.find(
          model => model.id === newDevice.model
        ) as DeviceModel,
      };
      dispatch({ type: 'add-device', payload: { device: newMappedDevice } });
    });
  };

  const addDSS = (body: DSSBody) => {
    services.addDSS(body).then(newDSS => {
      dispatch({ type: 'add-dss', payload: { dss: newDSS } });
    });
  };

  const updateDevice = (deviceId: number, body: DeviceBody) => {
    services.updateDevice(deviceId, body).then(newDevice => {
      const newMappedDevice = {
        ...newDevice,
        model: state.deviceModels.find(
          model => model.id === newDevice.model
        ) as DeviceModel,
      };

      dispatch({ type: 'update-device', payload: { device: newMappedDevice } });
    });
  };

  const updateDSS = (dssId: number, body: DSSBody) => {
    console.log(dssId, body);
    services.updateDSS(dssId, body).then(newDSS => {
      dispatch({
        type: 'update-dss',
        payload: {
          dss: newDSS,
        },
      });
    });
  };

  const deleteDevice = (deviceId: number) => {
    services.deleteDevice(deviceId).then(() => {
      dispatch({ type: 'delete-device', payload: { deviceId } });
    });
  };

  const deleteDSS = (dssId: number) => {
    services.deleteDSS(dssId).then(() => {
      dispatch({ type: 'delete-dss', payload: { dssId } });
    });
  };

  const reorderDSSs = (dsss: DSSs) => {
    dispatch({
      type: 'reorder-dsss',
      payload: {
        dsss,
      },
    });
  };

  useEffect(() => {
    initialFetch();

    const stopListening = history.listen(location => {
      if (history.action === 'POP') {
        if (location.pathname.includes('devices')) {
          dispatch({ type: 'home-page-navigated' });
        } else {
          const deviceId = parseInt(location.pathname.match(/\d+/)![0]);

          dispatch({ type: 'dss-page-navigated', payload: { deviceId } });
        }
      }
    });

    return () => stopListening();
  }, [history]);

  return (
    <appContext.Provider
      value={{
        ...state,
        homePageNavigated,
        dssPageNavigated,
        filterDevices,
        navigatePagination,
        addDSS,
        addDevice,
        updateDevice,
        updateDSS,
        deleteDevice,
        deleteDSS,
        reorderDSSs,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

const useAppContext = () => useContext(appContext);

export { AppContextProvider, useAppContext };
