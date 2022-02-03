import { Test } from '@nestjs/testing';
import { CryptographyModule } from '../cryptography.module';

describe('Cryptography Module', () => {
  it('should behave...', async () => {
    const module = await Test.createTestingModule({
      imports: [CryptographyModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
