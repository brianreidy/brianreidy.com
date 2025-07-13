import { Post } from '@src/getPosts';

const sprintFilmShoot2022: Post = {
  slug: 'posts/2022springfilm',
  title: 'spring film shoot',
  date: '2022/6/8',
  body: 'camera: harmon disposable\n film: kentmere pan 400 b&w film',
  description: '',
  type: 'photos',
};

const summerFilmShoot2022: Post = {
  slug: 'posts/2022summerfilm',
  title: 'summer film shoot',
  date: '2022/9/8',
  body: 'camera: harmon disposable\n film: kentmere pan 400 b&w film',
  description: '',
  type: 'photos',
};

const filmShoot2023_2024: Post = {
  slug: 'posts/2024mayfilm',
  title: '2023 summer - 2024 spring film shoot',
  date: '2024/5/19',
  body: 'camera: harmon disposable\n film: kodak gold 200',
  description: '',
  type: 'photos',
};

const filmShoot2024: Post = {
  slug: 'posts/2024julyfilm',
  title: '2024 summer film shoot, wedding shower, court wedding',
  date: '2024/7/01',
  body: 'camera: harmon disposable\n film: Fujicolor 200',
  description: '',
  type: 'photos',
};

const GymTimer: Post = {
  slug: 'GymTimer',
  title: 'Gym Timer',
  date: '2023/10/19',
  body: 'Gym Timer for tracking time between sets',
  description: '',
  type: 'project',
};

const PomoTimer: Post = {
  slug: 'PomoTimer',
  title: 'Pomodoro Timer',
  date: '2025/7/13',
  body: 'Pomo Timer for getting stuff done',
  description:
    'A Pomodoro Timer helps you stay focused by working in short bursts—usually 25 minutes—followed by quick breaks. It’s an easy way to get stuff done without burning out.',
  type: 'project',
};

export default [
  sprintFilmShoot2022,
  summerFilmShoot2022,
  filmShoot2023_2024,
  filmShoot2024,
  GymTimer,
  PomoTimer,
];
