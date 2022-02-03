import { BcryptAdapter } from '../bcrypt-adapter';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash_value');
  },
}));

describe('BcryptAdapter', () => {
  let bcryptAdapter: BcryptAdapter;

  beforeEach(() => {
    bcryptAdapter = new BcryptAdapter();
  });

  it('should be defined', () => {
    expect(bcryptAdapter).toBeDefined();
  });

  describe('hash', () => {
    it('should call bcrypt with correct value', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash');

      await bcryptAdapter.hash('any_value');

      expect(hashSpy).toHaveBeenCalledTimes(1);
      expect(hashSpy).toHaveBeenCalledWith('any_value', 10);
    });

    it('should return a hash on success', async () => {
      const response = await bcryptAdapter.hash('any_string');
      expect(response).toBe('hash_value');
    });

    it('shold throw if bcrypt throws', async () => {
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = bcryptAdapter.hash('any_value');
      await expect(promise).rejects.toThrowError();
    });
  });
});
