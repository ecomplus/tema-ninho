import { fileURLToPath } from 'node:url';
// Solar: cantos arredondados e variantes preenchidas — o conjunto que menos
// destoa de uma tipografia de terminação redonda.
import { icons as iSolar } from '@iconify-json/solar';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
process.env.STOREFRONT_BASE_DIR = __dirname;

// eslint-disable-next-line import/first
import { genTailwindConfig } from '@cloudcommerce/storefront/config/storefront.tailwind.mjs';

/*
 * Tema da variante "Ninho" (bebê e infantil).
 *
 * As cores de marca (primary/secondary) NÃO vêm daqui: são lidas de
 * `content/settings.json` pelo próprio `genTailwindConfig`, para continuarem
 * editáveis pelo CMS. Aqui fica só o que o CMS não expõe.
 *
 * Verde-sálvia com terracota — e explicitamente NÃO o rosa-e-azul-bebê que o
 * nicho usa por hábito. Dois motivos: a paleta pastel clássica é dividida por
 * gênero, que hoje é atrito de compra, e ela some contra foto de enxoval, que
 * já é quase toda em tom claro. O sálvia dá contorno à foto; a terracota fica
 * só para a ação.
 *
 * Neutro QUENTE em creme, não branco: berçário fotografado em luz natural
 * puxa amarelo, e um fundo frio ao lado disso deixa a foto encardida.
 *
 * TODO: validar — este nicho ainda NÃO tem marca em
 * `www.e-com.plus/src/config/brands.ts` nem página de segmento. A paleta é
 * proposta, não veio de levantamento de temas campeões do nicho.
 */
const themeOptions = {
  generalIconSets: [iSolar],
  baseColor: {
    50: '#fdfbf7',
    100: '#f7f2ea',
    200: '#ece4d8',
    300: '#dbcfbe',
    400: '#b8a893',
    500: '#94836e',
    600: '#776957',
    700: '#5f5346',
    800: '#463d34',
    900: '#2b2520',
    950: '#171310',
  },
};

const tailwindConfig = genTailwindConfig(themeOptions);

// Raio generoso: é o tema mais arredondado do conjunto, contra o canto reto
// da Bitola e da Lapidar.
tailwindConfig.theme.extend.borderRadius = {
  ...tailwindConfig.theme.extend.borderRadius,
  DEFAULT: '0.875rem',
};

export default {
  ...tailwindConfig,
  themeOptions,
};
