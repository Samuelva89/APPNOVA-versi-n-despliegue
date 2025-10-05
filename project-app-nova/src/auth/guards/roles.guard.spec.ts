import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { UserRole } from '../../common/constants/roles.enum';
import { ROLES_KEY } from '../../decorators/roles.decorator';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  // Helper function to create a mock ExecutionContext
  const createMockContext = (userRoles?: UserRole[], handlerRoles?: UserRole[], classRoles?: UserRole[]) => {
    const mockContext: Partial<ExecutionContext> = {
      getHandler: () => (handlerRoles ? {} : undefined),
      getClass: () => (classRoles ? {} : undefined),
      switchToHttp: () => ({
        getRequest: () => ({
          user: userRoles ? { roles: userRoles } : undefined,
        }),
      }),
    };

    // Mock getAllAndOverride to return specific roles for the test
    // Note: The actual guard logic calls getAllAndOverride with both handler and class
    // For simplicity in this mock, we'll assume one of them provides the roles.
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(handlerRoles || classRoles);

    return mockContext as ExecutionContext;
  };

  it('should return false if no roles are required and user is not LIDER_DE_PROYECTO', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(undefined); // No roles required

    const context = createMockContext([UserRole.INVESTIGADOR]); // User is not LIDER_DE_PROYECTO

    expect(guard.canActivate(context)).toBe(false);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  });

  it('should return true if user is LIDER_DE_PROYECTO, regardless of required roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce([UserRole.ADMIN]); // Roles are required

    const context = createMockContext([UserRole.LIDER_DE_PROYECTO, UserRole.INVESTIGADOR]); // User is LIDER_DE_PROYECTO

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return true if user has a required role', () => {
    const context = createMockContext(
      [UserRole.ADMIN, UserRole.INVESTIGADOR], // User roles
      [UserRole.ADMIN] // Required roles
    );

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return false if user does not have a required role', () => {
    const context = createMockContext(
      [UserRole.INVESTIGADOR], // User roles
      [UserRole.ADMIN] // Required roles
    );

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false if user object is missing', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce([UserRole.ADMIN]); // Roles are required

    const context = createMockContext(
      undefined, // No user roles
      [UserRole.ADMIN] // Required roles
    );

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false if user has no roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce([UserRole.ADMIN]); // Roles are required

    const context = createMockContext(
      [], // User has empty roles array
      [UserRole.ADMIN] // Required roles
    );

    expect(guard.canActivate(context)).toBe(false);
  });

  it('should return false if user roles is undefined', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce([UserRole.ADMIN]); // Roles are required

    const context = createMockContext(
      undefined, // User object with no roles property
      [UserRole.ADMIN] // Required roles
    );

    // Manually mock getRequest to return user without roles property
    const mockContext: Partial<ExecutionContext> = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: {} }),
      }),
    };
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce([UserRole.ADMIN]);

    expect(guard.canActivate(mockContext as ExecutionContext)).toBe(false);
  });
});
