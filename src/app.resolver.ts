import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String, {
    description: 'Verifica se a API GraphQL esta respondendo.',
  })
  health(): string {
    return 'ok';
  }
}
