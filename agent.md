# Agenda de Requisitos — Plataforma de Vídeos Tutoriais de IA para Mulheres

## 1. Visão geral do projeto

Site simples que hospeda vídeos tutoriais para ensinar mulheres de todas as
faixas etárias a usar inteligência artificial. Os vídeos são gravados pela
própria equipe e hospedados de forma **privada no YouTube**, sendo exibidos
(embutidos) dentro do site.

Foco da primeira versão: **expor as informações de forma clara, direta e com
o mínimo de chance de erro do usuário**. Nada de fluxos complexos.

Público-alvo: mulheres de todas as idades, com atenção especial a usuárias
idosas e/ou com pouca familiaridade com tecnologia.

---

## 2. Requisitos funcionais (o que eu quero)

- [ ] RF01 — Listar vídeos tutoriais em formato de grade/cards visuais
      (thumbnail grande, título, duração aproximada).
- [ ] RF02 — Reproduzir vídeo embutido do YouTube (modo privado/unlisted)
      diretamente na página, sem redirecionar para o YouTube.
- [ ] RF03 — Campo de busca textual que filtra os vídeos por título/palavra-chave.
- [ ] RF04 — Agrupar/categorizar vídeos por tema ou nível (ex: "Primeiros
      passos", "Assistentes de IA no dia a dia", "Cuidados e segurança").
- [ ] RF05 — Página/seção inicial com instruções simples de "por onde
      começar" (ex: "Nunca usei IA antes → comece aqui").
- [ ] RF06 — Layout responsivo: funciona bem tanto em celular quanto em
      desktop, sem quebra de elementos.
- [ ] RF07 — Botão "voltar ao topo" ou navegação simplificada quando a
      lista de vídeos crescer.

## 3. Requisitos não funcionais (qualidade, acessibilidade, UX)

- [ ] RNF01 — **Fontes grandes** (corpo de texto mínimo recomendado: 18–20px
      no desktop, nunca menor que 16px no mobile).
- [ ] RNF02 — **Alto contraste** de cor entre texto e fundo (mínimo AA da
      WCAG, idealmente AAA nos textos principais).
- [ ] RNF03 — Poucos cliques até o conteúdo: da tela inicial ao vídeo
      sendo reproduzido, no máximo 2 cliques.
- [ ] RNF04 — Interface **muito visual**: ícones grandes, thumbnails
      grandes, pouco texto corrido, uso de imagens/ilustrações de apoio.
- [ ] RNF05 — Linguagem simples e direta em todos os textos (evitar termos
      técnicos sem explicação).
- [ ] RNF06 — Botões e áreas clicáveis grandes (mínimo 44x44px, adequado
      para toque e para quem tem menor precisão motora).
- [ ] RNF07 — Sem dependência de gestos complexos (swipe múltiplo,
      duplo-toque, hover-only) — tudo deve funcionar com clique/toque simples.
- [ ] RNF08 — Feedback visual claro para toda ação (ex: campo de busca
      mostra resultado ou mensagem de "nenhum vídeo encontrado").
- [ ] RNF09 — Performance: carregamento rápido mesmo em conexões mais
      lentas (imagens otimizadas, sem excesso de scripts).
- [ ] RNF10 — Compatível com leitores de tela básicos (uso de `alt` em
      imagens, HTML semântico, labels em campos de formulário).

## 4. O que eu NÃO quero (fora de escopo / restrições explícitas)

- [ ] NQ01 — **Sem cadastro/login obrigatório** para assistir aos vídeos
      (nesta primeira fase).
- [ ] NQ02 — **Sem comentários, fóruns ou redes sociais** dentro do site.
- [ ] NQ03 — **Sem anúncios/publicidade de terceiros.**
- [ ] NQ04 — **Sem hospedar os arquivos de vídeo diretamente** — vídeos
      ficam sempre no YouTube (privado), o site apenas embute o player.
- [ ] NQ05 — **Sem menus complexos, sanduíche escondendo conteúdo
      importante, ou navegação em múltiplos níveis.**
- [ ] NQ06 — Sem pop-ups, modais de newsletter ou interrupções não
      solicitadas.
- [ ] NQ07 — Sem depender de plugins externos que exijam instalação pelo
      usuário.
- [ ] NQ08 — Sem funcionalidades de pagamento/assinatura nesta fase.
- [ ] NQ09 — Sem área administrativa complexa nesta primeira versão — a
      curadoria de vídeos pode começar como um arquivo/lista simples mantida
      pela equipe.

---

## 5. Fluxo de navegação esperado (simples, sem fricção)

1. Usuária entra no site → vê título claro + explicação curta do
   propósito + destaque "comece por aqui".
2. Usuária vê uma grade de vídeos com imagens grandes e títulos simples,
   ou usa a busca.
3. Usuária clica no vídeo → vídeo abre e já reproduz na própria página.
4. Usuária pode voltar facilmente para a lista (botão visível, não
   depende de "voltar do navegador").

Não deve haver etapa em que a usuária "não sabe o que fazer a seguir".

---

## 6. Testes (abordagem TDD/BDD)

Os testes abaixo devem ser escritos **antes** da implementação de cada
funcionalidade, seguindo o ciclo *red → green → refactor*. Formato
Dado/Quando/Então (Gherkin) para servir tanto de especificação quanto de
base para testes automatizados (ex: Playwright/Cypress para E2E, Jest/
Vitest para unidade).

### 6.1 Listagem de vídeos (RF01)

```
Cenário: Exibir lista de vídeos na página inicial
  Dado que existem vídeos cadastrados
  Quando a usuária acessa a página inicial
  Então ela deve ver um card para cada vídeo
  E cada card deve exibir thumbnail, título e duração
```

```
Cenário: Página inicial sem nenhum vídeo cadastrado
  Dado que não existem vídeos cadastrados
  Quando a usuária acessa a página inicial
  Então deve ser exibida uma mensagem amigável explicando a ausência de conteúdo
```

### 6.2 Reprodução de vídeo (RF02)

```
Cenário: Reproduzir vídeo a partir da lista
  Dado que a usuária está na página inicial
  Quando ela clica em um card de vídeo
  Então o player do YouTube deve carregar embutido na mesma página
  E o vídeo deve iniciar sem redirecionar para youtube.com
```

```
Cenário: Vídeo indisponível ou removido
  Dado que um vídeo da lista foi removido/privado incorretamente
  Quando a usuária tenta reproduzi-lo
  Então uma mensagem de erro simples deve ser exibida
  E deve haver um caminho claro de volta à lista de vídeos
```

### 6.3 Busca (RF03)

```
Cenário: Buscar vídeo existente
  Dado que existe um vídeo com o título "Como usar o ChatGPT"
  Quando a usuária digita "chatgpt" no campo de busca
  Então o vídeo "Como usar o ChatGPT" deve aparecer nos resultados
```

```
Cenário: Buscar termo inexistente
  Dado que nenhum vídeo contém o termo pesquisado
  Quando a usuária pesquisa por "xyz123"
  Então deve ser exibida a mensagem "nenhum vídeo encontrado"
  E deve haver um botão/link para limpar a busca e ver todos os vídeos
```

```
Cenário: Busca é case-insensitive e ignora acentuação
  Dado que existe um vídeo chamado "Inteligência Artificial no dia a dia"
  Quando a usuária busca por "inteligencia artificial" (sem acento, minúsculo)
  Então o vídeo correspondente deve aparecer nos resultados
```

### 6.4 Responsividade (RF06)

```
Cenário: Visualização em celular
  Dado que a usuária acessa o site em uma tela de 375px de largura
  Quando a página inicial é carregada
  Então os cards de vídeo devem se reorganizar em coluna única
  E nenhum elemento deve ultrapassar a largura da tela (sem scroll horizontal)
```

```
Cenário: Visualização em desktop
  Dado que a usuária acessa o site em uma tela de 1440px de largura
  Quando a página inicial é carregada
  Então os cards de vídeo devem se organizar em grade de múltiplas colunas
```

### 6.5 Acessibilidade / legibilidade (RNF01, RNF02, RNF10)

```
Cenário: Contraste mínimo de texto
  Dado qualquer texto principal do site
  Quando o contraste entre texto e fundo é medido
  Então a razão de contraste deve ser de no mínimo 4.5:1 (WCAG AA)
```

```
Cenário: Tamanho mínimo de fonte
  Dado qualquer bloco de texto de leitura no site
  Quando o tamanho de fonte é verificado
  Então deve ser de no mínimo 16px, com 18-20px nos textos de corpo principal
```

```
Cenário: Navegação por teclado
  Dado que a usuária navega apenas pelo teclado (Tab)
  Quando ela percorre a página
  Então todos os elementos interativos (cards, busca, botões) devem ser
  alcançáveis e ter indicação visual clara de foco
```

### 6.6 Fluxo geral / poucos cliques (RNF03)

```
Cenário: Chegar a um vídeo em no máximo 2 cliques
  Dado que a usuária está na página inicial
  Quando ela clica em um card de vídeo
  Então o vídeo deve começar a reproduzir nesse mesmo clique (1 clique)
  E não deve haver etapas intermediárias obrigatórias (confirmações, logins, etc.)
```

---

## 7. Critérios de aceite da primeira versão (MVP)

- [ ] Todos os cenários da seção 6 passam (testes automatizados verdes).
- [ ] Auditoria de acessibilidade (ex: Lighthouse) com nota de
      Acessibilidade ≥ 90.
- [ ] Testado manualmente por pelo menos uma pessoa idosa fora da equipe
      de desenvolvimento, sem instruções prévias, conseguindo assistir a
      um vídeo sozinha.
- [ ] Site funcional em pelo menos: Chrome mobile, Safari mobile, Chrome
      desktop.
- [ ] Nenhum dos itens da seção 4 ("O que eu não quero") está presente.

---

## 8. Observações / próximos passos (fora do MVP, não iniciar agora)

- Área de administração para facilitar a equipe a adicionar novos vídeos
  sem editar código.
- Categorização mais avançada / trilhas de aprendizado sequenciais.
- Métricas simples de quais vídeos são mais assistidos.
