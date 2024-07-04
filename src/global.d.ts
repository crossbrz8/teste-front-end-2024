// global.d.ts
import { TextEncoder as UtilTextEncoder, TextDecoder as UtilTextDecoder } from 'util';

declare global {
  var TextEncoder: typeof UtilTextEncoder;
  var TextDecoder: typeof UtilTextDecoder;
}
