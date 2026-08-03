<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```


With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

markdown_content = """# 📚 Estudo de Caso: Sistema de Gestão Acadêmica (LMS Simplificado)

**Status:** Especificação de Projeto & Arquitetura  
**Domínio:** Educação / Gestão Acadêmica (Learning Management System)  
**Foco Técnico:** Modelagem Relacional Complexa, Integridade Referencial, Regras de Negócio Críticas e API Backend  

---

## 1. Visão Geral e Justificativa do Projeto

O **Sistema de Gestão Acadêmica** tem como propósito realizar o controle centralizado de alunos, professores, cursos, disciplinas, turmas e histórico escolar. 

Trata-se de um estudo de caso prático voltado para o desenvolvimento de uma aplicação backend robusta. O projeto aborda desafios reais da engenharia de software, incluindo:
* Relacionamentos complexos em banco de dados relacional ($N:N$, auto-relacionamento de pré-requisitos, restrições de unicidade).
* Garantia de integridade referencial e imutabilidade de registros históricos.
* Implementação de travas e validações de regras de negócio em nível de serviço/domínio.

## Roteiro de Execução Incremental (Roadmap)
### Fase 1: Modelagem & Banco de Dados
Refinamento do Schema Prisma com auto-relacionamento para pré-requisitos.

Configuração do container MySQL via Docker Compose.

Execução das migrations e escrita de scripts de seed com dados fictícios.

### Fase 2: Serviços Core & Regras de Negócio
Implementação dos módulos de autenticação JWT e controle de autorização (RBAC).

Construção do serviço de matrícula com validação assíncrona de pré-requisitos, limites de vagas e choque de horários.

Construção do fluxo de encerramento de pauta e cálculo automatizado do Coeficiente de Rendimento (CR).

### Fase 3: Testes, Documentação e Entrega
Elaboração de testes unitários e de integração para as regras de negócio críticas.

Documentação interativa dos endpoints (Swagger/OpenAPI ou Coleção GraphQL).
"""

---

## 2. Módulos e Controle de Acesso (RBAC)

O sistema é dividido em módulos funcionais com permissões distintas por perfil de usuário (*Role-Based Access Control*):

| Módulo | Responsabilidade | Perfil / Nível de Acesso |
| :--- | :--- | :--- |
| **Autenticação & Usuários** | Gestão de credenciais, geração de tokens JWT e atribuição de papéis. | Admin, Professor, Aluno |
| **Estrutura Acadêmica** | Cadastro e manutenção de Cursos, Disciplinas, Cargas Horárias e Pré-requisitos. | Admin |
| **Gestão de Ofertas** | Alocação de Turmas (associação entre Disciplina, Professor, Semestre/Ano, Horário e Sala). | Admin |
| **Matrículas & Frequência** | Inscrição de alunos em turmas, registro diário de frequências e lançamento de notas parciais. | Aluno (Matrícula), Professor (Notas/Frequência) |
| **Histórico Escolar** | Consolidação dos resultados finais (Aprovado, Reprovado, Trancado) e cálculo do CR. | Todos (Leitura), Sistema/Professor (Consolidação) |

---

## 3. Regras de Negócio Críticas (Business Rules)

As regras de negócio representam o núcleo da aplicação e devem ser validadas rigorosamente antes da persistência no banco de dados:

### 3.1. Validação de Matrícula
* **RN-01 (Pré-requisitos):** Um aluno só pode se matricular em uma disciplina se tiver status `APPROVED` em todas as disciplinas cadastradas como pré-requisitos.
* **RN-02 (Conflito de Horário):** O sistema deve impedir a matrícula simultânea em duas ou mais turmas que possuam sobreposição de dias e horários no mesmo semestre letivo.
* **RN-03 (Capacidade Máxima):** A quantidade de alunos matriculados em uma turma não pode exceder o limite de vagas definido no cadastro da turma.

### 3.2. Avaliação e Fechamento de Pauta
* **RN-04 (Critérios de Aprovação):**
  * **Aprovado (`APPROVED`):** Média Final $\ge 7,0$ **E** Frequência $\ge 75\%$.
  * **Reprovado por Nota (`FAILED_GRADE`):** Média Final $< 7,0$ **E** Frequência $\ge 75\%$.
  * **Reprovado por Faltas (`FAILED_ABSENCE`):** Frequência $< 75\%$ (independente da nota final).
* **RN-05 (Imutabilidade do Histórico):** Após o encerramento da pauta pelo professor responsável, a situação da matrícula é alterada de `ENROLLED` para o status definitivo (`APPROVED` ou `FAILED`). O registro de histórico torna-se imutável para edição direta.
* **RN-06 (Cálculo do Coeficiente de Rendimento - CR):** O CR do aluno é recalculado a cada período letivo encerrado, utilizando a média ponderada das notas finais pelas cargas horárias das disciplinas cursadas:
  $$\\text{CR} = \\frac{\\sum (\\text{Nota Final}_i \\times \\text{Carga Horária}_i)}{\\sum \\text{Carga Horária}_i}$$

---

## 4. Esboço do Esquema do Banco de Dados (Prisma Schema)

Abaixo está a representação declarativa dos modelos de dados utilizando **Prisma ORM** com suporte a MySQL/PostgreSQL.

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  PROFESSOR
  STUDENT
}

enum EnrollmentStatus {
  ENROLLED
  APPROVED
  FAILED_GRADE
  FAILED_ABSENCE
  DROPPED
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(STUDENT)
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  student   Student?
  professor Professor?
}

model Profile {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullName  String
  cpf       String?  @unique
  phone     String?
}

model Student {
  id           String       @id @default(uuid())
  registration String       @unique // Número de Matrícula
  userId       String       @unique
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  courseId     String
  course       Course       @relation(fields: [courseId], references: [id])
  enrollments  Enrollment[]
}

model Professor {
  id           String   @id @default(uuid())
  registration String   @unique
  userId       String   @unique
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  classes      Class[]
}

model Course {
  id          String       @id @default(uuid())
  name        String
  code        String       @unique
  students    Student[]
  disciplines Discipline[]
}

model Discipline {
  id           String       @id @default(uuid())
  code         String       @unique
  name         String
  workload     Int          // Carga horária em horas
  courseId     String
  course       Course       @relation(fields: [courseId], references: [id])
  
  // Auto-relacionamento N:N para Pré-requisitos
  prerequisites Discipline[] @relation("Prerequisites")
  requiredFor   Discipline[] @relation("Prerequisites")

  classes      Class[]
}

model Class {
  id           String       @id @default(uuid())
  code         String       // Ex: 2026.1-A
  semester     String       // Ex: 2026.1
  schedule     String       // Ex: "SEG_19:00-21:00,QUA_19:00-21:00"
  capacity     Int          @default(40)
  disciplineId String
  discipline   Discipline   @relation(fields: [disciplineId], references: [id])
  professorId  String
  professor    Professor    @relation(fields: [professorId], references: [id])
  
  enrollments  Enrollment[]

  createdAt    DateTime     @default(now())
}

model Enrollment {
  id         String           @id @default(uuid())
  studentId  String
  student    Student          @relation(fields: [studentId], references: [id], onDelete: Cascade)
  classId    String
  class      Class            @relation(fields: [classId], references: [id], onDelete: Cascade)
  status     EnrollmentStatus @default(ENROLLED)
  finalGrade Float?
  absences   Int              @default(0)

  createdAt  DateTime         @default(now())
  updatedAt  DateTime         @updatedAt

  @@unique([studentId, classId])
}


## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
