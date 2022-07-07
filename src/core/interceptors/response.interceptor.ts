import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const { query } = context.switchToHttp().getRequest();

    const meta = {};
    if (query && query.page) {
      meta['page'] = Number(query.page);
      meta['take'] = Number(query.take);
      meta['previous'] = query.page > 1 ? query.page - 1 : null;
    }

    return next.handle().pipe(
      map((responseData) => {
        if (Array.isArray(responseData)) {
          const [data, totalCount] = responseData;
          meta['totalCount'] = totalCount;
          const currentCount = meta['page'] * meta['take'];
          if (currentCount < totalCount) {
            meta['next'] = ++meta['page'];
          } else {
            meta['next'] = null;
          }
          return { data, meta };
        }
        return { data: responseData };
      }),
    );
  }
}
