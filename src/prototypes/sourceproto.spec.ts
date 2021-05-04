import 'prototypes/sourceproto';
import { assert } from 'console';

describe('testing availableSlots property', () => {
  it('should throw an error on write', () => {
    // const src1 = { id: 'source1' as Id<Source> } as Source;
    const src1 = new Source('source1' as Id<Source>);
    assert(src1.availableSlots === 3, "I can't access availableSlots");
    expect(() => src1.availableSlots++).toThrow(Error);
  });
});
