import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';

function createAdapter(): PrismaMariaDb {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL nao foi definida. Copie .env.example para .env e informe a conexao MySQL.');
  }

  const url = new URL(databaseUrl);

  if (url.protocol !== 'mysql:') {
    throw new Error('DATABASE_URL deve usar o protocolo mysql://.');
  }

  const database = url.pathname.slice(1);

  if (!database) {
    throw new Error('DATABASE_URL deve incluir o nome do banco de dados.');
  }

  return new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database,
    connectionLimit: Number(url.searchParams.get('connection_limit') || 5),
  });
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({ adapter: createAdapter() });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
