// ESM module namespaces can't be spied on, so `toJSONSchema` is wrapped in a
// mock here to let testUtils swap the zod version under test.
vi.mock('zod/v4/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('zod/v4/core')>();
  return { ...actual, toJSONSchema: vi.fn(actual.toJSONSchema) };
});
