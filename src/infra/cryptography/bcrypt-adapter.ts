import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hasher } from '../../user/protocols/hasher';

@Injectable()
export class BcryptAdapter implements Hasher {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }
}
