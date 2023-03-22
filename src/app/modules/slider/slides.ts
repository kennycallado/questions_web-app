export type Slide = {
  id: number;
  title: string;
  type?: string;
  description: string;
  image?: string;
}

export const slides: Slide[] = [
    {
      id: 1,
      title: 'Slide 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '',
    },
    {
      id: 2,
      title: 'Slide 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eg',
      image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 3,
      title: 'Slide 3',
      description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
      image: '',
    },
]
