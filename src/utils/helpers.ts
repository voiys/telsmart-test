import {
  LogResponseErrorSignature,
  FormatModelFormatSignature,
} from '../types';

const logResponseError: LogResponseErrorSignature = err => {
  err.log();
};

const formatModelFormat: FormatModelFormatSignature = str => {
  switch (str) {
    case 'ATA':
      return str;
    case 'DESK_PHONE':
      return 'Desk phone';
    case 'HAND_HELD':
      return 'Hand held';
  }
};

export { logResponseError, formatModelFormat };
