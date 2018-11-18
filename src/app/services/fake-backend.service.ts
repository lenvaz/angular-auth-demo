import { MockBackend, MockConnection } from "@angular/http/testing";
import { BaseRequestOptions, RequestMethod, ResponseOptions, Response, Http } from '@angular/http';

export function FakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions
) {
    backend.connections.subscribe((connection: MockConnection) => {
        setTimeout(() => {
            
            if (connection.request.url.endsWith('/api/authenticate') &&
            connection.request.method === RequestMethod.Post) {
                let body = JSON.parse(connection.request.getBody());
                let token = body.isAdmin ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIiLCJhZG1pbiI6dHJ1ZX0.b50OApFhq8HrlZNO75Eoxu2M3JselwdXNjFVjyeHTzw' : 
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIiLCJhZG1pbiI6ZmFsc2V9.3xfjfPhpXtAekuOvyy9iedX5xN-E7e4TH33_-K1JByY';
                if (body.email === 'abc@domain.com' && body.password === '1234') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            status: 200,
                            body: { token: token }
                        })));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }

            if (connection.request.url.endsWith('/api/orders') &&
                connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer ' + localStorage.getItem('token')) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            status: 200,
                            body: [1, 2, 3, 4]
                        })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }
        }, 1000);
    });
    return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: FakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
}
