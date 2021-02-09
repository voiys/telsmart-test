type DeviceModelName = 'T41' | 'T46' | 'T48' | 'W52' | '9430 - B86' | 'SPA112';

type DeviceModelFormat = 'ATA' | 'HAND_HELD' | 'DESK_PHONE';

interface DeviceModel {
  id: number;
  vendor: number;
  name: DeviceModelName;
  dss: boolean;
  device_format: DeviceModelFormat;
}

type DeviceModels = DeviceModel[];

interface DeviceBody {
  customer: number;
  model: number;
  description: string;
  mac: string;
}

interface Device extends DeviceBody {
  id: number;
  cfg_last_update: string;
}

interface MappedDevice extends Device {
  model: DeviceModel;
}

type Devices = Device[];

type MappedDevices = MappedDevice[];

type DSSType = 'BLF' | 'SPD';

interface DSSBody {
  device: number;
  dss_type: DSSType;
  key: number;
  value: string;
  label: string;
}

interface DSS extends DSSBody {
  id: number;
}

type DSSs = DSS[];

type GetDeviceModelsSignature = () => Promise<DeviceModels>;

type GetDevicesSignature = () => Promise<Devices>;

type AddDeviceSignature = (deviceBody: DeviceBody) => Promise<Device>;

type UpdateDeviceSignature = (
  deviceId: number,
  deviceBody: DeviceBody
) => Promise<Device>;

type DeleteDeviceSignature = (deviceId: number) => Promise<void>;

type GetDSSSignature = (deviceId: number) => Promise<DSSs>;

type AddDSSSignature = (dssBody: DSSBody) => Promise<DSS>;

type UpdateDSSSignature = (dssId: number, dssBody: DSSBody) => Promise<DSS>;

type DeleteDSSSignature = (dssId: number) => Promise<void>;

export {
  DeviceBody,
  Device,
  Devices,
  DSSBody,
  DSS,
  DSSType,
  DSSs,
  DeviceModel,
  DeviceModels,
  DeviceModelFormat,
  DeviceModelName,
  MappedDevice,
  MappedDevices,
  GetDeviceModelsSignature,
  GetDevicesSignature,
  AddDeviceSignature,
  UpdateDeviceSignature,
  DeleteDeviceSignature,
  GetDSSSignature,
  AddDSSSignature,
  UpdateDSSSignature,
  DeleteDSSSignature,
};
