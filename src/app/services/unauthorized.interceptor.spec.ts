import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UnauthorizedInterceptor } from './unauthorized.interceptor';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('UnauthorizedInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
        { provide: AuthService, useValue: { removeToken: jest.fn() } },
        { provide: Router, useValue: { navigateByUrl: jest.fn() } },
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(HTTP_INTERCEPTORS).find(i => i instanceof UnauthorizedInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should handle 401 error and navigate to login', () => {
    const spyRemoveToken = jest.spyOn(authService, 'removeToken');
    const spyNavigateByUrl = jest.spyOn(router, 'navigateByUrl');

    httpClient.get('/test').subscribe(
      response => fail('should have failed with the 401 error'),
      error => {
        expect(error.status).toBe(401);
      }
    );

    const req = httpMock.expectOne('/test');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(spyRemoveToken).toHaveBeenCalled();
    expect(spyNavigateByUrl).toHaveBeenCalledWith('/login');
  });
});
