import WebAndMobileIcon from '@/images/WebMobile.png';
import CodeAudit from '@/images/CodeAudit.png';
import BugFixing from '@/images/BugFixing.png';
import JamieImage from '@/images/Jamie-profile.jpg';
import MarieImage from '@/images/Marie-profile.jpg';
import TomImage from '@/images/Tom-profile.jpg';

export const reviews = [
  {
    id: 1,
    text: 'Flamingo fixed our app issues and even helped with bugs we didn\'t notice ourselves. They are very proactive.',
    name: 'Amar A.',
    date: 'July 2022',
  },
  {
    id: 2,
    text: 'They did an amazing job fixing our mobile app. Will reach out for more jobs in the future.',
    name: 'Adam W.',
    date: 'October 2022',
  },
  {
    id: 3,
    text: 'The Flamingo team did an amazing audit for our app. Really fast and efficient!',
    name: 'Stella H.',
    date: 'January 2023',
  },
];

export const services = [
  {
    id: 1,
    backgroundColors: ['#facf39', '#fbdb6b'],
    icon: WebAndMobileIcon,
    name: 'Web & Mobile Development',
    services: [
      'Web Developement',
      'Native App Development',
      'UI/UX & System Design',
      'Custom API Development',
      'Support & Maintenance',
    ],
  },
  {
    id: 2,
    backgroundColors: ['#ea5455', '#f08182'],
    icon: CodeAudit,
    name: 'Code Audit',
    services: [
      'Performance Optimisation',
      'Browser Friendliness',
      'Ease of Navigation',
      'Responsiveness of Design',
    ],
  },
  {
    id: 3,
    backgroundColors: ['#e42728', '#ea5455'],
    icon: BugFixing,
    name: 'Bug Fixing',
    services: [
      'API Data Fetching errors',
      'Syntax, run-time or logical errors',
      'Page not loading',
    ],
  },
];

export const teamMembers = [
  {
    name: 'Jamie',
    image: JamieImage,
    tagLine: 'React Native Expert',
    description: '8+ years of experience with mobile & web development',
  },
  {
    name: 'Marie',
    image: MarieImage,
    tagLine: 'React Expert',
    description: '1+ year of experience with web development using React',
  },
  {
    name: 'Tom',
    image: TomImage,
    tagLine: 'Consultant',
    description: 'Lorem ipsum dolore mi fendo se feng quo dia',
  },
];
