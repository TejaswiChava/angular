import { NullIntPipe } from './null-int.pipe';

describe('NullIntPipe', () => {
  it('create an instance', () => {
    const pipe = new NullIntPipe();
    expect(pipe).toBeTruthy();
  });
});
