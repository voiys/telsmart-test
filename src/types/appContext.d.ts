import {
  DeviceBody,
  DeviceModels,
  DSS,
  DSSBody,
  DSSs,
  MappedDevice,
  MappedDevices,
} from './services';

type AppPage = 'device' | 'dss';

interface AppContextState {
  displayedPage: AppPage;
  searchValue: string;
  displayedDevices: MappedDevices;
  displayedDSSs: DSSs;
  activePagination: number;
  deviceModels: DeviceModels;
}

interface AppContextControls {
  homePageNavigated: () => void;
  dssPageNavigated: (deviceId: number) => void;
  filterDevices: (searchValue: string) => void;
  navigatePagination: (paginationIndex: PaginationIndex) => void;
  addDevice: (body: DeviceBody) => void;
  addDSS: (body: DSSBody) => void;
  updateDevice: (deviceId: number, body: DeviceBody) => void;
  updateDSS: (dssId: number, body: DSSBody) => void;
  deleteDevice: (deviceId: number) => void;
  deleteDSS: (dssId: number) => void;
  reorderDSSs: (dsss: DSSs) => void;
}

type AppContext = AppContextState & AppContextControls;

interface AppState extends AppContextState {
  initialDevices: MappedDevices;
  deviceModels: DeviceModels;
}

type AppActionType =
  | 'initial-fetch'
  | 'home-page-navigated'
  | 'dss-page-navigated'
  | 'add-device'
  | 'add-dss'
  | 'update-device'
  | 'update-dss'
  | 'delete-device'
  | 'delete-dss'
  | 'pagination-navigated'
  | 'filter-devices'
  | 'reorder-dsss';

type PaginationIndex = 'first' | 'last' | number;
type Pagination = PaginationIndex[];

type AppPayload = Partial<{
  deviceId: number;
  dssId: number;
  searchValue: string;
  devices: MappedDevices;
  deviceModels: DeviceModels;
  dss: DSS;
  dsss: DSSs;
  device: MappedDevice;
  paginationIndex: PaginationIndex;
}>;

interface AppAction {
  type: AppActionType;
  payload?: AppPayload;
}

export {
  AppPage,
  AppState,
  AppActionType,
  AppAction,
  AppStateContext,
  AppContextControls,
  AppContext,
  PaginationIndex,
  Pagination,
};
