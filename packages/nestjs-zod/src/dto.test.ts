import { createZodDto } from './dto';
import * as z4 from 'zod/v4';

describe('zod/v4', () => {
  it('should correctly create DTO', () => {
    const UserSchema = z4.object({
      username: z4.string(),
      password: z4.string(),
    });

    class UserDto extends createZodDto(UserSchema) {}

    expect(UserDto.isZodDto).toBe(true);
    expect(UserDto.schema).toBe(UserSchema);

    const user = UserDto.create({
      username: 'vasya',
      password: 'strong',
    });

    expect(user).toEqual({
      username: 'vasya',
      password: 'strong',
    });
  });

  it('should generate correct OpenAPI metadata', () => {
    const UserSchema = z4.object({
      username: z4.string(),
      password: z4.string(),
    });

    class UserDto extends createZodDto(UserSchema) {}

    expect(UserDto._OPENAPI_METADATA_FACTORY()).toEqual({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
  });

  it('allows creating an Output DTO from a schema', () => {
    const UserSchema = z4.object({
      username: z4.string(),
      password: z4.string(),
      myField: z4.string().optional().default('myField'),
    });

    class UserDto extends createZodDto(UserSchema) {}

    expect(UserDto.Output._OPENAPI_METADATA_FACTORY()).toEqual({
      username: expect.objectContaining({ type: 'string', required: true }),
      password: expect.objectContaining({ type: 'string', required: true }),
      myField: expect.objectContaining({
        type: 'string',
        required: true,
        default: 'myField',
      }),
    });
  });
});
