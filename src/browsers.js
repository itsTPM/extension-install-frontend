import StepsUnsupported from '@/components/Steps/StepsUnsupported.vue';
import StepsCmd from '@/components/Steps/StepsCmd.vue';
import StepsRegistry from '@/components/Steps/StepsRegistry.vue';
import StepsRefreshPolicy from '@/components/Steps/StepsRefreshPolicy.vue';
import StepInstall from '@/components/Steps/StepsInstall.vue';
import StepsEdgeDnD from '@/components/Steps/StepsEdgeDnD.vue';
import StepsYandexDnD from '@/components/Steps/StepsYandexDnD.vue';

export const browsersData = [
  {
    name: 'Неподдерживаемый',
    displayName: 'Неподдерживаемый',
    steps: [
      {
        component: StepsUnsupported,
      },
    ],
  },
  {
    name: 'chrome',
    displayName: 'Chrome для Windows',
    steps: [
      { component: StepsCmd },
      { component: StepsRegistry },
      { component: StepsRefreshPolicy },
      {
        component: StepInstall,
        props: {
          installMethod: 'oneClick',
        },
      },
    ],
  },
  {
    name: 'edge',
    displayName: 'Edge для Windows',
    steps: [
      { component: StepsCmd },
      { component: StepsRegistry },
      { component: StepsRefreshPolicy },
      {
        component: StepInstall,
        props: {
          installMethod: 'dragAndDrop',
        },
      },
      { component: StepsEdgeDnD },
    ],
  },
  {
    name: 'opera',
    displayName: 'Opera',
    steps: [
      {
        component: StepInstall,
        props: {
          installMethod: 'oneClick',
        },
      },
    ],
  },
  {
    name: 'yandex',
    displayName: 'Яндекс Браузер',
    steps: [
      {
        component: StepInstall,
        props: {
          installMethod: 'dragAndDrop',
        },
      },
      {
        component: StepsYandexDnD,
      },
    ],
  },
];
