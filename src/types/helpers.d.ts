import { ResponseError } from '../utils';
import { DeviceModelFormat } from './services';

type LogResponseErrorSignature = (err: ResponseError) => void;

type FormatModelFormatSignature = (str: DeviceModelFormat) => string;

export { LogResponseErrorSignature, FormatModelFormatSignature };
