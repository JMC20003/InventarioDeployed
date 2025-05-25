import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';
import { CanActivateFn } from '@angular/router';
import { of } from 'rxjs';

describe('adminGuard', () => {
  let mockAuthService: any;
  let mockRouter: any;
  let navigateSpy: jasmine.Spy;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminGuard(...guardParameters));

  beforeEach(() => {
    mockAuthService = {
      getUser: jasmine.createSpy()
    };

    navigateSpy = jasmine.createSpy('navigate');
    mockRouter = {
      navigate: navigateSpy
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('debería permitir el acceso si el usuario tiene el rol ADMIN', () => {
    mockAuthService.getUser.and.returnValue({ roles: ['ROLE_ADMIN'] });
    const result = executeGuard(null as any, null as any);
    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('debería bloquear el acceso si el usuario no es ADMIN', () => {
    mockAuthService.getUser.and.returnValue({ roles: ['ROLE_CLIENTE'] });
    const result = executeGuard(null as any, null as any);
    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/no-autorizado']);
  });

  it('debería bloquear el acceso si no hay usuario autenticado', () => {
    mockAuthService.getUser.and.returnValue(null);
    const result = executeGuard(null as any, null as any);
    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/no-autorizado']);
  });
});
