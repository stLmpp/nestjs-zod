import { isZodDto, ZodDto } from './dto';
import { createZodValidationException, ZodExceptionCreator } from './exception';
import { UnknownSchema } from './types';

/**
 * @deprecated `validate` will be removed in a future version.  It is
 * recommended to use `.parse` directly
 */
export function validate(
  value: unknown,
  schemaOrDto: UnknownSchema | ZodDto,
  createValidationException: ZodExceptionCreator = createZodValidationException,
): unknown {
  const schema = isZodDto(schemaOrDto) ? schemaOrDto.schema : schemaOrDto;

  try {
    return schema.parse(value);
  } catch (error) {
    throw createValidationException(error);
  }
}
