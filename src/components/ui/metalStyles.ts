import type { MetalFinish } from '@/types/store';

export interface MetalSwatchStyle {
  background: string;
  borderColor: string;
  shortLabel: string;
}

/**
 * Visual metallic gradient tokens for interactive MetalFinish swatch dots.
 */
export const METAL_SWATCH_STYLES: Record<MetalFinish, MetalSwatchStyle> = {
  'Yellow Gold': {
    background: 'linear-gradient(135deg, #E5C77A 0%, #C69C4D 55%, #9B742E 100%)',
    borderColor: '#AE8439',
    shortLabel: 'Yellow Gold',
  },
  'Rose Gold': {
    background: 'linear-gradient(135deg, #EBC0AC 0%, #CE9078 55%, #A66B56 100%)',
    borderColor: '#B57A64',
    shortLabel: 'Rose Gold',
  },
  'White Gold': {
    background: 'linear-gradient(135deg, #F7F6F2 0%, #DCD8D0 55%, #B8B3AA 100%)',
    borderColor: '#B5AFA6',
    shortLabel: 'White Gold',
  },
  '18K Gold Vermeil': {
    background: 'linear-gradient(135deg, #E8CA7E 0%, #C69C4D 55%, #A17830 100%)',
    borderColor: '#AE8439',
    shortLabel: '18K Vermeil',
  },
  'Rhodium Silver': {
    background: 'linear-gradient(135deg, #F3F4F5 0%, #CED1D4 55%, #9FA4A8 100%)',
    borderColor: '#A9AEB3',
    shortLabel: 'Rhodium Silver',
  },
};
