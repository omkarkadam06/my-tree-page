import React, { useState, useEffect, useMemo, useCallback } from 'react';

// Destructure whichever icons you need directly from the global window object
const {  Sparkles,
  Award,
  TrendingUp,
  Leaf,
  GitBranch,
  Flower2,
  Sprout,
  ShieldCheck,
  Sun,
  Moon,
  CloudRain,
  Sunrise,
  Bird,
  Play,
  RotateCcw,
  Info,
  CheckCircle2,
  Sliders,
  BookOpen,
  Flame,
  Zap,
  Compass,
  X,
  Eye,
  Trees,
  Trophy,
  Lock,
  Unlock,
  Star,
  Heart,
  Layers } = lucideReact; 

const TREE_SPECIES = {
  mango: {
    id: 'mango',
    name: 'Mango Tree',
    shortName: 'Mango',
    botanical: 'Mangifera indica',
    tagline: 'Lush tropical emerald canopy with golden-blush Alphonso mangoes',
    fruitName: 'Golden Mango',
    fruitPlural: 'Mangoes',
    blossomName: 'Cream-Gold Panicle Bloom',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    cardActiveClass: 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/25',
    accentColor: '#F59E0B',
    trunkStops: ['#4E342E', '#6D4C41', '#3E2723'],
    leafColors: ['#15803D', '#16A34A', '#14532D', '#22C55E'],
    leafHighlight: '#4ADE80',
    leafShadow: '#052E16',
    flowerPetal: '#FDE68A',
    flowerCenter: '#D97706'
  },
  apple: {
    id: 'apple',
    name: 'Apple Tree',
    shortName: 'Apple',
    botanical: 'Malus domestica',
    tagline: 'Classic orchard crown with blush blossoms & crisp ruby-red apples',
    fruitName: 'Ruby Apple',
    fruitPlural: 'Apples',
    blossomName: 'Blush-Pink Orchard Blossom',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
    cardActiveClass: 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-500/25',
    accentColor: '#E11D48',
    trunkStops: ['#5D4037', '#795548', '#3E2723'],
    leafColors: ['#16A34A', '#22C55E', '#15803D', '#4ADE80'],
    leafHighlight: '#86EFAC',
    leafShadow: '#14532D',
    flowerPetal: '#FFE4E6',
    flowerCenter: '#FBBF24'
  },
  orange: {
    id: 'orange',
    name: 'Orange Tree',
    shortName: 'Orange',
    botanical: 'Citrus × sinensis',
    tagline: 'Glossy citrus leaves with fragrant white neroli blooms & zesty oranges',
    fruitName: 'Zesty Orange',
    fruitPlural: 'Oranges',
    blossomName: 'Fragrant White Neroli Star',
    badgeClass: 'bg-orange-100 text-orange-900 border-orange-300',
    cardActiveClass: 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-500/25',
    accentColor: '#EA580C',
    trunkStops: ['#5C4033', '#8B5A2B', '#3E2723'],
    leafColors: ['#047857', '#059669', '#065F46', '#10B981'],
    leafHighlight: '#34D399',
    leafShadow: '#064E3B',
    flowerPetal: '#FFFFFF',
    flowerCenter: '#F59E0B'
  },
  gulmohar: {
    id: 'gulmohar',
    name: 'Gulmohar Tree',
    shortName: 'Gulmohar',
    botanical: 'Delonix regia (Flame of the Forest)',
    tagline: 'Spreading fern-like umbrella canopy ablaze with scarlet blooms & pods',
    fruitName: 'Royal Gulmohar Pod',
    fruitPlural: 'Gulmohar Pods',
    blossomName: 'Fiery Scarlet Flame Bloom',
    badgeClass: 'bg-red-100 text-red-900 border-red-300',
    cardActiveClass: 'border-red-500 bg-red-50/80 ring-2 ring-red-500/25',
    accentColor: '#DC2626',
    trunkStops: ['#6D4C41', '#8D6E63', '#4E342E'],
    leafColors: ['#65A30D', '#84CC16', '#4D7C0F', '#16A34A'],
    leafHighlight: '#BEF264',
    leafShadow: '#365314',
    flowerPetal: '#EF4444',
    flowerCenter: '#FEF08A'
  },
  cherry: {
    id: 'cherry',
    name: 'Cherry Tree',
    shortName: 'Cherry',
    botanical: 'Prunus avium / Sakura',
    tagline: 'Pastel sakura canopy with drifting petals & glossy twin sweet cherries',
    fruitName: 'Sweet Twin Cherries',
    fruitPlural: 'Twin Cherries',
    blossomName: 'Pink Sakura Blossom',
    badgeClass: 'bg-pink-100 text-pink-900 border-pink-300',
    cardActiveClass: 'border-pink-500 bg-pink-50/80 ring-2 ring-pink-500/25',
    accentColor: '#DB2777',
    trunkStops: ['#4A2525', '#6E3B3B', '#2D1414'],
    leafColors: ['#EC4899', '#F472B6', '#22C55E', '#FB7185'],
    leafHighlight: '#FBCFE8',
    leafShadow: '#831843',
    flowerPetal: '#F9A8D4',
    flowerCenter: '#FEF08A'
  }
};

const BADGE_CATALOG = [
  {
    id: 1,
    name: 'Problem Solver',
    category: 'Critical Thinking',
    xpBonus: '+100 XP',
    color: '#FF6B8B',
    centerColor: '#FFD166',
    description: 'Solved 10 complex multi-step challenges without giving up.',
    x: -78,
    y: -175
  },
  {
    id: 2,
    name: 'Streak Champion',
    category: 'Consistency Habit',
    xpBonus: '+120 XP',
    color: '#FF9F1C',
    centerColor: '#FFF3B0',
    description: 'Completed learning activities for 14 consecutive days.',
    x: -35,
    y: -235
  },
  {
    id: 3,
    name: 'Deep Thinker',
    category: 'Reflection & Inquiry',
    xpBonus: '+90 XP',
    color: '#A78BFA',
    centerColor: '#FDE047',
    description: 'Asked insightful questions and connected concepts across lessons.',
    x: 82,
    y: -185
  },
  {
    id: 4,
    name: 'Concept Master',
    category: 'Topic Mastery',
    xpBonus: '+150 XP',
    color: '#38BDF8',
    centerColor: '#FEF9C3',
    description: 'Achieved 98% accuracy across core unit mastery checkpoints.',
    x: -112,
    y: -128
  },
  {
    id: 5,
    name: 'Peer Helper',
    category: 'Collaboration',
    xpBonus: '+80 XP',
    color: '#C084FC',
    centerColor: '#FEF08A',
    description: 'Helped 3 classmates debug their assignments in study group.',
    x: 0,
    y: -275
  },
  {
    id: 6,
    name: 'Creative Spark',
    category: 'Innovation',
    xpBonus: '+110 XP',
    color: '#EC4899',
    centerColor: '#FEF08A',
    description: 'Submitted an original project approach in Science & Art.',
    x: 45,
    y: -245
  },
  {
    id: 7,
    name: 'Quiz Ace',
    category: 'Test Excellence',
    xpBonus: '+140 XP',
    color: '#10B981',
    centerColor: '#FEF08A',
    description: 'Scored 95%+ on 3 consecutive unit performance assessments.',
    x: -68,
    y: -215
  },
  {
    id: 8,
    name: 'Resilient Hero',
    category: 'Bounce-Back Grit',
    xpBonus: '+130 XP',
    color: '#F43F5E',
    centerColor: '#FDE68A',
    description: 'Retook a tough quiz after reviewing mistakes and improved by 40%.',
    x: 115,
    y: -135
  }
];

const FRUIT_MILESTONES = [
  {
    id: 1,
    title: 'Unit 1 Assessment: 95% A+',
    subject: 'Mathematics Foundations',
    score: '95%',
    x: -55,
    y: -148,
    delay: '0s'
  },
  {
    id: 2,
    title: 'Science Lab Test: 92%',
    subject: 'Living Ecosystems',
    score: '92%',
    x: 58,
    y: -152,
    delay: '0.4s'
  },
  {
    id: 3,
    title: 'Reading Mastery Test: 98%',
    subject: 'Language Arts',
    score: '98%',
    x: -22,
    y: -195,
    delay: '0.8s'
  },
  {
    id: 4,
    title: 'Logic & Coding Sprint: 100%',
    subject: 'Computational Thinking',
    score: '100%',
    x: 26,
    y: -202,
    delay: '0.2s'
  },
  {
    id: 5,
    title: 'Mid-Term Synthesis Exam: 94%',
    subject: 'Cross-Subject Mastery',
    score: '94%',
    x: -92,
    y: -158,
    delay: '0.6s'
  },
  {
    id: 6,
    title: 'Geometry Proof Challenge: 96%',
    subject: 'Spatial Reasoning',
    score: '96%',
    x: 94,
    y: -162,
    delay: '1.0s'
  },
  {
    id: 7,
    title: 'Creative Writing Portfolio: 97%',
    subject: 'Storytelling & Expression',
    score: '97%',
    x: -56,
    y: -242,
    delay: '0.3s'
  },
  {
    id: 8,
    title: 'Capstone Honors Distinction: 100%',
    subject: 'Independent Research',
    score: '100%',
    x: 56,
    y: -236,
    delay: '0.7s'
  }
];

const MOOD_THEMES = {
  sunny: {
    id: 'sunny',
    label: 'Sunny & Joyful',
    subtitle: 'Warm sunbeams & floating golden pollen',
    icon: Sun,
    svgSkyTop: '#38BDF8',
    svgSkyMid: '#BAE6FD',
    svgSkyBottom: '#FEF3C7',
    hillBack: '#86EFAC',
    hillFront: '#4ADE80',
    groundTop: '#22C55E',
    soilColor: '#5C4033',
    soilDeep: '#3E2723'
  },
  calm: {
    id: 'calm',
    label: 'Calm & Focused',
    subtitle: 'Serene starlit twilight & glowing fireflies',
    icon: Moon,
    svgSkyTop: '#0F172A',
    svgSkyMid: '#1E1B4B',
    svgSkyBottom: '#134E4A',
    hillBack: '#115E59',
    hillFront: '#0F766E',
    groundTop: '#0D9488',
    soilColor: '#27272A',
    soilDeep: '#18181B'
  },
  energetic: {
    id: 'energetic',
    label: 'Energetic & Inspired',
    subtitle: 'Vibrant sunrise & rainbow horizon',
    icon: Sunrise,
    svgSkyTop: '#D946EF',
    svgSkyMid: '#FB923C',
    svgSkyBottom: '#FEF08A',
    hillBack: '#A3E635',
    hillFront: '#65A30D',
    groundTop: '#4D7C0F',
    soilColor: '#6B4226',
    soilDeep: '#4A2C11'
  },
  cozy: {
    id: 'cozy',
    label: 'Cozy & Reflective',
    subtitle: 'Gentle nourishing rain & warm hanging lantern',
    icon: CloudRain,
    svgSkyTop: '#334155',
    svgSkyMid: '#64748B',
    svgSkyBottom: '#A7F3D0',
    hillBack: '#34D399',
    hillFront: '#10B981',
    groundTop: '#059669',
    soilColor: '#4E342E',
    soilDeep: '#2D1B14'
  }
};

const PRESETS = {
  seedling: {
    id: 'seedling',
    name: 'Day 1 Seedling',
    badge: 'Stage 1',
    description: 'Just registered & beginning the Heycolugo learning journey',
    xp: 20,
    consistency: 22,
    mastery: 20,
    unlockedBadges: [1],
    fruits: 1,
    reflection: 20,
    resilience: 22,
    mood: 'sunny',
    butterflies: 0,
    birds: 0
  },
  explorer: {
    id: 'explorer',
    name: 'Consistent Explorer',
    badge: 'Stage 3',
    description: 'Regular daily streak, curious questions & steady test fruits',
    xp: 62,
    consistency: 75,
    mastery: 65,
    unlockedBadges: [1, 2, 3, 4],
    fruits: 4,
    reflection: 55,
    resilience: 58,
    mood: 'sunny',
    butterflies: 3,
    birds: 1
  },
  resilient: {
    id: 'resilient',
    name: 'Resilient Comeback',
    badge: 'Stage 4',
    description: 'Overcame tough quizzes with deep roots, thick trunk & new shoots',
    xp: 80,
    consistency: 82,
    mastery: 84,
    unlockedBadges: [1, 2, 3, 4, 7, 8],
    fruits: 6,
    reflection: 95,
    resilience: 96,
    mood: 'cozy',
    butterflies: 4,
    birds: 2
  },
  master: {
    id: 'master',
    name: 'Heycolugo Master (Full Bloom & Fruit)',
    badge: 'Stage 5 Max',
    description: 'All 8 badge flowers blooming, 8 ripened fruits, birds & butterflies',
    xp: 100,
    consistency: 100,
    mastery: 100,
    unlockedBadges: [1, 2, 3, 4, 5, 6, 7, 8],
    fruits: 8,
    reflection: 100,
    resilience: 100,
    mood: 'energetic',
    butterflies: 6,
    birds: 4
  }
};

const BRANCH_DATA = [
  { id: 'b1', minMastery: 15, path: 'M -8 -110 Q -55 -130 -95 -165', strokeWidth: 9 },
  { id: 'b2', minMastery: 20, path: 'M 8 -118 Q 58 -138 98 -172', strokeWidth: 9 },
  { id: 'b3', minMastery: 32, path: 'M -6 -165 Q -45 -195 -78 -230', strokeWidth: 7.5 },
  { id: 'b4', minMastery: 40, path: 'M 6 -170 Q 48 -200 82 -235', strokeWidth: 7.5 },
  { id: 'b5', minMastery: 52, path: 'M -52 -135 Q -88 -115 -125 -128', strokeWidth: 5.5 },
  { id: 'b6', minMastery: 60, path: 'M 55 -142 Q 92 -120 128 -135', strokeWidth: 5.5 },
  { id: 'b7', minMastery: 70, path: 'M -2 -200 Q -25 -245 -38 -272', strokeWidth: 6 },
  { id: 'b8', minMastery: 78, path: 'M 3 -202 Q 28 -248 42 -275', strokeWidth: 6 },
  { id: 'b9', minMastery: 86, path: 'M 0 -215 Q 0 -255 0 -290', strokeWidth: 5 },
  { id: 'b10', minMastery: 94, path: 'M -65 -212 Q -95 -232 -115 -218', strokeWidth: 4.5 },
  { id: 'b11', minMastery: 98, path: 'M 68 -216 Q 98 -236 118 -222', strokeWidth: 4.5 }
];

const LEAF_CLUSTERS = [
  { id: 'l1', minConsistency: 8, cx: 0, cy: -215, rx: 48, ry: 38, colorIdx: 0, delay: '0s' },
  { id: 'l2', minConsistency: 16, cx: -65, cy: -165, rx: 44, ry: 34, colorIdx: 1, delay: '0.3s' },
  { id: 'l3', minConsistency: 24, cx: 68, cy: -170, rx: 44, ry: 34, colorIdx: 2, delay: '0.6s' },
  { id: 'l4', minConsistency: 32, cx: -42, cy: -225, rx: 46, ry: 36, colorIdx: 3, delay: '0.2s' },
  { id: 'l5', minConsistency: 40, cx: 45, cy: -228, rx: 46, ry: 36, colorIdx: 0, delay: '0.8s' },
  { id: 'l6', minConsistency: 48, cx: -105, cy: -135, rx: 38, ry: 28, colorIdx: 1, delay: '0.4s' },
  { id: 'l7', minConsistency: 56, cx: 108, cy: -140, rx: 38, ry: 28, colorIdx: 2, delay: '0.7s' },
  { id: 'l8', minConsistency: 64, cx: 0, cy: -268, rx: 52, ry: 40, colorIdx: 3, delay: '0.1s' },
  { id: 'l9', minConsistency: 72, cx: -82, cy: -205, rx: 42, ry: 34, colorIdx: 0, delay: '0.5s' },
  { id: 'l10', minConsistency: 80, cx: 85, cy: -210, rx: 42, ry: 34, colorIdx: 1, delay: '0.9s' },
  { id: 'l11', minConsistency: 88, cx: -35, cy: -155, rx: 45, ry: 35, colorIdx: 3, delay: '0.25s' },
  { id: 'l12', minConsistency: 95, cx: 35, cy: -160, rx: 45, ry: 35, colorIdx: 1, delay: '0.65s' }
];

const SHOOT_DATA = [
  { id: 's1', minReflection: 15, x: -16, y: -42, dir: -1, label: 'Mistake Review: Fractions' },
  { id: 's2', minReflection: 30, x: 16, y: -68, dir: 1, label: 'Weekly Goal Reflection' },
  { id: 's3', minReflection: 45, x: -48, y: -128, dir: -1, label: 'Quiz Retry Journal' },
  { id: 's4', minReflection: 60, x: 52, y: -136, dir: 1, label: 'Self-Assessment Note' },
  { id: 's5', minReflection: 75, x: -25, y: -95, dir: -1, label: 'Growth Mindset Check-in' },
  { id: 's6', minReflection: 90, x: 28, y: -188, dir: 1, label: 'Deep Learning Takeaway' }
];

const TREE_PHILOSOPHY = [
  {
    key: 'species',
    title: 'Registration Tree Species',
    shortRule: 'Mango, Apple, Orange, Gulmohar, or Cherry.',
    detail: 'Chosen at student registration; defines the tree canopy, blossoms, and harvested fruits.',
    icon: Trees,
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-200'
  },
  {
    key: 'xp',
    title: 'Height = XP',
    shortRule: 'XP grows the tree.',
    detail: 'More Experience Points make the tree taller and advance it across 5 developmental stages.',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200'
  },
  {
    key: 'consistency',
    title: 'Leaves = Consistency',
    shortRule: 'Consistency fills it.',
    detail: 'Regular daily learning adds more leaf clusters and fullness to the canopy.',
    icon: Leaf,
    color: 'text-green-600',
    bg: 'bg-green-50 border-green-200'
  },
  {
    key: 'mastery',
    title: 'Branches = Learning Progress + Mastery',
    shortRule: 'Learning builds its branches.',
    detail: 'Improving understanding and mastering topics creates new and stronger branches.',
    icon: GitBranch,
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200'
  },
  {
    key: 'badges',
    title: 'Flowers = Badges',
    shortRule: 'Badges make it bloom.',
    detail: 'Each meaningful badge adds a vibrant flower blossom to the tree.',
    icon: Flower2,
    color: 'text-pink-600',
    bg: 'bg-pink-50 border-pink-200'
  },
  {
    key: 'fruits',
    title: 'Fruits = Test Performance',
    shortRule: 'High test performance bears sweet fruit.',
    detail: 'Acing quizzes and unit tests ripens species-specific fruits (Mangoes, Apples, Oranges, Pods, or Cherries).',
    icon: Trophy,
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200'
  },
  {
    key: 'reflection',
    title: 'New Shoots = Reflection',
    shortRule: 'Reflection creates new beginnings.',
    detail: 'Learning from mistakes and reflecting sprouts fresh green shoots along the trunk and branches.',
    icon: Sprout,
    color: 'text-lime-600',
    bg: 'bg-lime-50 border-lime-200'
  },
  {
    key: 'resilience',
    title: 'Strong Growth = Resilience',
    shortRule: 'Resilience makes it stronger.',
    detail: 'Coming back after difficulty or setbacks makes the trunk thicker and roots deeper.',
    icon: ShieldCheck,
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-200'
  }
];

function SpeciesFruitGraphic({ speciesId }) {
  switch (speciesId) {
    case 'mango':
      return (
        <g>
          <path d="M 0 -11 L 0 -5" stroke="#5D4037" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 0 -8 Q 8 -12 11 -6 Q 5 -4 0 -8 Z" fill="#15803D" />
          <path
            d="M 0 -5 C 8 -5, 11 4, 6 11 C 3 15, -3 16, -5 12 C -8 8, -7 -5, 0 -5 Z"
            fill="url(#mangoFruitGrad)"
            stroke="#B45309"
            strokeWidth="0.7"
          />
          <path
            d="M -3 -1 Q -5 5 -2 9"
            fill="none"
            stroke="#FEF9C3"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>
      );

    case 'apple':
      return (
        <g>
          <path d="M 0 -10 Q 2 -6 0 -4" fill="none" stroke="#5D4037" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 1 -7 Q 8 -11 10 -5 Q 5 -3 1 -7 Z" fill="#22C55E" />
          <path
            d="M 0 -4 C -5 -7, -10 -2, -9 5 C -8 11, -3 14, 0 12 C 3 14, 8 11, 9 5 C 10 -2, 5 -7, 0 -4 Z"
            fill="url(#appleFruitGrad)"
            stroke="#9F1239"
            strokeWidth="0.7"
          />
          <ellipse cx="-4" cy="1" rx="1.6" ry="3.2" fill="#FFE4E6" opacity="0.7" transform="rotate(-15 -4 1)" />
        </g>
      );

    case 'orange':
      return (
        <g>
          <line x1="0" y1="-10" x2="0" y2="-5" stroke="#14532D" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 0 -7 Q -8 -11 -10 -5 Q -4 -3 0 -7 Z" fill="#16A34A" />
          <circle cx="0" cy="3" r="8.5" fill="url(#orangeFruitGrad)" stroke="#C2410C" strokeWidth="0.8" />
          <circle cx="0" cy="-4.5" r="1.8" fill="#15803D" />
          <circle cx="-3.5" cy="0" r="1.5" fill="#FEF3C7" opacity="0.75" />
          <circle cx="3" cy="5" r="0.7" fill="#9A3412" opacity="0.45" />
          <circle cx="1" cy="7" r="0.7" fill="#9A3412" opacity="0.45" />
          <circle cx="4.5" cy="2" r="0.7" fill="#9A3412" opacity="0.45" />
        </g>
      );

    case 'gulmohar':
      return (
        <g>
          <line x1="0" y1="-11" x2="0" y2="-5" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M -1 -6 Q 6 2 4 16 Q 0 19 -2 15 Q -4 3 -1 -6 Z"
            fill="url(#gulmoharFruitGrad)"
            stroke="#7F1D1D"
            strokeWidth="0.9"
          />
          <circle cx="1" cy="0" r="1.3" fill="#FDE047" opacity="0.85" />
          <circle cx="1.6" cy="5" r="1.3" fill="#FDE047" opacity="0.85" />
          <circle cx="1.4" cy="10" r="1.3" fill="#FDE047" opacity="0.85" />
        </g>
      );

    case 'cherry':
    default:
      return (
        <g>
          <path d="M 0 -10 Q -5 -3 -6 4" fill="none" stroke="#4D7C0F" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 0 -10 Q 5 -3 6 5" fill="none" stroke="#4D7C0F" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 0 -10 Q 7 -13 9 -8 Q 4 -6 0 -10 Z" fill="#22C55E" />
          <circle cx="-6" cy="6" r="5.2" fill="url(#cherryFruitGrad)" stroke="#881337" strokeWidth="0.7" />
          <circle cx="-7.5" cy="4.5" r="1.2" fill="#FFE4E6" opacity="0.8" />
          <circle cx="6" cy="7" r="5.2" fill="url(#cherryFruitGrad)" stroke="#881337" strokeWidth="0.7" />
          <circle cx="4.5" cy="5.5" r="1.2" fill="#FFE4E6" opacity="0.8" />
        </g>
      );
  }
}

function MiniSpeciesFruitIcon({ speciesId }) {
  return (
    <svg viewBox="-16 -16 32 36" className="w-8 h-8 shrink-0 overflow-visible">
      <defs>
        <linearGradient id={`miniMango-${speciesId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FDE047" />
        </linearGradient>
      </defs>
      {speciesId === 'mango' && (
        <g>
          <path d="M 0 -11 L 0 -5" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 0 -8 Q 9 -12 12 -6 Q 5 -4 0 -8 Z" fill="#15803D" />
          <path
            d="M 0 -5 C 9 -5, 12 4, 6 12 C 3 16, -3 17, -6 12 C -9 8, -7 -5, 0 -5 Z"
            fill={`url(#miniMango-${speciesId})`}
            stroke="#B45309"
            strokeWidth="0.9"
          />
        </g>
      )}
      {speciesId === 'apple' && (
        <g>
          <path d="M 0 -10 Q 2 -6 0 -4" fill="none" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 1 -7 Q 8 -11 11 -5 Q 5 -3 1 -7 Z" fill="#22C55E" />
          <path
            d="M 0 -4 C -5 -7, -11 -2, -10 5 C -9 11, -3 15, 0 12 C 3 15, 9 11, 10 5 C 11 -2, 5 -7, 0 -4 Z"
            fill="#E11D48"
            stroke="#9F1239"
            strokeWidth="0.9"
          />
          <ellipse cx="-4" cy="1" rx="1.6" ry="3" fill="#FFE4E6" opacity="0.75" transform="rotate(-15 -4 1)" />
        </g>
      )}
      {speciesId === 'orange' && (
        <g>
          <line x1="0" y1="-10" x2="0" y2="-5" stroke="#14532D" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 0 -7 Q -8 -11 -11 -5 Q -4 -3 0 -7 Z" fill="#16A34A" />
          <circle cx="0" cy="3" r="9" fill="#F97316" stroke="#C2410C" strokeWidth="0.9" />
          <circle cx="-3.5" cy="0" r="1.6" fill="#FEF3C7" opacity="0.8" />
        </g>
      )}
      {speciesId === 'gulmohar' && (
        <g>
          <line x1="0" y1="-11" x2="0" y2="-5" stroke="#5D4037" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M -1 -6 Q 7 2 5 16 Q 0 19 -2 15 Q -4 3 -1 -6 Z"
            fill="#B91C1C"
            stroke="#7F1D1D"
            strokeWidth="1"
          />
          <circle cx="1" cy="0" r="1.4" fill="#FDE047" />
          <circle cx="1.5" cy="5" r="1.4" fill="#FDE047" />
          <circle cx="1.3" cy="10" r="1.4" fill="#FDE047" />
        </g>
      )}
      {speciesId === 'cherry' && (
        <g>
          <path d="M 0 -10 Q -5 -3 -6 4" fill="none" stroke="#4D7C0F" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 0 -10 Q 5 -3 6 5" fill="none" stroke="#4D7C0F" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 0 -10 Q 7 -13 10 -8 Q 4 -6 0 -10 Z" fill="#22C55E" />
          <circle cx="-6" cy="6" r="5.4" fill="#E11D48" stroke="#881337" strokeWidth="0.8" />
          <circle cx="6" cy="7" r="5.4" fill="#E11D48" stroke="#881337" strokeWidth="0.8" />
        </g>
      )}
    </svg>
  );
}

function SpeciesFlowerGraphic({ speciesId, badgeColor, centerColor, isHighlighted }) {
  const sp = TREE_SPECIES[speciesId] || TREE_SPECIES.mango;

  return (
    <g>
      {/* Highlight pulse ring when selected in Blooming Badge Flowers gallery */}
      {isHighlighted && (
        <circle
          cx="0"
          cy="0"
          r="20"
          fill="none"
          stroke="#FEF08A"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
      )}

      {speciesId === 'gulmohar' ? (
        <g>
          <circle cx="0" cy="0" r="15" fill="#EF4444" opacity="0.28" />
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <line x1="0" y1="0" x2="0" y2="-11" stroke="#B91C1C" strokeWidth="1.2" />
              <ellipse
                cx="0"
                cy="-8.5"
                rx="4.5"
                ry="6"
                fill={idx === 0 ? '#FEF08A' : badgeColor}
                stroke="#DC2626"
                strokeWidth="0.6"
              />
            </g>
          ))}
          <circle cx="0" cy="0" r="3.8" fill="#FDE047" />
        </g>
      ) : speciesId === 'cherry' ? (
        <g>
          <circle cx="0" cy="0" r="14" fill={badgeColor} opacity="0.25" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              d="M 0 0 C -4 -4, -6 -11, -2 -13 L 0 -10.5 L 2 -13 C 6 -11, 4 -4, 0 0 Z"
              fill={badgeColor}
              stroke="#FFF"
              strokeWidth="0.6"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="3.4" fill={centerColor} />
        </g>
      ) : speciesId === 'orange' ? (
        <g>
          <circle cx="0" cy="0" r="14" fill="#FEF08A" opacity="0.3" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-7"
              rx="3.4"
              ry="6.8"
              fill="#FFFFFF"
              stroke={badgeColor}
              strokeWidth="1.1"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="4.2" fill={badgeColor} />
        </g>
      ) : (
        <g>
          <circle cx="0" cy="0" r="14" fill={badgeColor} opacity="0.25" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-6.5"
              rx="4.8"
              ry="6.8"
              fill={ badgeColor }
              stroke="#FFFFFF"
              strokeWidth="0.8"
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="4.2" fill={sp.flowerCenter || centerColor} />
        </g>
      )}
    </g>
  );
}

export default function App() {
  // 1. Registration Tree Species (Mango, Apple, Orange, Gulmohar, Cherry)
  const [treeSpecies, setTreeSpecies] = useState('mango');

  // 2. Core Heycolugo Tree Growth State
  const [xp, setXp] = useState(72); // 10 - 100 (Height = XP)
  const [consistency, setConsistency] = useState(78); // 10 - 100 (Leaves = Consistency)
  const [mastery, setMastery] = useState(76); // 10 - 100 (Branches = Learning Progress + Mastery)
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState([1, 2, 3, 4, 6]); // (Flowers = Badges)
  const [fruitsCount, setFruitsCount] = useState(5); // 0 - 8 (Fruits = Test Performance)
  const [reflection, setReflection] = useState(68); // 0 - 100 (New Shoots = Reflection)
  const [resilience, setResilience] = useState(74); // 10 - 100 (Strong Growth = Resilience)
  const [mood, setMood] = useState('sunny'); // sunny | calm | energetic | cozy (Environment = Mood)
  const [butterflies, setButterflies] = useState(3); // 0 - 6 (Curiosity = Butterflies)
  const [birds, setBirds] = useState(2); // 0 - 4 (Extraordinary Performance / Independence = Birds)

  // UI & Inspector State
  const [selectedElement, setSelectedElement] = useState(null);
  const [highlightedBadgeId, setHighlightedBadgeId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showRootsXray, setShowRootsXray] = useState(true);
  const [activePresetId, setActivePresetId] = useState('explorer');
  // View filter: 'all' shows all sections stacked so nothing is missed, or user can jump to specific section
  const [panelFilter, setPanelFilter] = useState('all');

  const currentTheme = MOOD_THEMES[mood] || MOOD_THEMES.sunny;
  const activeSpecies = TREE_SPECIES[treeSpecies] || TREE_SPECIES.mango;
  const badgesCount = unlockedBadgeIds.length;

  const treeStage = useMemo(() => {
    if (xp < 25) return { name: 'Tender Seedling', level: 1, xpTotal: xp * 25 };
    if (xp < 50) return { name: 'Young Sapling', level: 2, xpTotal: xp * 25 };
    if (xp < 75) return { name: 'Flourishing Tree', level: 3, xpTotal: xp * 25 };
    if (xp < 92) return { name: 'Mighty Canopy', level: 4, xpTotal: xp * 25 };
    return { name: 'Ancient Wisdom Tree', level: 5, xpTotal: xp * 25 };
  }, [xp]);

  // Height scaling from XP (0.48 to 1.06)
  const heightScale = useMemo(() => {
    return 0.48 + (xp / 100) * 0.58;
  }, [xp]);

  // Trunk width factor from Resilience (0.65 to 1.45)
  const trunkWidthScale = useMemo(() => {
    return 0.65 + (resilience / 100) * 0.8;
  }, [resilience]);

  const triggerCelebration = useCallback((title, subtitle) => {
    setToastMessage({ title, subtitle, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3600);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const toggleBadgeFlower = (badge) => {
    const isAlreadyUnlocked = unlockedBadgeIds.includes(badge.id);
    if (isAlreadyUnlocked) {
      // Inspect first; if already inspecting, allow toggling off
      setHighlightedBadgeId(badge.id);
      setSelectedElement({
        type: 'badge',
        title: `Blooming Badge Flower: ${badge.name}`,
        subtitle: `${activeSpecies.blossomName} • ${badge.category}`,
        description: badge.description,
        rule: 'Badges make the tree bloom with vibrant flowers.'
      });
      triggerCelebration(
        `Inspecting "${badge.name}" Flower`,
        `Look for the pulsing ${activeSpecies.blossomName} on your ${activeSpecies.name}!`
      );
    } else {
      setUnlockedBadgeIds((prev) => [...prev, badge.id]);
      setHighlightedBadgeId(badge.id);
      setSelectedElement({
        type: 'badge',
        title: `Unlocked Badge Flower: ${badge.name}!`,
        subtitle: `${activeSpecies.blossomName} • ${badge.xpBonus}`,
        description: badge.description,
        rule: 'Badges make the tree bloom with vibrant flowers.'
      });
      triggerCelebration(
        `Bloomed: ${badge.name}!`,
        `A new ${activeSpecies.blossomName} just opened on your ${activeSpecies.name}.`
      );
    }
  };

  const lockOrUnlockBadgeExplicitly = (e, badge) => {
    e.stopPropagation();
    const isUnlocked = unlockedBadgeIds.includes(badge.id);
    if (isUnlocked) {
      setUnlockedBadgeIds((prev) => prev.filter((id) => id !== badge.id));
      if (highlightedBadgeId === badge.id) setHighlightedBadgeId(null);
      triggerCelebration(`Hid "${badge.name}" Flower`, 'Click the badge card anytime to bloom it again.');
    } else {
      setUnlockedBadgeIds((prev) => [...prev, badge.id]);
      setHighlightedBadgeId(badge.id);
      triggerCelebration(`Bloomed "${badge.name}"!`, `Added a ${activeSpecies.blossomName} to the canopy.`);
    }
  };

  const handleSimulateActivity = (type) => {
    switch (type) {
      case 'xp':
        setXp((prev) => Math.min(100, prev + 12));
        triggerCelebration(
          '+150 XP Earned!',
          `XP grows your ${activeSpecies.name} taller toward the sky.`
        );
        break;
      case 'consistency':
        setConsistency((prev) => Math.min(100, prev + 12));
        triggerCelebration(
          'Daily Streak Extended (+12%)!',
          `Consistency fills your ${activeSpecies.name} canopy with lush leaves.`
        );
        break;
      case 'mastery':
        setMastery((prev) => Math.min(100, prev + 12));
        triggerCelebration(
          'Topic Mastered (+12%)!',
          'Learning progress & mastery build stronger, wider branches.'
        );
        break;
      case 'badge': {
        const nextLocked = BADGE_CATALOG.find((b) => !unlockedBadgeIds.includes(b.id));
        if (nextLocked) {
          setUnlockedBadgeIds((prev) => [...prev, nextLocked.id]);
          setHighlightedBadgeId(nextLocked.id);
          setSelectedElement({
            type: 'badge',
            title: `Badge Unlocked: ${nextLocked.name}`,
            subtitle: `${activeSpecies.blossomName} • ${nextLocked.category}`,
            description: nextLocked.description,
            rule: 'Badges make the tree bloom with vibrant flowers.'
          });
          triggerCelebration(
            `New Badge Flower: ${nextLocked.name}!`,
            `A vibrant ${activeSpecies.blossomName} just bloomed on your tree.`
          );
        } else {
          triggerCelebration(
            'All 8 Badge Flowers Blooming!',
            'Your tree is in full badge blossom!'
          );
        }
        break;
      }
      case 'fruit':
        setFruitsCount((prev) => {
          const next = prev < FRUIT_MILESTONES.length ? prev + 1 : prev;
          const fruitObj = FRUIT_MILESTONES[next - 1];
          if (fruitObj) {
            setSelectedElement({
              type: 'fruit',
              title: `${activeSpecies.fruitName} Ripened: ${fruitObj.title}`,
              subtitle: `${fruitObj.subject} • Score: ${fruitObj.score}`,
              description: `Strong test performance and milestone completion ripened a sweet ${activeSpecies.fruitName} on your ${activeSpecies.name}!`,
              rule: 'High test performance & mastery milestones bear sweet fruit.'
            });
          }
          return next;
        });
        triggerCelebration(
          `New ${activeSpecies.fruitName} Ripened!`,
          `Test excellence added a ${activeSpecies.fruitName} to your ${activeSpecies.name}!`
        );
        break;
      case 'reflection':
        setReflection((prev) => Math.min(100, prev + 16));
        triggerCelebration(
          'Mistake Reflection Logged!',
          'Learning from mistakes sprouts tender new green shoots.'
        );
        break;
      case 'resilience':
        setResilience((prev) => Math.min(100, prev + 15));
        triggerCelebration(
          'Resilience Comeback (+15%)!',
          'Overcoming setbacks thickens the trunk & deepens underground roots.'
        );
        break;
      case 'curiosity':
        setButterflies((prev) => Math.min(6, prev + 1));
        triggerCelebration(
          'Curious Question Asked!',
          'Curiosity brings a colorful fluttering butterfly to your tree.'
        );
        break;
      case 'independence':
        setBirds((prev) => Math.min(4, prev + 1));
        triggerCelebration(
          'Extraordinary Independence!',
          'Extraordinary performance invited a singing bird to the crown.'
        );
        break;
      default:
        break;
    }
  };

  const applyPreset = (presetKey) => {
    const p = PRESETS[presetKey];
    if (!p) return;
    setActivePresetId(presetKey);
    setXp(p.xp);
    setConsistency(p.consistency);
    setMastery(p.mastery);
    setUnlockedBadgeIds(p.unlockedBadges);
    setFruitsCount(p.fruits);
    setReflection(p.reflection);
    setResilience(p.resilience);
    setMood(p.mood);
    setButterflies(p.butterflies);
    setBirds(p.birds);
    setSelectedElement(null);
    setHighlightedBadgeId(null);
    triggerCelebration(`Loaded Preset: ${p.name}`, p.description);
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <style>{`
        @keyframes swaySlow {
          0%, 100% { transform: rotate(-1.1deg); }
          50% { transform: rotate(1.1deg); }
        }
        @keyframes leafBreeze {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(2.5px, -2px) scale(1.03); }
        }
        @keyframes fruitPendulum {
          0%, 100% { transform: rotate(-4.5deg); }
          50% { transform: rotate(4.5deg); }
        }
        @keyframes petalFall {
          0% { transform: translate(0px, 0px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.85; }
          100% { transform: translate(-45px, 190px) rotate(220deg); opacity: 0; }
        }
        @keyframes butterflyOrbit1 {
          0%, 100% { transform: translate(0px, 0px) rotate(-8deg); }
          25% { transform: translate(18px, -14px) rotate(10deg); }
          50% { transform: translate(6px, -26px) rotate(-5deg); }
          75% { transform: translate(-15px, -10px) rotate(12deg); }
        }
        @keyframes butterflyWing {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.35); }
        }
        @keyframes birdHop {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40% { transform: translateY(-4px) rotate(-4deg); }
          60% { transform: translateY(0px) rotate(3deg); }
        }
        @keyframes floatNote {
          0% { opacity: 0; transform: translate(0, 0) scale(0.7); }
          40% { opacity: 0.95; transform: translate(8px, -12px) scale(1); }
          100% { opacity: 0; transform: translate(16px, -24px) scale(0.8); }
        }
        @keyframes rainFall {
          0% { transform: translateY(-20px); opacity: 0; }
          40% { opacity: 0.65; }
          100% { transform: translateY(360px); opacity: 0; }
        }
        @keyframes fireflyGlow {
          0%, 100% { opacity: 0.2; transform: translate(0, 0) scale(0.8); }
          50% { opacity: 0.95; transform: translate(6px, -8px) scale(1.3); }
        }
        @keyframes rootPulse {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.2)); }
          50% { filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.65)); }
        }
        .tree-canopy-sway {
          transform-origin: 0px 0px;
          animation: swaySlow 7s ease-in-out infinite;
        }
        .leaf-cluster-anim {
          animation: leafBreeze 4.5s ease-in-out infinite;
        }
        .fruit-sway-anim {
          transform-origin: 0px -10px;
          animation: fruitPendulum 3.5s ease-in-out infinite;
        }
        .sakura-petal-fall {
          animation: petalFall 5.5s linear infinite;
        }
        .butterfly-flight {
          animation: butterflyOrbit1 6.5s ease-in-out infinite;
        }
        .butterfly-wings {
          animation: butterflyWing 0.35s ease-in-out infinite;
        }
        .bird-perch {
          animation: birdHop 3.8s ease-in-out infinite;
        }
        .music-note {
          animation: floatNote 3.2s ease-out infinite;
        }
        .rain-drop {
          animation: rainFall 1.6s linear infinite;
        }
        .firefly-dot {
          animation: fireflyGlow 3.5s ease-in-out infinite;
        }
        .resilient-root {
          animation: rootPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  Heycolugo Living Tree
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${activeSpecies.badgeClass}`}>
                  {activeSpecies.name}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Stage {treeStage.level}/5: {treeStage.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {activeSpecies.tagline}
              </p>
            </div>
          </div>

          {/* Live Summary Badges */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-xl">
              <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
              <span className="text-xs font-bold text-slate-800">{treeStage.xpTotal} XP</span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-2.5 py-1.5 rounded-xl">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span className="text-xs font-bold text-slate-800">{consistency}% Consistency</span>
            </div>
            <div className="flex items-center gap-1.5 bg-pink-50 border border-pink-200 px-2.5 py-1.5 rounded-xl">
              <Flower2 className="w-3.5 h-3.5 text-pink-600" />
              <span className="text-xs font-bold text-slate-800">{badgesCount}/8 Flowers</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-xl">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-bold text-slate-800">
                {fruitsCount}/8 {activeSpecies.fruitPlural}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-4 lg:sticky lg:top-20">
          
          {/* Tree Canvas Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
            
            {/* Top Floating Bar: Mood Environment Selector & Underground Roots X-Ray Toggle */}
            <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-200/70">
                {Object.values(MOOD_THEMES).map((m) => {
                  const IconComponent = m.icon;
                  const isActive = mood === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setMood(m.id);
                        triggerCelebration(
                          `Environment = Mood: ${m.label}`,
                          'Mood changes the surroundings/feel of the tree, not your growth itself.'
                        );
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs scale-105'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      title={`${m.label}: ${m.subtitle}`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{m.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowRootsXray(!showRootsXray)}
                className={`pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold backdrop-blur-md transition-all shadow-sm border ${
                  showRootsXray
                    ? 'bg-amber-900/90 text-amber-100 border-amber-700'
                    : 'bg-white/90 text-slate-700 border-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showRootsXray ? 'Roots X-Ray On' : 'Show Roots'}</span>
              </button>
            </div>

            {/* Toast Celebration Banner */}
            {toastMessage && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-sm pointer-events-none animate-bounce">
                <div className="bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-400/40 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-emerald-300 truncate">
                      {toastMessage.title}
                    </p>
                    <p className="text-[11px] text-slate-200 leading-tight">
                      {toastMessage.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive SVG Scene */}
            <div className="w-full aspect-[4/4.3] sm:aspect-[4/3.8] relative select-none">
              <svg
                viewBox="0 0 500 520"
                className="w-full h-full block"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={currentTheme.svgSkyTop} className="transition-all duration-1000" />
                    <stop offset="55%" stopColor={currentTheme.svgSkyMid} className="transition-all duration-1000" />
                    <stop offset="100%" stopColor={currentTheme.svgSkyBottom} className="transition-all duration-1000" />
                  </linearGradient>

                  <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={activeSpecies.trunkStops[0]} />
                    <stop offset="45%" stopColor={activeSpecies.trunkStops[1]} />
                    <stop offset="100%" stopColor={activeSpecies.trunkStops[2]} />
                  </linearGradient>

                  {/* Species Fruit Gradients */}
                  <linearGradient id="mangoFruitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="40%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#FDE047" />
                  </linearGradient>

                  <radialGradient id="appleFruitGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="50%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#881337" />
                  </radialGradient>

                  <radialGradient id="orangeFruitGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FDBA74" />
                    <stop offset="45%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#C2410C" />
                  </radialGradient>

                  <linearGradient id="gulmoharFruitGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DC2626" />
                    <stop offset="50%" stopColor="#991B1B" />
                    <stop offset="100%" stopColor="#451A03" />
                  </linearGradient>

                  <radialGradient id="cherryFruitGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#F43F5E" />
                    <stop offset="60%" stopColor="#BE123C" />
                    <stop offset="100%" stopColor="#4C0519" />
                  </radialGradient>

                  <radialGradient id="resilienceGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="celestialGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
                    <stop offset="45%" stopColor="#FDE68A" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient id="rainbowGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.35" />
                    <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.35" />
                    <stop offset="70%" stopColor="#34D399" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.35" />
                  </linearGradient>
                </defs>

                {/* 1. SKY BACKGROUND */}
                <rect x="0" y="0" width="500" height="520" fill="url(#skyGrad)" />

                {/* 2. MOOD ATMOSPHERE PARTICLES */}
                {mood === 'sunny' && (
                  <g>
                    <circle cx="410" cy="85" r="65" fill="url(#celestialGlow)" />
                    <circle cx="410" cy="85" r="26" fill="#FEF08A" />
                    {[
                      { cx: 90, cy: 130, r: 2.5, d: '0s' },
                      { cx: 165, cy: 85, r: 2, d: '1.1s' },
                      { cx: 340, cy: 150, r: 2.5, d: '0.5s' },
                      { cx: 420, cy: 210, r: 2, d: '1.7s' },
                      { cx: 110, cy: 240, r: 3, d: '0.8s' }
                    ].map((p, i) => (
                      <circle
                        key={i}
                        cx={p.cx}
                        cy={p.cy}
                        r={p.r}
                        fill="#FEF9C3"
                        className="firefly-dot"
                        style={{ animationDelay: p.d }}
                      />
                    ))}
                  </g>
                )}

                {mood === 'calm' && (
                  <g>
                    {[
                      { x: 60, y: 55 }, { x: 130, y: 40 }, { x: 210, y: 75 },
                      { x: 310, y: 45 }, { x: 440, y: 65 }, { x: 375, y: 115 },
                      { x: 85, y: 135 }, { x: 455, y: 155 }
                    ].map((star, i) => (
                      <circle
                        key={i}
                        cx={star.x}
                        cy={star.y}
                        r={i % 2 === 0 ? 1.8 : 1.2}
                        fill="#E2E8F0"
                        opacity="0.85"
                      />
                    ))}
                    <path
                      d="M 405 60 A 24 24 0 1 0 430 98 A 20 20 0 1 1 405 60 Z"
                      fill="#FEF9C3"
                    />
                    {[
                      { cx: 140, cy: 280, d: '0s' },
                      { cx: 355, cy: 260, d: '0.7s' },
                      { cx: 190, cy: 190, d: '1.4s' },
                      { cx: 320, cy: 170, d: '2.1s' },
                      { cx: 255, cy: 310, d: '0.4s' },
                      { cx: 115, cy: 225, d: '1.8s' }
                    ].map((f, i) => (
                      <circle
                        key={i}
                        cx={f.cx}
                        cy={f.cy}
                        r="3.2"
                        fill="#5EEAD4"
                        className="firefly-dot"
                        style={{ animationDelay: f.d }}
                      />
                    ))}
                  </g>
                )}

                {mood === 'energetic' && (
                  <g>
                    <path
                      d="M 30 370 A 230 230 0 0 1 470 370"
                      fill="none"
                      stroke="url(#rainbowGrad)"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                    <circle cx="250" cy="340" r="95" fill="url(#celestialGlow)" />
                  </g>
                )}

                {mood === 'cozy' && (
                  <g>
                    {[
                      { x: 75, d: '0s' }, { x: 125, d: '0.4s' }, { x: 175, d: '0.9s' },
                      { x: 235, d: '0.2s' }, { x: 295, d: '1.1s' }, { x: 355, d: '0.6s' },
                      { x: 415, d: '0.1s' }, { x: 455, d: '0.8s' }
                    ].map((r, i) => (
                      <line
                        key={i}
                        x1={r.x}
                        y1="30"
                        x2={r.x - 8}
                        y2="46"
                        stroke="#BAE6FD"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        className="rain-drop"
                        style={{ animationDelay: r.d }}
                      />
                    ))}
                  </g>
                )}

                {/* 3. ROLLING HILLS & SOIL */}
                <path
                  d="M 0 380 Q 130 335 270 370 T 500 360 L 500 420 L 0 420 Z"
                  fill={currentTheme.hillBack}
                  opacity="0.7"
                  className="transition-all duration-700"
                />
                <path
                  d="M 0 392 Q 180 355 340 385 T 500 378 L 500 425 L 0 425 Z"
                  fill={currentTheme.hillFront}
                  className="transition-all duration-700"
                />
                <path
                  d="M 0 400 Q 250 386 500 400 L 500 520 L 0 520 Z"
                  fill={currentTheme.soilColor}
                  className="transition-all duration-700"
                />
                <path
                  d="M 0 435 Q 250 422 500 435 L 500 520 L 0 520 Z"
                  fill={currentTheme.soilDeep}
                  className="transition-all duration-700"
                />
                <path
                  d="M 0 398 Q 250 384 500 398 L 500 408 Q 250 394 0 408 Z"
                  fill={currentTheme.groundTop}
                  className="transition-all duration-700"
                />

                {}
                {showRootsXray && (
                  <g
                    transform="translate(250, 398)"
                    className="cursor-pointer resilient-root"
                    onClick={() =>
                      setSelectedElement({
                        type: 'resilience',
                        title: `Deep Roots & Trunk (Resilience: ${resilience}%)`,
                        subtitle: 'Strong Growth = Resilience',
                        description:
                          'Coming back after difficulty or setbacks makes your tree stronger and anchors your roots deeper into the earth.',
                        rule: 'Resilience makes it stronger.'
                      })
                    }
                  >
                    <ellipse
                      cx="0"
                      cy="45"
                      rx={60 + resilience * 0.85}
                      ry={28 + resilience * 0.35}
                      fill="url(#resilienceGlow)"
                    />
                    <path
                      d={`M 0 0 Q -25 ${25 + resilience * 0.4} -${45 + resilience * 0.8} ${42 + resilience * 0.55}`}
                      fill="none"
                      stroke="#8D6E63"
                      strokeWidth={3 + trunkWidthScale * 3.5}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                    <path
                      d={`M 0 0 Q 25 ${25 + resilience * 0.4} ${45 + resilience * 0.8} ${42 + resilience * 0.55}`}
                      fill="none"
                      stroke="#8D6E63"
                      strokeWidth={3 + trunkWidthScale * 3.5}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                    <path
                      d={`M 0 2 Q -8 ${35 + resilience * 0.4} -${15 + resilience * 0.3} ${55 + resilience * 0.5}`}
                      fill="none"
                      stroke="#A1887F"
                      strokeWidth={2.5 + trunkWidthScale * 3}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                    <path
                      d={`M 0 2 Q 12 ${35 + resilience * 0.4} ${20 + resilience * 0.35} ${52 + resilience * 0.5}`}
                      fill="none"
                      stroke="#A1887F"
                      strokeWidth={2.5 + trunkWidthScale * 3}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                    {resilience >= 40 && (
                      <>
                        <path
                          d={`M -35 30 Q -75 55 -${85 + resilience * 0.5} 78`}
                          fill="none"
                          stroke="#BCAAA4"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d={`M 35 30 Q 75 55 ${85 + resilience * 0.5} 78`}
                          fill="none"
                          stroke="#BCAAA4"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </>
                    )}
                    {resilience >= 70 && (
                      <>
                        <path d="M -18 52 Q -42 82 -65 96" fill="none" stroke="#D7CCC8" strokeWidth="2.2" strokeLinecap="round" />
                        <path d="M 18 52 Q 42 82 65 96" fill="none" stroke="#D7CCC8" strokeWidth="2.2" strokeLinecap="round" />
                        <circle cx="-65" cy="96" r="3" fill="#FBBF24" />
                        <circle cx="65" cy="96" r="3" fill="#FBBF24" />
                        <circle cx="0" cy="75" r="3.5" fill="#FBBF24" />
                      </>
                    )}
                  </g>
                )}

                {/* LIVING TREE GROUP (Scaled by Height = XP) */}
                <g
                  transform={`translate(250, 400) scale(${
                    (treeSpecies === 'gulmohar' ? 0.85 : 0.75) + heightScale * 0.25
                  }, ${heightScale})`}
                  className="transition-transform duration-700 ease-out"
                >
                  <g className="tree-canopy-sway">
                    
                    {/* BRANCHES (Learning Progress + Mastery) */}
                    <g>
                      {BRANCH_DATA.map((branch) => {
                        const isUnlocked = mastery >= branch.minMastery;
                        const branchScale = isUnlocked
                          ? Math.min(1, 0.55 + (mastery - branch.minMastery) / 45)
                          : 0;
                        return (
                          <path
                            key={branch.id}
                            d={branch.path}
                            fill="none"
                            stroke="url(#trunkGrad)"
                            strokeWidth={branch.strokeWidth * (0.75 + trunkWidthScale * 0.25)}
                            strokeLinecap="round"
                            style={{
                              opacity: isUnlocked ? 1 : 0,
                              transform: `scale(${branchScale})`,
                              transformOrigin: '0px -130px',
                              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                            className="cursor-pointer hover:brightness-110"
                            onClick={() =>
                              setSelectedElement({
                                type: 'mastery',
                                title: `Mastery Branches (${mastery}%)`,
                                subtitle: 'Branch Growth = Learning Progress + Mastery',
                                description:
                                  'Improving understanding and mastering topics creates new and stronger branches.',
                                rule: 'Learning builds its branches.'
                              })
                            }
                          />
                        );
                      })}
                    </g>

                    {/* TRUNK (Height = XP, Thickness = Resilience) */}
                    <g
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedElement({
                          type: 'xp',
                          title: `${activeSpecies.name} • ${treeStage.name} (${treeStage.xpTotal} XP)`,
                          subtitle: 'Height = XP & Strong Growth = Resilience',
                          description:
                            'More XP makes your registration tree taller and more developed, while Resilience thickens the trunk.',
                          rule: 'XP grows the tree. Resilience makes it stronger.'
                        })
                      }
                    >
                      <path
                        d={`M -${22 * trunkWidthScale} 4 
                           Q -${14 * trunkWidthScale} -80 -${9 * trunkWidthScale} -185 
                           L 0 -235 
                           L ${9 * trunkWidthScale} -185 
                           Q ${14 * trunkWidthScale} -80 ${22 * trunkWidthScale} 4 Z`}
                        fill="url(#trunkGrad)"
                        className="transition-all duration-700"
                      />
                      <path
                        d={`M -${6 * trunkWidthScale} -10 Q -${4 * trunkWidthScale} -75 -${3 * trunkWidthScale} -145`}
                        stroke={activeSpecies.trunkStops[2]}
                        strokeWidth="2"
                        fill="none"
                        opacity="0.55"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M ${7 * trunkWidthScale} -25 Q ${5 * trunkWidthScale} -90 ${3 * trunkWidthScale} -160`}
                        stroke={activeSpecies.trunkStops[1]}
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* Cozy Lantern in Cozy Mood */}
                    {mood === 'cozy' && (
                      <g transform="translate(-72, -135)">
                        <line x1="0" y1="0" x2="0" y2="18" stroke="#3E2723" strokeWidth="2" />
                        <circle cx="0" cy="24" r="18" fill="url(#celestialGlow)" />
                        <rect x="-5" y="18" width="10" height="13" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
                      </g>
                    )}

                    {/* CANOPY LEAVES (Leaf Density = Consistency) */}
                    <g>
                      {LEAF_CLUSTERS.map((cluster) => {
                        const isVisible = consistency >= cluster.minConsistency;
                        const densityScale = isVisible
                          ? Math.min(1.12, 0.65 + (consistency - cluster.minConsistency) / 75)
                          : 0;
                        const mainLeafColor = activeSpecies.leafColors[cluster.colorIdx % activeSpecies.leafColors.length];
                        const rxAdjusted = treeSpecies === 'gulmohar' ? cluster.rx * 1.22 : cluster.rx;
                        const ryAdjusted = treeSpecies === 'gulmohar' ? cluster.ry * 0.78 : cluster.ry;

                        return (
                          <g
                            key={cluster.id}
                            transform={`translate(${cluster.cx}, ${cluster.cy}) scale(${densityScale})`}
                            style={{
                              opacity: isVisible ? 0.95 : 0,
                              transition: 'all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                            className="cursor-pointer"
                            onClick={() =>
                              setSelectedElement({
                                type: 'consistency',
                                title: `${activeSpecies.name} Foliage (${consistency}% Consistency)`,
                                subtitle: 'Leaf Density = Consistency',
                                description: `Regular daily learning adds more leaves and fullness to your ${activeSpecies.name}.`,
                                rule: 'Consistency fills it.'
                              })
                            }
                          >
                            <g className="leaf-cluster-anim" style={{ animationDelay: cluster.delay }}>
                              <ellipse cx="0" cy="0" rx={rxAdjusted} ry={ryAdjusted} fill={mainLeafColor} />
                              <ellipse
                                cx={-rxAdjusted * 0.35}
                                cy={-ryAdjusted * 0.2}
                                rx={rxAdjusted * 0.65}
                                ry={ryAdjusted * 0.65}
                                fill={activeSpecies.leafHighlight}
                                opacity="0.45"
                              />
                              <ellipse
                                cx={rxAdjusted * 0.3}
                                cy={ryAdjusted * 0.2}
                                rx={rxAdjusted * 0.6}
                                ry={ryAdjusted * 0.55}
                                fill={activeSpecies.leafShadow}
                                opacity="0.28"
                              />
                            </g>
                          </g>
                        );
                      })}
                    </g>

                    {/* Drifting Sakura Petals when Cherry Tree is selected */}
                    {treeSpecies === 'cherry' && consistency >= 30 && (
                      <g pointerEvents="none">
                        {[
                          { x: -60, y: -220, d: '0s' },
                          { x: 45, y: -240, d: '1.4s' },
                          { x: -10, y: -180, d: '2.8s' },
                          { x: 80, y: -190, d: '3.9s' }
                        ].map((pt, i) => (
                          <ellipse
                            key={i}
                            cx={pt.x}
                            cy={pt.y}
                            rx="3.5"
                            ry="2"
                            fill="#FBCFE8"
                            className="sakura-petal-fall"
                            style={{ animationDelay: pt.d }}
                          />
                        ))}
                      </g>
                    )}

                    {/* NEW SHOOTS (New Shoots = Reflection) */}
                    <g>
                      {SHOOT_DATA.map((shoot) => {
                        const isVisible = reflection >= shoot.minReflection;
                        return (
                          <g
                            key={shoot.id}
                            transform={`translate(${shoot.x * (shoot.y > -110 ? trunkWidthScale : 1)}, ${shoot.y}) scale(${
                              isVisible ? 1 : 0
                            })`}
                            style={{
                              opacity: isVisible ? 1 : 0,
                              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                            className="cursor-pointer"
                            onClick={() =>
                              setSelectedElement({
                                type: 'reflection',
                                title: `New Shoot: ${shoot.label}`,
                                subtitle: 'New Shoots = Reflection',
                                description:
                                  'Learning from mistakes and reflecting creates fresh green shoots.',
                                rule: 'Reflection creates new beginnings.'
                              })
                            }
                          >
                            <circle cx={shoot.dir * 10} cy="-8" r="11" fill="#BEF264" opacity="0.35" />
                            <path
                              d={`M 0 0 Q ${shoot.dir * 8} -4 ${shoot.dir * 14} -12`}
                              fill="none"
                              stroke="#84CC16"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                            <path
                              d={`M ${shoot.dir * 14} -12 Q ${shoot.dir * 22} -20 ${shoot.dir * 10} -22 Q ${shoot.dir * 8} -15 ${shoot.dir * 14} -12 Z`}
                              fill="#A3E635"
                            />
                            <path
                              d={`M ${shoot.dir * 9} -7 Q ${shoot.dir * 2} -16 ${shoot.dir * 12} -17 Z`}
                              fill="#65A30D"
                            />
                          </g>
                        );
                      })}
                    </g>

                    {/* BLOOMING BADGE FLOWERS (Flowers = Badges) */}
                    <g>
                      {BADGE_CATALOG.filter((b) => unlockedBadgeIds.includes(b.id)).map((badge) => (
                        <g
                          key={badge.id}
                          transform={`translate(${badge.x}, ${badge.y})`}
                          className="cursor-pointer transition-transform duration-500 hover:scale-125"
                          onClick={() => {
                            setHighlightedBadgeId(badge.id);
                            setSelectedElement({
                              type: 'badge',
                              title: `Badge Flower: ${badge.name}`,
                              subtitle: `${activeSpecies.blossomName} • ${badge.category}`,
                              description: badge.description,
                              rule: 'Badges make it bloom.'
                            });
                          }}
                        >
                          <SpeciesFlowerGraphic
                            speciesId={treeSpecies}
                            badgeColor={badge.color}
                            centerColor={badge.centerColor}
                            isHighlighted={highlightedBadgeId === badge.id}
                          />
                        </g>
                      ))}
                    </g>

                    {/* RIPENED FRUITS (Fruits = Test Performance) */}
                    <g>
                      {FRUIT_MILESTONES.slice(0, fruitsCount).map((fruit) => (
                        <g
                          key={fruit.id}
                          transform={`translate(${fruit.x}, ${fruit.y})`}
                          className="cursor-pointer transition-transform duration-500 hover:scale-125"
                          onClick={() =>
                            setSelectedElement({
                              type: 'fruit',
                              title: `${activeSpecies.fruitName}: ${fruit.title}`,
                              subtitle: `${fruit.subject} • Score: ${fruit.score}`,
                              description: `Earned through strong test performance in ${fruit.subject}. Each assessment milestone ripens a ${activeSpecies.fruitName} on your ${activeSpecies.name}!`,
                              rule: 'High test performance bears sweet fruit.'
                            })
                          }
                        >
                          <g className="fruit-sway-anim" style={{ animationDelay: fruit.delay }}>
                            <circle cx="0" cy="3" r="13" fill="#FEF08A" opacity="0.22" />
                            <SpeciesFruitGraphic speciesId={treeSpecies} />
                          </g>
                        </g>
                      ))}
                    </g>

                    {/* BUTTERFLIES (Curiosity brings butterflies) */}
                    <g>
                      {[
                        { x: -115, y: -220, color1: '#F472B6', color2: '#FBBF24', delay: '0s' },
                        { x: 105, y: -215, color1: '#38BDF8', color2: '#A78BFA', delay: '1.2s' },
                        { x: -55, y: -285, color1: '#FB923C', color2: '#FDE047', delay: '2.1s' },
                        { x: 72, y: -275, color1: '#C084FC', color2: '#F472B6', delay: '0.7s' },
                        { x: -135, y: -155, color1: '#2DD4BF', color2: '#FEF08A', delay: '1.6s' },
                        { x: 130, y: -165, color1: '#FB7185', color2: '#FDE047', delay: '2.8s' }
                      ]
                        .slice(0, butterflies)
                        .map((bf, idx) => (
                          <g
                            key={idx}
                            transform={`translate(${bf.x}, ${bf.y})`}
                            className="cursor-pointer"
                            onClick={() =>
                              setSelectedElement({
                                type: 'butterflies',
                                title: 'Curiosity Butterfly',
                                subtitle: 'Curiosity brings butterflies',
                                description:
                                  'Exploring bonus modules and asking curious questions attracts vibrant butterflies.',
                                rule: 'Curiosity brings butterflies.'
                              })
                            }
                          >
                            <g className="butterfly-flight" style={{ animationDelay: bf.delay }}>
                              <g className="butterfly-wings">
                                <path
                                  d="M 0 0 C -10 -12 -16 -2 -2 4 C -12 8 -8 16 0 6 C 8 16 12 8 2 4 C 16 -2 10 -12 0 0 Z"
                                  fill={bf.color1}
                                />
                                <circle cx="-5" cy="-2" r="2" fill={bf.color2} />
                                <circle cx="5" cy="-2" r="2" fill={bf.color2} />
                              </g>
                              <line x1="0" y1="-4" x2="0" y2="7" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                            </g>
                          </g>
                        ))}
                    </g>

                    {/* BIRDS (Extraordinary performance / independence adds birds) */}
                    <g>
                      {[
                        { x: -38, y: -274, color: '#0284C7', belly: '#BAE6FD', flip: 1, delay: '0s' },
                        { x: 45, y: -276, color: '#E11D48', belly: '#FECDD3', flip: -1, delay: '0.9s' },
                        { x: -95, y: -172, color: '#D97706', belly: '#FDE68A', flip: 1, delay: '1.8s' },
                        { x: 96, y: -178, color: '#7C3AED', belly: '#DDD6FE', flip: -1, delay: '0.4s' }
                      ]
                        .slice(0, birds)
                        .map((bird, idx) => (
                          <g
                            key={idx}
                            transform={`translate(${bird.x}, ${bird.y})`}
                            className="cursor-pointer"
                            onClick={() =>
                              setSelectedElement({
                                type: 'birds',
                                title: 'Songbird of Independence',
                                subtitle: 'Extraordinary Performance & Independence',
                                description:
                                  'Extraordinary performance and independent learning invite singing birds to perch in the crown.',
                                rule: 'Extraordinary performance / independence adds birds.'
                              })
                            }
                          >
                            <g className="bird-perch" style={{ animationDelay: bird.delay }}>
                              <g transform={`scale(${bird.flip}, 1)`}>
                                <path d="M -8 2 L -16 -3 L -14 4 Z" fill={bird.color} />
                                <ellipse cx="0" cy="0" rx="9" ry="6.5" fill={bird.color} />
                                <ellipse cx="2" cy="2" rx="6" ry="4" fill={bird.belly} />
                                <circle cx="7" cy="-5" r="5.5" fill={bird.color} />
                                <circle cx="9" cy="-6" r="1.2" fill="#FFF" />
                                <polygon points="12,-6 17,-4 12,-3" fill="#F59E0B" />
                                <line x1="-2" y1="6" x2="-2" y2="11" stroke="#78350F" strokeWidth="1.4" />
                                <line x1="2" y1="6" x2="2" y2="11" stroke="#78350F" strokeWidth="1.4" />
                              </g>
                              <text
                                x={bird.flip * 14}
                                y="-12"
                                fontSize="12"
                                fill="#FEF08A"
                                stroke="#0F172A"
                                strokeWidth="0.4"
                                className="music-note"
                                style={{ animationDelay: bird.delay }}
                              >
                                ♪
                              </text>
                            </g>
                          </g>
                        ))}
                    </g>

                  </g>
                </g>
              </svg>

              {/* Bottom Interactive Hint Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] flex items-center gap-2 border border-white/15">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>
                    Click any {activeSpecies.fruitName.toLowerCase()}, flower, shoot, bird, or root!
                  </span>
                </div>
                <div className="hidden sm:flex bg-white/90 backdrop-blur-md text-slate-800 px-3 py-1 rounded-xl text-xs font-bold border border-white shadow-xs">
                  {activeSpecies.botanical}
                </div>
              </div>
            </div>

            {/* Inspector Drawer when any Tree Element or Badge Flower is clicked */}
            {selectedElement && (
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-4 border-t border-emerald-500/30 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-white">
                        {selectedElement.title}
                      </h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 font-semibold">
                        {selectedElement.subtitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {selectedElement.description}
                    </p>
                    <p className="text-xs font-semibold text-amber-300 mt-1.5">
                      “{selectedElement.rule}”
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedElement(null);
                    setHighlightedBadgeId(null);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close inspector"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* "In Short" Poetic Summary Card */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-4 sm:p-5 text-white shadow-md">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-extrabold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>In Short: How Your {activeSpecies.name} Grows</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
                <div className="font-bold text-white">XP grows it</div>
                <div className="text-[11px] text-emerald-100">Height: {xp}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
                <div className="font-bold text-white">Consistency fills it</div>
                <div className="text-[11px] text-emerald-100">Leaves: {consistency}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
                <div className="font-bold text-white">Learning branches it</div>
                <div className="text-[11px] text-emerald-100">Mastery: {mastery}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
                <div className="font-bold text-white">Badges bloom it</div>
                <div className="text-[11px] text-emerald-100">{badgesCount}/8 Flowers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
                <div className="font-bold text-white">Tests fruit it</div>
                <div className="text-[11px] text-emerald-100">{fruitsCount}/8 {activeSpecies.fruitPlural}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
                <div className="font-bold text-white">Reflection shoots</div>
                <div className="text-[11px] text-emerald-100">Shoots: {reflection}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
                <div className="font-bold text-white">Resilience roots it</div>
                <div className="text-[11px] text-emerald-100">Strength: {resilience}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
                <div className="font-bold text-white">Special Occasions</div>
                <div className="text-[11px] text-emerald-100">{butterflies} Butterflies • {birds} Birds</div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-5">
          
          {/* Quick View Filter Bar (Default 'all' shows every section so nothing is hidden) */}
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200/90 shadow-xs flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'all', label: 'All Sections', icon: Layers },
              { id: 'species', label: '1. Tree Species', icon: Trees },
              { id: 'actions', label: '2. Simulate Actions', icon: Play },
              { id: 'badges', label: '3. Badge Flowers', icon: Flower2 },
              { id: 'presets', label: '4. Growth Presets', icon: Sparkles },
              { id: 'sliders', label: '5. Sliders & Guide', icon: Sliders }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = panelFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPanelFilter(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* =====================================================================
              SECTION 1: REGISTRATION TREE SPECIES (Mango, Apple, Orange, Gulmohar, Cherry)
             ===================================================================== */}
          {(panelFilter === 'all' || panelFilter === 'species') && (
            <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Trees className="w-4 h-4" />
                    </div>
                    <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Registration Tree Species
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Selected by the student at registration — customizes canopy, blossoms, and harvested fruits
                  </p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${activeSpecies.badgeClass}`}>
                  Active: {activeSpecies.shortName}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {Object.values(TREE_SPECIES).map((sp) => {
                  const isSelected = treeSpecies === sp.id;
                  return (
                    <button
                      key={sp.id}
                      onClick={() => {
                        setTreeSpecies(sp.id);
                        triggerCelebration(
                          `Registration Species: ${sp.name}`,
                          `Now displaying ${sp.fruitPlural} and ${sp.blossomName}s!`
                        );
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all flex sm:flex-col items-center sm:items-start justify-between gap-2.5 ${
                        isSelected
                          ? sp.cardActiveClass
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-auto sm:w-full">
                        <MiniSpeciesFruitIcon speciesId={sp.id} />
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 hidden sm:block" />
                        ) : (
                          <span
                            className="w-2.5 h-2.5 rounded-full opacity-60 hidden sm:block"
                            style={{ backgroundColor: sp.accentColor }}
                          />
                        )}
                      </div>
                      <div className="flex-1 sm:w-full">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-extrabold text-slate-900">{sp.shortName}</p>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 sm:hidden" />
                          )}
                        </div>
                        <p className="text-[10px] font-semibold text-slate-600 mt-0.5 leading-tight">
                          Fruit: {sp.fruitPlural}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {sp.blossomName}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {}
          {/* =====================================================================
              SECTION 2: SIMULATE STUDENT ACTIONS
             ===================================================================== */}
          {(panelFilter === 'all' || panelFilter === 'actions') && (
            <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                      <Play className="w-4 h-4" />
                    </div>
                    <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Simulate Student Actions
                    </h2>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Live Growth
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Trigger student learning activities, badge unlocks, and test scores to animate the tree
                  </p>
                </div>
                <button
                  onClick={() => applyPreset('seedling')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Highlight Action: Ace Test / Milestone -> Ripen Species Fruit */}
                <button
                  onClick={() => handleSimulateActivity('fruit')}
                  className="sm:col-span-2 flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 hover:from-amber-100 hover:to-rose-100 border border-amber-300 text-left transition-all active:scale-98 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: activeSpecies.accentColor }}
                    >
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                        + Ace Test / Assessment (Ripen {activeSpecies.fruitName})
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        Test performance bears fruit on your {activeSpecies.name} ({fruitsCount}/8 {activeSpecies.fruitPlural})
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-white text-slate-800 border border-amber-200 shrink-0">
                    +1 {activeSpecies.shortName}
                  </span>
                </button>

                <button
                  onClick={() => handleSimulateActivity('xp')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">+ Complete Activity (+150 XP)</div>
                    <div className="text-[11px] text-emerald-700 font-medium">Height = XP ({xp}%)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateActivity('consistency')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-green-50/70 hover:bg-green-100/80 border border-green-200 text-left transition-all active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">+ Daily Streak (+12%)</div>
                    <div className="text-[11px] text-green-700 font-medium">Leaves = Consistency ({consistency}%)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateActivity('mastery')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200 text-left transition-all active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">+ Master Topic (+12%)</div>
                    <div className="text-[11px] text-amber-800 font-medium">Branches = Mastery ({mastery}%)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateActivity('badge')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50/70 hover:bg-pink-100/80 border border-pink-200 text-left transition-all active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Flower2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">+ Unlock Badge (+1 Flower)</div>
                    <div className="text-[11px] text-pink-700 font-medium">Flowers = Badges ({badgesCount}/8)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateActivity('reflection')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-lime-50/70 hover:bg-lime-100/80 border border-lime-200 text-left transition-all active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-lime-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">+ Reflect on Mistake</div>
                    <div className="text-[11px] text-lime-800 font-medium">New Shoots = Reflection ({reflection}%)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateActivity('resilience')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200 text-left transition-all active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">+ Overcome Setback (+15%)</div>
                    <div className="text-[11px] text-orange-800 font-medium">Resilience = Roots & Trunk ({resilience}%)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateActivity('curiosity')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-fuchsia-50/70 hover:bg-fuchsia-100/80 border border-fuchsia-200 text-left transition-all active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-fuchsia-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">+ Ask Curious Question</div>
                    <div className="text-[11px] text-fuchsia-700 font-medium">Curiosity = Butterflies ({butterflies}/6)</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateActivity('independence')}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-sky-50/70 hover:bg-sky-100/80 border border-sky-200 text-left transition-all active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bird className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">+ Extraordinary Independence</div>
                    <div className="text-[11px] text-sky-800 font-medium">Performance = Singing Birds ({birds}/4)</div>
                  </div>
                </button>
              </div>
            </section>
          )}

          {/* =====================================================================
              SECTION 3: BLOOMING BADGE FLOWERS (Interactive 8-Badge Gallery)
             ===================================================================== */}
          {(panelFilter === 'all' || panelFilter === 'badges') && (
            <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                      <Flower2 className="w-4 h-4" />
                    </div>
                    <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Blooming Badge Flowers ({badgesCount}/{BADGE_CATALOG.length})
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Each meaningful badge blooms a flower on your {activeSpecies.name}. Click any badge to bloom or inspect it!
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setUnlockedBadgeIds(BADGE_CATALOG.map((b) => b.id));
                      triggerCelebration('Full Blossom!', 'All 8 badge flowers are now blooming on your tree.');
                    }}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 transition-colors"
                  >
                    Bloom All 8
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BADGE_CATALOG.map((badge) => {
                  const isUnlocked = unlockedBadgeIds.includes(badge.id);
                  const isHighlighted = highlightedBadgeId === badge.id;

                  return (
                    <div
                      key={badge.id}
                      onClick={() => toggleBadgeFlower(badge)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                        isUnlocked
                          ? isHighlighted
                            ? 'bg-pink-50/90 border-pink-500 ring-2 ring-pink-400/30 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-pink-300 hover:bg-pink-50/30'
                          : 'bg-slate-50/80 border-slate-200/70 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Mini SVG Flower Preview */}
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                            isUnlocked
                              ? 'bg-pink-50/80 border-pink-200'
                              : 'bg-slate-100 border-slate-200 grayscale'
                          }`}
                        >
                          <svg viewBox="-16 -16 32 32" className="w-7 h-7 overflow-visible">
                            <SpeciesFlowerGraphic
                              speciesId={treeSpecies}
                              badgeColor={badge.color}
                              centerColor={badge.centerColor}
                              isHighlighted={false}
                            />
                          </svg>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-extrabold text-slate-900 truncate">
                              {badge.name}
                            </p>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                              {badge.xpBonus}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-pink-600">
                            {badge.category}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                            {badge.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => lockOrUnlockBadgeExplicitly(e, badge)}
                        title={isUnlocked ? 'Click to hide flower' : 'Click to bloom flower'}
                        className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shrink-0 flex items-center gap-1 border transition-colors ${
                          isUnlocked
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-200/70 text-slate-600 border-slate-300 hover:bg-slate-300'
                        }`}
                      >
                        {isUnlocked ? (
                          <>
                            <Unlock className="w-3 h-3" />
                            <span>Bloomed</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Locked</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {}
          {/* =====================================================================
              SECTION 4: STUDENT GROWTH PRESETS
             ===================================================================== */}
          {(panelFilter === 'all' || panelFilter === 'presets') && (
            <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Student Growth Presets
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    One-click student snapshots to preview how a {activeSpecies.name} evolves over the school year
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.values(PRESETS).map((preset) => {
                  const isCurrent = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                        isCurrent
                          ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'bg-slate-50/60 border-slate-200 hover:border-emerald-300 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                            {preset.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                            {preset.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-snug">
                          {preset.description}
                        </p>
                      </div>

                      <div className="flex items-center flex-wrap gap-1.5 pt-1 border-t border-slate-200/60 text-[10px] font-bold text-slate-600">
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">
                          XP: {preset.xp}%
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">
                          Flowers: {preset.unlockedBadges.length}/8
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">
                          {activeSpecies.fruitPlural}: {preset.fruits}/8
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* =====================================================================
              SECTION 5: FINE-TUNE GROWTH SLIDERS & HEYCOLUGO TREE LEGEND
             ===================================================================== */}
          {(panelFilter === 'all' || panelFilter === 'sliders') && (
            <>
              <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Fine-Tune {activeSpecies.name} Growth Sliders
                    </h2>
                    <p className="text-xs text-slate-500">
                      Directly scrub any metric to test smooth SVG transitions
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Height = XP */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        Height = XP
                      </span>
                      <span className="text-emerald-700">{xp}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={xp}
                      onChange={(e) => setXp(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  {/* Leaf Density = Consistency */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-green-600" />
                        Leaf Density = Consistency
                      </span>
                      <span className="text-green-700">{consistency}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={consistency}
                      onChange={(e) => setConsistency(Number(e.target.value))}
                      className="w-full accent-green-600 cursor-pointer"
                    />
                  </div>

                  {/* Branch Growth = Mastery */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <GitBranch className="w-3.5 h-3.5 text-amber-700" />
                        Branches = Mastery
                      </span>
                      <span className="text-amber-800">{mastery}%</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="100"
                      value={mastery}
                      onChange={(e) => setMastery(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  {/* Fruits = Test Performance */}
                  <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-600" />
                        Fruits = Test Scores ({activeSpecies.fruitPlural})
                      </span>
                      <span className="text-amber-800">{fruitsCount}/8</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={FRUIT_MILESTONES.length}
                      value={fruitsCount}
                      onChange={(e) => setFruitsCount(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  {/* New Shoots = Reflection */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Sprout className="w-3.5 h-3.5 text-lime-600" />
                        New Shoots = Reflection
                      </span>
                      <span className="text-lime-700">{reflection}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={reflection}
                      onChange={(e) => setReflection(Number(e.target.value))}
                      className="w-full accent-lime-600 cursor-pointer"
                    />
                  </div>

                  {/* Strong Growth = Resilience */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                        Strong Growth = Resilience
                      </span>
                      <span className="text-orange-700">{resilience}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={resilience}
                      onChange={(e) => setResilience(Number(e.target.value))}
                      className="w-full accent-orange-600 cursor-pointer"
                    />
                  </div>

                  {/* Curiosity = Butterflies */}
                  <div className="p-3 rounded-2xl bg-fuchsia-50/50 border border-fuchsia-200">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>Curiosity (Butterflies)</span>
                      <span className="text-fuchsia-700">{butterflies}/6</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="6"
                      value={butterflies}
                      onChange={(e) => setButterflies(Number(e.target.value))}
                      className="w-full accent-fuchsia-500 cursor-pointer"
                    />
                  </div>

                  {/* Extraordinary Performance = Birds */}
                  <div className="p-3 rounded-2xl bg-sky-50/50 border border-sky-200">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>Independence (Singing Birds)</span>
                      <span className="text-sky-700">{birds}/4</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4"
                      value={birds}
                      onChange={(e) => setBirds(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                  </div>
                </div>
              </section>

              {/* COMPLETE TREE STATE LEGEND */}
              <section className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Heycolugo Tree State Visual Guide
                    </h2>
                    <p className="text-xs text-slate-500">
                      How every dimension of student growth is represented on the tree
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TREE_PHILOSOPHY.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.key}
                        className={`p-3 rounded-2xl border ${item.bg} flex items-start gap-2.5`}
                      >
                        <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0">
                          <IconComp className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900">
                            {item.title}
                          </h4>
                          <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                            {item.shortRule}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

        </div>
      </main>
    </div>
  );
}



// Replace 'MyTree' with the exact name of your main component if named differently
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyTree />);


