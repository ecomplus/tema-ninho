# Ninho — loja demo do nicho de bebê e infantil

Cópia do starter [`ecomplus/store`](https://github.com/ecomplus/store)
tematizada para **enxoval, quarto, passeio e alimentação** de bebê.

> **Página de segmento escrita; demo ainda NÃO publicada.**
> `/segmentos/bebe-e-infantil` (Bebê e infantil) já existe em `www.e-com.plus`, na branch
> `feature/beleza`, e aponta para `tema-ninho.web.app` — que ainda responde
> 404. **Publicar a demo antes de subir o site**, senão a página institucional
> sai com link morto.
>
> Não há marca em `src/config/brands.ts`: aquele arquivo é a camada das
> variantes `/demo/<slug>`, que é outra coisa. Nome, logo e domínio aqui são
> placeholders.

## A tese do tema: o eixo é FASE, não departamento

O catálogo infantil é organizado por departamento — enxoval, passeio,
alimentação — porque é assim que o **estoque** é organizado. Só que ninguém
compra assim. Quem compra pergunta *"meu filho tem 4 meses, o que serve
agora?"*, e a resposta atravessa todos os departamentos ao mesmo tempo.

A `FaseSection` é esse eixo transversal, e a etiqueta `.ui-fase` reaparece no
card para que o cliente aprenda o vocabulário numa tela e o reconheça nas
outras.

Os cortes seguem viradas de uso reais, não uma régua bonita:

| Fase | O que muda |
|---|---|
| Gestante | monta a lista |
| 0 a 3 meses | enxoval e berço |
| 3 a 6 meses | entra alimentação |
| 6 a 12 meses | senta e engatinha |
| 1 a 2 anos | já anda |

## O que é diferente aqui

| Peça | O que muda |
|---|---|
| `sections/FaseSection.astro` | Faixa de fases, com rolagem horizontal e `snap` no mobile. |
| `components/ProductCard.vue` | Etiqueta de fase **sobre a foto**, legível na varredura. |
| `components/ProductCard.vue` | Segundo botão: **lista de presentes**, ao lado do "adicionar". |
| `assets/style.css` | Botão em **pílula**, sem caixa alta — uppercase em tema infantil lê como aviso. |
| `tailwind.config.js` | Raio **0.875rem** (o maior do conjunto), neutro quente, fundo `#fdfbf7`. |

### Por que o botão de lista de presentes

Quem navega loja de bebê muitas vezes **não está comprando** — está montando a
lista do chá. Sem esse caminho no card a visita se perde. É a única variante do
conjunto com duas ações concorrentes na vitrine.

### Por que não é rosa e azul

A paleta pastel clássica do nicho é dividida por gênero, que hoje é atrito de
compra, e ela **some contra foto de enxoval**, que já é quase toda em tom
claro. O verde-sálvia dá contorno à foto; a terracota fica só para a ação.

O fundo é creme e não branco porque berçário fotografado em luz natural puxa
amarelo, e um fundo frio ao lado disso deixa a foto encardida.

## ⚠️ O que é estático

| O quê | Onde | Como ligar |
|---|---|---|
| "0 a 3 meses" no card | `ProductCard.vue` | `specifications.fase` no produto |
| Fases da faixa | `FaseSection.astro` | Vira filtro por spec em vez de busca por texto |
| `/p/lista-de-presentes` | `ProductCard.vue` | Extra-page ainda **não criada** — ver pendências |

Hoje a fase vira **termo de busca** (`/s?q=`). A própria seção diz isso ao
visitante numa nota de rodapé. **Manter** enquanto o catálogo de demo não tiver
a especificação cadastrada.

## Pendências conhecidas

- **`/p/lista-de-presentes` não existe.** O botão de presente do card aponta
  para ela. É o mesmo defeito que a Raia teve na primeira rodada (seis
  extra-pages linkadas e inexistentes) — criar a extra-page antes de publicar.
- **`/p/fases`**, linkada no pitch bar, também não existe ainda.

## Rodar

```bash
npm i
npm run dev                                   # http://localhost:3000
BUILD_OUTPUT=static npx cloudcommerce build --codebase ssr
```

## Armadilhas herdadas do conjunto

- `/s/<termo>` **não funciona no build estático** — usar `/s?q=<termo>`.
- Ícone que não casa **some em silêncio** no UnoCSS. No Solar não existe
  `gift`, só `gift-linear`, `gift-bold` etc. Na dúvida, forma prefixada:
  `i-solar-<nome>`.
- **Botão dentro de `<a>` navega ao clicar** — a linha de compra fica fora do
  `ALink`, e a moldura do card passou para a div que envolve os dois.
- `cloudcommerce build` **regenera o `firebase.json`** — buildar primeiro,
  escrever a config depois.
