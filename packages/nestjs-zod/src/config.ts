export interface ZodDtoConfig {
  /**
   * Default value for `createZodDto`'s `codec` option when it isn't passed
   * explicitly for a given DTO.
   */
  codec: boolean;
}

const zodDtoConfig: ZodDtoConfig = {
  codec: false,
};

/**
 * Overrides the library-wide defaults used by `createZodDto`.  Any option
 * not passed here keeps its previous value.  Call this once, e.g. during
 * app bootstrap, before any `createZodDto` calls that should observe it.
 */
export function configureZodDto(config: Partial<ZodDtoConfig>): void {
  Object.assign(zodDtoConfig, config);
}

export function getZodDtoConfig(): ZodDtoConfig {
  return zodDtoConfig;
}
