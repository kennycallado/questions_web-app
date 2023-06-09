export type Slide = {
  id: number;
  title?: string;
  type?: string;
  description: string;
  content?: string[];
  media?: Media;
  answer?: string;
}

export type Media = {
  id: number;
  name?: string;
  type: string;
  url: string;
}

export type SlidesGroup = {
  id: number;
  description: string;
  slides: Slide[];
}

export type Slides = {
  slidesGroup: SlidesGroup[];
}

/** 
* 1. How often do you feel confident in your ability to achieve your goals?
* 2. How often do you feel capable of successfully overcoming challenges?
* 3. How often do you feel you are able to make wise decisions?
* 4. How often do you feel you have the strength to stay resilient in difficult situations?
* 5. How often do you feel you have the power to make positive changes in your life?
* */

const slides1: Slide[] = [
  {
    id: 101,
    title: 'Slide 1',
    type: 'content',
    description: 'description 1',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies ti',
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
    ],
    media: { id: 1, name: 'image', type: 'image', url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80' },
  },
  {
    id: 102,
    title: 'Slide 2',
    type: 'content',
    description: 'description 2',
    content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eg'],
    media: { id: 2, name: 'video', type: 'video', url: 'ivukpkSMoYQ' }
  },
  {
    id: 103,
    title: 'Slide 3',
    type: 'range',
    description: 'description 3',
    content: ['blabla', 'How often do you feel confident in your ability to achieve your goals?'],
  },
  {
    id: 104,
    title: 'Slide 4',
    type: 'range',
    description: 'description 4',
    content: ['How often do you feel capable of successfully overcoming challenges?'],
  },
  {
    id: 105,
    title: 'Slide 5',
    type: 'range',
    description: 'description 5',
    content: ['How often do you feel you are able to make wise decisions?'],
    media: { id: 3, name: 'video', type: 'video', url: 'hfsD4ZT5mAw' },
  },
]

const slides2: Slide[] = [
  {
    id: 201,
    title: 'Slide 1',
    type: 'range',
    description: 'description 1',
    content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies ti'],
  },
  {
    id: 202,
    title: 'Slide 2',
    type: 'content',
    description: 'description 2',
    content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eg'],
    media: { id: 2, name: 'image', type: 'image', url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80' },
  },
  {
    id: 203,
    title: 'Slide 3',
    type: 'range',
    description: 'description 3',
    content: ['Bla bla bla?'],
    media: { id: 1, name: 'video', type: 'video', url: 'FoMlSB6ftQg&list=PLIbLfYSA8ACNYCOaDWmj6EA1F1uS-pyVL' }
  },
  {
    id: 204,
    title: 'Slide 4',
    type: 'range',
    description: 'description 4',
    content: ['How often do you feel you have the strength to stay resilient in difficult situations?'],
  },
  {
    id: 205,
    title: 'Slide 5',
    type: 'range',
    description: 'description 5',
    content: ['How often do you feel you have the power to make positive changes in your life?'],
  },
]

const slides3: Slide[] = [
  {
    id: 301,
    title: 'Slide 1',
    type: 'range',
    description: 'description 1',
    content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies ti'],
  }
]

export const slidesList: Slides = {
  slidesGroup: [
    {
      id: 1,
      description: 'Group 1',
      slides: slides1,
    },
    {
      id: 2,
      description: 'Group 2',
      slides: slides2,
    },
    {
      id: 3,
      description: 'Group 3',
      slides: slides3,
    },
  ]
}
