<!--
  Card de produto — variante Ninho (bebê e infantil).

  ── A ETIQUETA DE FASE ───────────────────────────────────────────────────
  O que só existe aqui é a `.ui-fase` no topo da foto. Ela repete, no card, o
  mesmo vocabulário da `FaseSection` da home: o cliente aprende os cortes de
  idade numa tela e reconhece nas outras. É o eixo do tema — quem compra para
  bebê não pergunta a categoria, pergunta se serve na idade.

  Deixá-la SOBRE a foto e não abaixo do nome é proposital: ela precisa ser
  legível na varredura da vitrine, antes da leitura do título.

  ATENÇÃO: a fase aqui é ESTÁTICA. Ligar de verdade depende de ela estar
  cadastrada como especificação de produto. Consta no README.

  ── FORMA ────────────────────────────────────────────────────────────────
  Raio grande, sem borda, sombra suave — o oposto do canto reto da Bitola e da
  Lapidar. Foto quadrada com respiro interno: enxoval fotografado costuma vir
  com fundo claro, e a moldura branca em volta faz a peça parecer embalada.
-->
<template>
  <article
    ref="card"
    :data-sku="product.sku"
    class="group relative mx-auto h-full max-w-[320px] py-2"
  >
    <div
      class="flex h-full flex-col overflow-hidden rounded-3xl bg-white p-2.5
      shadow-sm transition hover:shadow-md"
    >
      <ALink :href="link" class="flex grow flex-col no-underline">
        <div class="relative overflow-hidden rounded-2xl bg-base-100">
          <AImg
            v-if="images?.length"
            :picture="images[0]"
            :alt="title"
            class="block aspect-square w-full object-cover transition-transform
            duration-500 md:group-hover:scale-105"
          />
          <div v-else class="aspect-square w-full bg-base-100" />

          <span class="absolute left-2 top-2 z-20 bg-white/90 ui-fase">
            0 a 3 meses
          </span>
          <span
            v-if="discountPercentage"
            class=":uno: absolute right-2 top-2 z-20 rounded-full bg-secondary
            px-2 py-0.5 text-[0.6875rem] font-bold text-base-900"
          >
            -{{ discountPercentage }}%
          </span>
        </div>

        <component
          :is="headingTag"
          class="mt-3 line-clamp-2 px-1 text-sm font-semibold leading-snug"
          :class="isActive ? 'text-base-900' : 'text-base-500'"
        >
          {{ title }}
        </component>

        <div class="mt-auto px-1 pt-2">
          <div v-if="isActive" class="[&_*]:font-bold [&_.text-xl]:text-xl">
            <Prices :product="product" />
          </div>
          <span v-else class="bg-warning-100 text-warning-800 ui-badge">
            {{ !isInStock ? $t.i19outOfStock : $t.i19inactive }}
          </span>
        </div>
      </ALink>

      <!--
        Duas ações lado a lado, e a segunda é a que caracteriza o nicho: quem
        navega loja de bebê muitas vezes NÃO está comprando — está montando a
        lista do chá. Sem esse caminho a visita se perde.

        Fica fora do `ALink` (botão dentro de `<a>` navega ao clicar).
      -->
      <div v-if="isActive && !hasVariations" class="flex gap-1.5 px-1 pb-1 pt-3">
        <button
          class=":uno: grow ui-btn-sm ui-btn-primary"
          @click.stop.prevent="loadToCart(1)"
        >
          {{ $t.i19addToCart }}
        </button>
        <a
          :href="`/p/lista-de-presentes?sku=${encodeURIComponent(product.sku || '')}`"
          class=":uno: shrink-0 ui-btn-sm ui-btn-secondary"
          aria-label="Adicionar à lista de presentes"
          title="Adicionar à lista de presentes"
        >
          <!-- Nome CRU do Solar: lá não existe `gift`, só `gift-bold`,
               `gift-linear` etc. `i-gift` sozinho não casa e o UnoCSS falha
               em silêncio. -->
          <i class="size-4 i-gift-linear"></i>
        </a>
      </div>
      <p v-if="isFailedToCart" class="px-1 pt-1 text-xs text-warning-800">
        {{ $t.i19someItemIsUnavailable }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  type Props as UseProductCardProps,
  useProductCard,
} from '@@sf/composables/use-product-card';
import Prices from '~/components/Prices.vue';

export type Props = UseProductCardProps & {
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
const props = withDefaults(defineProps<Props>(), {
  headingTag: 'h3',
});
const {
  product,
  title,
  link,
  images,
  isInStock,
  isActive,
  discountPercentage,
  hasVariations,
  loadToCart,
  isFailedToCart,
} = useProductCard(props as UseProductCardProps);
const card = ref<HTMLElement | null>(null);
</script>
