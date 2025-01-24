import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class Digit32HexCodePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, _metadata: ArgumentMetadata) {
    const valid32HexCode = /^[a-f0-9]{64}$/i;
    if (!valid32HexCode.test(value)) throw new NotAcceptableException('invalid 32-digit code');
    return value;
  }
}
