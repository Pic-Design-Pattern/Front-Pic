# Migração de Autenticação para Better-Auth — Design

Data: 2026-09-22

## Contexto

O front hoje autentica contra um backend custom (`POST /autenticacao`, `POST /autenticacao/login`) via `AuthService` (`src/app/core/auth/auth.service.ts`): recebe um JWT, decodifica o payload no cliente, guarda em `localStorage`, e um interceptor (`auth.interceptor.ts`) anexa `Authorization: Bearer <token>` em toda requisição.

O backend (`../new-back`) já migrou para `better-auth` (`^1.1.18`, ver `src/auth/auth.ts` e `src/auth/auth.controller.ts`):

- Montado em `POST/GET /api/autenticacao/*` (prefixo global `api` + `basePath: /autenticacao`).
- `emailAndPassword: { enabled: true, requireEmailVerification: true }` — login falha até o e-mail ser confirmado.
- `sendResetPassword` configurado via Resend — fluxo de "esqueci a senha" está pronto no backend.
- `socialProviders.google` configurado — login com Google está pronto no backend.
- Sessão via **cookie HTTP-only**, não mais JWT manual. `AutenticadoGuard` (backend) lê a sessão via `auth.api.getSession({ headers })` — não há mais verificação de Bearer token.
- CORS (`main.ts`) já com `credentials: true` e origem `http://localhost:4200`.

Esta spec cobre a troca completa do lado do front para acompanhar isso: novo `AuthService` baseado em cookie/sessão, guard e interceptor atualizados, telas de login/cadastro adaptadas, e as 3 telas novas que o backend já exige para o fluxo funcionar (verificação de e-mail, esqueci senha, redefinir senha) mais o botão de login com Google.

Fora de escopo: qualquer mudança no backend; reconciliar `RespostaApi<T>` (envelope das rotas de negócio) com o formato de resposta do better-auth (`{ data, error }`) — são dois contratos distintos e coexistem; 2FA ou outros social providers além de Google.

## Contrato do backend (referência)

Base do cliente de auth: `http://localhost:3000/api/autenticacao` (= `${API_BASE_URL}/autenticacao`).

- `authClient.signUp.email({ email, password, name })` — cadastro. `password` mín. 8 chars. Dispara e-mail de verificação; usuário fica com `emailVerified: false` até clicar no link.
- `authClient.signIn.email({ email, password })` — login. Falha (erro do tipo "email não verificado") se `emailVerified` for `false`.
- `authClient.signIn.social({ provider: 'google', callbackURL })` — redireciona a janela para o consentimento do Google e volta para `callbackURL`.
- `authClient.getSession()` — sessão atual (`{ user, session } | null`), via cookie.
- `authClient.signOut()` — invalida sessão no backend e remove o cookie.
- `authClient.forgetPassword({ email, redirectTo })` — dispara e-mail de reset com link para `redirectTo?token=...`.
- `authClient.resetPassword({ newPassword })` — lê o `token` da URL atual automaticamente.

Todas as rotas de negócio existentes (`/api/jogador/*`, `/api/abelha/*`) continuam iguais, mas agora autenticam pelo **cookie de sessão**, não mais por header `Authorization`. Precisam de `withCredentials: true` no `HttpClient`.

O usuário do better-auth só tem os campos padrão (`id`, `email`, `name`, `emailVerified`, ...) — não existe `nomeDeUsuario` no backend novo. `name` é preenchido no cadastro com o que hoje é `nomeDeUsuario`.

## Infraestrutura alterada

- **Nova dependência**: `better-auth` (pnpm). Client instanciado em `src/app/core/auth/auth-client.ts`:
  ```ts
  export const authClient = createAuthClient({ baseURL: `${API_BASE_URL}/autenticacao` });
  ```
- **`src/app/core/auth/auth.service.ts`** — reescrito:
  - Sai: decodificação de JWT, `localStorage`, signal `token`.
  - Entra: signal privado `_sessao` (`{ user, session } | null`), populado (a) no construtor via `authClient.getSession()` e (b) diretamente pelo `data` retornado de `signUp`/`signIn`/`signOut` (sem novo round-trip a cada mutação).
  - `usuarioLogado` computed mantém a forma atual (`{ email, nomeDeUsuario }`), com `nomeDeUsuario` mapeado de `session.user.name` — **nenhum consumidor existente muda** (`perfil.component.ts`, `menu-jogador.component.ts`, `user-menu-trigger.component.ts`, `criar-abelha.component.ts` continuam lendo `usuarioLogado()?.nomeDeUsuario`).
  - `autenticado` computed vira `_sessao() !== null` (equivalente ao que já existe, só troca a fonte).
  - Promise `pronto: Promise<boolean>` exposta, resolvida quando o `getSession()` inicial termina — é o que o guard aguarda.
  - Métodos novos: `cadastrar()` (chama `signUp.email`), `login()` (chama `signIn.email`), `loginComGoogle()`, `logout()` (chama `signOut()`, limpa `_sessao` imediatamente — não espera resposta, mesmo comportamento síncrono que `menu-jogador.component.ts` já assume hoje), `esqueciSenha()`, `redefinirSenha()`.
- **`src/app/core/auth/auth.guard.ts`** — vira assíncrono: aguarda `authService.pronto` antes de checar `autenticado()`.
- **`src/app/core/auth/auth.interceptor.ts`** — perde a lógica de `Authorization: Bearer`. Passa a: (a) clonar toda requisição com `withCredentials: true`; (b) manter o 401 → `authService.logout()` + redirecionar para `/login`.
- **`app.config.ts`** — `provideHttpClient(withFetch(), withInterceptors([authInterceptor]))`. `withFetch()` troca o backend do `HttpClient` de XHR para `fetch`, alinhando com o `authClient` (que usa `fetch` internamente) — reduz risco de cookie divergente entre os dois, principalmente em jsdom.

## Fluxo de telas

```
/cadastro ──► /verificar-email (aviso)
/login ──► /abelhas (já existente)
/login ──► /esqueci-senha ──► (e-mail) ──► /redefinir-senha ──► /login
/login ──► Google ──► (consentimento) ──► /abelhas
```

### `/login` (`login.component.ts`)
Troca `authService.login({ email, senha })` (já era assim, só muda a implementação interna) — sem mudança de UI nos campos. Adiciona:
- Botão "Continuar com Google" abaixo do `<hr>`, chama `authService.loginComGoogle()`.
- Tratamento de erro específico quando o backend indica e-mail não verificado (better-auth retorna um `code` de erro distinguível) — mensagem no `bee-indicator` orientando a checar o e-mail, em vez do genérico "Não foi possível entrar."

### `/cadastro` (`cadastro.component.ts`)
Mesmos campos (`nomeDeUsuario`, `email`, `senha`) — `nomeDeUsuario` vai como `name` para `signUp.email`. Muda o `onSubmit`: em vez de `cadastrar()` → `login()` → `/abelhas`, agora é só `cadastrar()` → navega para `/verificar-email` (login automático não funcionaria mesmo, o backend exige e-mail confirmado primeiro). Também ganha o botão do Google.

### `/verificar-email` (nova, `verificar-email.component.ts`)
Tela estática, sem form: "Enviamos um link de confirmação para o seu e-mail. Clique nele para ativar sua conta.", com link para `/login`. Reaproveita `bee-card`/`bee-card-content` do padrão login/cadastro.

### `/esqueci-senha` (nova, `esqueci-senha.component.ts`)
Form com um campo e-mail. Submit chama `authService.esqueciSenha({ email, redirectTo: <origin>/redefinir-senha })`. Sucesso mostra mensagem "Se o e-mail existir, enviamos um link" (sem confirmar/negar existência da conta) via `bee-indicator` e mantém o usuário na tela.

### `/redefinir-senha` (nova, `redefinir-senha.component.ts`)
Form com um campo "nova senha" (mesma validação de força que o cadastro: mín. 8, maiúscula/minúscula/número/símbolo). Submit chama `authService.redefinirSenha({ newPassword })` (o `token` já vem na query string, o `authClient` extrai sozinho). Sucesso navega para `/login` com indicação de sucesso.

### Rotas (`app.routes.ts`)
Adiciona `esqueci-senha`, `redefinir-senha`, `verificar-email` como rotas públicas (mesmo padrão `loadComponent` lazy das existentes), sem guard.

## Testes

Specs de integração existentes que dependem do `AuthService` (`src/test/integration/auth.integration.spec.ts`, `jogador.integration.spec.ts`, `abelha-progresso.integration.spec.ts`, `abelha-economia.integration.spec.ts`) rodam contra o backend real em `../new-back` e hoje fazem `authService.cadastrar(...)` + `authService.login(...)` e depois checam `authService.token()`/`authService.autenticado()`. Precisam de ajuste:

- `authService.token()` deixa de existir (não há mais token manipulável no cliente) — asserções trocam para `authService.autenticado()` e/ou `authService.usuarioLogado()`.
- Como `requireEmailVerification: true` está ligado no backend real, um `cadastrar()` + `login()` imediato **não** resulta em sessão válida (e-mail ainda não confirmado) — os specs que hoje encadeiam cadastro→login pra testar outras coisas (jogador, abelha-progresso, abelha-economia) precisam de uma forma de contornar isso para continuar testáveis localmente. Duas opções a decidir durante a implementação: (a) o backend expor um jeito de auto-verificar em ambiente de teste, ou (b) esses specs passam a testar só o que dá pra testar sem sessão verificada, documentando a limitação. Fica como ponto em aberto — não bloqueia o design do front, mas bloqueia rodar esses specs localmente até resolver.
- `auth.integration.spec.ts` em si é reescrito para cobrir `cadastrar` → sucesso, cadastro duplicado → erro, login com senha errada → erro, e (se o ponto acima for resolvido) login bem-sucedido → `autenticado() === true`.

## Riscos / pontos em aberto

- **Cookie em jsdom**: `authClient` usa `fetch`; `withFetch()` alinha o `HttpClient` ao mesmo backend, mas o comportamento exato de cookie jar entre chamadas `fetch` sucessivas dentro do jsdom (Vitest) não está validado — pode exigir ajuste fino (ex.: headers manuais, ou rodar esses specs fora do jsdom) durante a implementação.
- **E-mail de verificação em ambiente local**: os specs de integração e o fluxo manual de teste dependem do Resend de fato enviar e-mail (ou de uma chave dummy configurada) — como resolver isso para desenvolvimento/teste é uma decisão do backend, listada aqui só porque bloqueia validar o fluxo ponta a ponta no front.
- Sem refresh automático de sessão no design atual — se a sessão expirar, o 401 do interceptor já cobre (desloga + redireciona), mesmo comportamento que existe hoje para token expirado.
