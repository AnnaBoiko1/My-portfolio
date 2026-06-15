"use client";
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Grid from '@mui/material/Grid';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ImageCarousel from '@/components/ImageCarousel';

import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import StarRating from '@/components/StarRating';

import { useScrollNavigation } from '../hooks/useScrollNavigation';


const ProjectLinksDropdown = ({ figmaUrl, githubUrl }: { figmaUrl: string, githubUrl: string }) => {
  const { t } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const hasFigma = Boolean(figmaUrl && figmaUrl.trim() !== '' && figmaUrl !== '#');
  const hasGithub = Boolean(githubUrl && githubUrl.trim() !== '' && githubUrl !== '#');
  const linkCount = (hasFigma ? 1 : 0) + (hasGithub ? 1 : 0);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 150); // Small delay to allow moving to the menu
  };

  const handleMenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const buttonStyles = (isOpen: boolean) => ({
    mt: { xs: 1, md: 4 },
    width: { xs: "40vh", md: 350 },
    py: 1,
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--btn-text)',
    bgcolor: isOpen ? 'var(--btn-stripes)' : 'transparent',
    backgroundImage: isOpen ? 'none' : `linear-gradient(45deg, transparent 25%, var(--btn-stripes) 25%, var(--btn-stripes) 50%, transparent 50%, transparent 75%, var(--btn-stripes) 75%)`,
    textTransform: 'none',
    display: 'inline-flex',
    justifyContent: 'center',
    textShadow: '1px 1px 1px rgba(0,0,0,0.3), 0 0 3px rgba(255,255,255,0.4)',
    backgroundSize: '15px 15px',
    position: 'relative',
    backgroundOrigin: 'padding-box',
    borderRadius: 3,
    boxShadow: isOpen ? '0 10px 30px var(--red)' : 'none',
    transform: isOpen ? 'translateY(-2px)' : 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 3,
      padding: '3px',
      background: 'var(--purple)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 30px var(--red)',
      bgcolor: 'var(--btn-hover-bg)',
      backgroundImage: 'none',
    }
  });

  if (linkCount === 0) return null;

  if (linkCount === 1) {
    const singleUrl = hasFigma ? figmaUrl : githubUrl;
    const singleLabel = hasFigma ? "Figma" : "GitHub";

    return (
      <Box sx={{ display: 'inline-block' }}>
        <Button
          onClick={() => window.open(singleUrl, '_blank', 'noopener,noreferrer')}
          sx={buttonStyles(false)}
        >
          {singleLabel}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      onMouseLeave={handleClose}
      sx={{ display: 'inline-block' }}
    >
      <Button
        onMouseEnter={handleOpen}
        onClick={handleOpen}
        sx={buttonStyles(open)}
      >
        {t('projects_link_to_project')}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        onMouseEnter={handleMenuEnter}
        onMouseLeave={handleClose}
        MenuListProps={{
          onMouseEnter: handleMenuEnter,
          sx: { py: 0 } // Optional: remove default padding if needed
        }}
        PaperProps={{
          sx: {
            mt: 0.5,
            bgcolor: 'transparent',
            backdropFilter: 'blur(10px)',
            border: 'none',
            boxShadow: 'none',
            borderRadius: 2,
            minWidth: 350,
            pointerEvents: 'auto'
          }
        }}
        sx={{ pointerEvents: isMobile ? 'auto' : 'none' }}
      >
        <MenuItem
          onClick={() => { window.open(figmaUrl, '_blank', 'noopener,noreferrer'); setAnchorEl(null); }}
          disableRipple
          sx={{
            color: 'var(--text)',
            gap: 2,
            bgcolor: 'transparent',
            // Ensure no background on potential focus/active states
            '&:focus, &:active, &.Mui-selected, &.Mui-selected:hover': {
              bgcolor: 'transparent'
            },
            // Only apply purple color on hover
            '&:hover': {
              color: 'var(--purple)',
              bgcolor: 'transparent'
            },
            pl: 4
          }}
        >
          <svg width="24" height="24" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 25.8478 20.0536 23.3043 21.9289 21.4289C23.8043 19.5536 26.3478 18.5 29 18.5C31.6522 18.5 34.1957 19.5536 36.0711 21.4289C37.9464 23.3043 39 25.8478 39 28.5C39 31.1522 37.9464 33.6957 36.0711 35.5711C34.1957 37.4464 31.6522 38.5 29 38.5C26.3478 38.5 23.8043 37.4464 21.9289 35.5711C20.0536 33.6957 19 31.1522 19 28.5Z" fill="#1ABCFE" />
            <path d="M0 47.5C0 44.8478 1.05357 42.3043 2.92893 40.4289C4.8043 38.5536 7.34784 37.5 10 37.5C12.6522 37.5 15.1957 38.5536 17.0711 40.4289C18.9464 42.3043 20 44.8478 20 47.5C20 50.1522 18.9464 52.6957 17.0711 54.5711C15.1957 56.4464 12.6522 57.5 10 57.5C7.34784 57.5 4.8043 56.4464 2.92893 54.5711C1.05357 52.6957 0 50.1522 0 47.5Z" fill="#0ACF83" />
            <path d="M0 28.5C0 25.8478 1.05357 23.3043 2.92893 21.4289C4.8043 19.5536 7.34784 18.5 10 18.5H20V38.5H10C7.34784 38.5 4.8043 37.4464 2.92893 35.5711C1.05357 33.6957 0 31.1522 0 28.5Z" fill="#A259FF" />
            <path d="M0 9.5C0 6.84784 1.05357 4.3043 2.92893 2.42893C4.8043 0.553571 7.34784 -4.76837e-07 10 0H20V19H10C7.34784 19 4.8043 18.4464 2.92893 16.5711C1.05357 14.6957 0 12.1522 0 9.5Z" fill="#F24E1E" />
            <path d="M20 0H30C32.6522 -4.76837e-07 35.1957 0.553571 37.0711 2.42893C38.9464 4.3043 40 6.84784 40 9.5C40 12.1522 38.9464 14.6957 37.0711 16.5711C35.1957 18.4464 32.6522 19 30 19H20V0Z" fill="#FF7262" />
          </svg>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>Figma</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => { window.open(githubUrl, '_blank', 'noopener,noreferrer'); setAnchorEl(null); }}
          disableRipple
          sx={{
            color: 'var(--text)',
            gap: 2,
            bgcolor: 'transparent',
            // Ensure no background on potential focus/active states
            '&:focus, &:active, &.Mui-selected, &.Mui-selected:hover': {
              bgcolor: 'transparent'
            },
            // Only apply purple color on hover
            '&:hover': {
              color: 'var(--purple)',
              bgcolor: 'transparent'
            },
            '&:hover svg': { fill: 'var(--purple)' },
            pl: 4
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815V20.73C5.685 21.465 4.98 19.125 4.98 19.125C4.425 17.73 3.63 17.355 3.63 17.355C2.535 16.605 3.72 16.62 3.72 16.62C4.935 16.71 5.58 17.865 5.58 17.865C6.66 19.725 8.415 19.185 9.105 18.87C9.21 18.09 9.525 17.565 9.87 17.265C7.185 16.965 4.365 15.93 4.365 11.295C4.365 9.975 4.83 8.895 5.61 8.055C5.475 7.74 5.07 6.51 5.73 4.86C5.73 4.86 6.735 4.545 9.03 6.09C9.99 5.82 11.01 5.685 12.03 5.685C13.05 5.685 14.07 5.82 15.03 6.09C17.325 4.545 18.33 4.86 18.33 4.86C18.99 6.51 18.585 7.74 18.45 8.055C19.23 8.895 19.695 9.975 19.695 11.295C19.695 15.945 16.86 16.95 14.175 17.25C14.61 17.625 15 18.36 15 19.485V22.815C15 23.13 15.225 23.505 15.825 23.385C20.58 21.795 24 17.31 24 12C24 5.37 18.63 0 12 0Z" />
          </svg>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>GitHub</Typography>
        </MenuItem>
      </Menu>
    </Box >
  );
};


const categories = [
  { id: 'all', translationKey: 'projects_filter_all' },
  { id: 'development', translationKey: 'projects_filter_development' },
  { id: 'data-analytics', translationKey: 'projects_filter_data_analytics' }
] as const;

const localProjects = [
  {
    id: 'd9b7a4cf-0a4e-4f01-8b9a-4c28f0d5718a',
    slug: 'bank-churn-analysis',
    position: 4,
    figma_url: '',
    github_url: 'https://github.com/AnnaBoiko1/bank-churn-analysis',
    notebook_url: 'https://github.com/AnnaBoiko1/bank-churn-analysis/blob/main/Bank_Churn_Analysis.ipynb',
    images: [
      '/churn_1.png',
      '/churn_2.png',
      '/churn_3.png',
      '/churn_5.png',
      '/churn_6.png'
    ],
    name: {
      EN: 'Bank Customer Churn Analysis',
      UA: 'Аналіз відтоку клієнтів банку',
      FR: "Analyse de l'attrition des clients bancaires",
      DE: 'Analyse der Bankkundenabwanderung'
    },
    tagline: {
      EN: 'From Raw Data to Predictive Insights',
      UA: 'Від сирих даних до прогнозних інсайтів',
      FR: 'Des données brutes aux insights prédictifs',
      DE: 'Von Rohdaten zu prädiktiven Erkenntnissen'
    },
    description: {
      EN: 'End-to-end data analytics project analyzing churn behavior across 10,000 bank customers. Cleaned real-world messy data, uncovered key churn drivers through interactive visualizations, and built a Random Forest model that identifies high-risk customers with 85.9% ROC-AUC accuracy.',
      UA: 'Енд-ту-енд проєкт з аналітики даних, що аналізує поведінку відтоку 10 000 клієнтів банку. Очищено реальні «брудні» дані, виявлено ключові фактори відтоку за допомогою інтерактивних візуалізацій та побудовано модель Random Forest, яка ідентифікує клієнтів високого ризику з точністю 85.9% ROC-AUC.',
      FR: "Projet d'analyse de données de bout en bout analysant le comportement d'attrition de 10 000 clients bancaires. Nettoyage de données réelles complexes, découverte des principaux facteurs d'attrition via des visualisations interactives et construction d'un modèle Random Forest identifiant les clients à haut risque avec une précision ROC-AUC de 85,9 %.",
      DE: 'End-to-End-Datenanalyseprojekt zur Untersuchung des Abwanderungsverhaltens von 10.000 Bankkunden. Bereinigung realer, unstrukturierter Daten, Aufdeckung wichtiger Abwanderungstreiber durch interaktive Visualisierungen und Erstellung eines Random-Forest-Modells, das Hochrisikokunden mit einer Genauigkeit von 85,9 % ROC-AUC identifiziert.'
    },
    highlights: {
      EN: [
        'Germany churns at <strong>32.4%</strong>, nearly <strong>2×</strong> France and Spain',
        'Customers aged <strong>51–60</strong> show <strong>56%</strong> churn rate',
        '<strong>1,823</strong> high-risk customers identified by ML model (actual churn <strong>71.7%</strong>)'
      ],
      UA: [
        'Німеччина має відтік <strong>32.4%</strong>, майже вдвічі більше за Францію та Іспанію',
        'Клієнти віком <strong>51–60 років</strong> демонструють рівень відтоку <strong>56%</strong>',
        '<strong>1 823</strong> клієнти високого ризику ідентифіковані моделлю машинного навчання (фактичний відтік <strong>71.7%</strong>)'
      ],
      FR: [
        "L'Allemagne enregistre une attrition de <strong>32,4 %</strong>, soit près de <strong>2×</strong> la France et l'Espagne",
        "Les clients âgés de <strong>51 à 60 ans</strong> affichent un taux d'attrition de <strong>56 %</strong>",
        "<strong>1 823</strong> clients à haut risque identifiés par le modèle ML (attrition réelle de <strong>71,7 %</strong>)"
      ],
      DE: [
        'Deutschland verzeichnet eine Abwanderungsquote von <strong>32,4 %</strong>, fast das <strong>Doppelte</strong> von Frankreich und Spanien',
        'Kunden im Alter von <strong>51–60 Jahren</strong> weisen eine Abwanderungsquote von <strong>56 %</strong> auf',
        '<strong>1.823</strong> Hochrisikokunden wurden durch das ML-Modell identifiziert (tatsächliche Abwanderung <strong>71,7 %</strong>)'
      ]
    },
    tags: ['Python', 'Pandas', 'Plotly', 'Dash', 'Scikit-learn']
  },
  {
    id: 'd9b7a4cf-0a4e-4f01-8b9a-4c28f0d5718b',
    slug: 'ping-it',
    position: 1,
    figma_url: 'https://www.figma.com/design/IdMHUj0lHkEr4KxSYTvVUS/LW--1282-Ping-it?m=auto&t=8Xh21YRJKjjIhOG1-6',
    github_url: 'https://github.com/S00J1NK1M/ping_it',
    images: [
      '/ping_it_1.png',
      '/ping_it_2.png',
      '/ping_it_3.png',
      '/ping_it_4.png',
      '/ping_it_5.png',
      '/ping_it_6.png'
    ],
    name: {
      DE: 'Ping It',
      EN: 'Ping It',
      FR: 'Ping It',
      UA: 'Пінг Іт'
    },
    tagline: {
      EN: 'Table Tennis Court Reservation Platform',
      UA: 'Платформа для бронювання настільного тенісу',
      FR: 'Plateforme de réservation de tennis de table',
      DE: 'Tischtennis-Reservierungsplattform'
    },
    description: {
      DE: 'Eine responsive Web-App für Tischtennis-Enthusiasten, um nahe Tischtennisplätze zu entdecken, zu buchen, Reservierungen zu verwalten und sich mit lokalen Spielern in Echtzeit zu verbinden. Mit React und Ruby on Rails gebaut, integriert APIs für Live-Karten-Updates und nahtlose Match-Koordination.',
      EN: 'A responsive web app for table tennis enthusiasts to discover and book nearby tables, manage reservations, and connect with local players in real time. Built with React and Ruby on Rails, it integrates APIs for live map updates and seamless match coordination.',
      FR: "Une application web responsive pour les passionnés de tennis de table afin de découvrir et réserver des tables à proximité, gérer les réservations et se connecter avec des joueurs locaux en temps réel. Construite avec React et Ruby on Rails, elle intègre des APIs pour des mises à jour de carte en direct et une coordination de match fluide.",
      UA: 'Адаптивний веб-додаток для любителів настільного тенісу, щоб знаходити та бронювати столики поруч, керувати бронюваннями та спілкуватися з локальними гравцями в реальному часі. Створено з React та Ruby on Rails, інтегровано API для живих карт та координації матчів.'
    },
    highlights: {
      EN: [
        'Contributed <strong>user authentication</strong> (JWT), live map integration with Google Maps API',
        'Led <strong>mobile-first UI/UX redesign</strong>, improved usability across all breakpoints',
        'Delivered a <strong>real-time booking system</strong> with conflict detection and confirmation flow'
      ],
      UA: [
        'Реалізувала <strong>автентифікацію користувачів</strong> (JWT) та інтеграцію карти Google Maps API',
        'Очолила <strong>мобільний редизайн UI/UX</strong>, покращила зручність на всіх пристроях',
        'Додала <strong>систему бронювання в реальному часі</strong> з виявленням конфліктів та підтвердженням'
      ],
      FR: [
        "Contribution à l'<strong>authentification utilisateur</strong> (JWT), intégration de carte en direct avec l'API Google Maps",
        "Direction de la <strong>refonte UI/UX mobile-first</strong>, amélioration de l'ergonomie sur tous les écrans",
        "Livraison d'un <strong>système de réservation en temps réel</strong> avec détection des conflits"
      ],
      DE: [
        'Beitrag zur <strong>Benutzerauthentifizierung</strong> (JWT), Live-Kartenintegration mit Google Maps API',
        'Leitung des <strong>Mobile-First-UI/UX-Redesigns</strong>, verbesserte Benutzerfreundlichkeit über alle Breakpoints',
        'Bereitstellung eines <strong>Echtzeit-Buchungssystems</strong> mit Konflikterkennung und Bestätigungsablauf'
      ]
    },
    tags: ['React', 'Ruby on Rails', 'PostgreSQL', 'Google Maps API', 'Figma'],
    project_type: {
      EN: 'Team project • 4 devs',
      UA: 'Командний проєкт • 4 розробники',
      FR: "Projet d'équipe • 4 dévs",
      DE: 'Teamprojekt • 4 Entwickler'
    }
  },
  {
    id: '20ad13ed-b9fc-444c-a387-d7f00a42edc4',
    slug: 'lingoda',
    position: 2,
    figma_url: 'https://www.figma.com/design/LoJSPqtZcWbeKD6hcOdo0x/Lingoda-Copycat?m=auto&t=8Xh21YRJKjjIhOG1-6',
    github_url: 'https://github.com/S00J1NK1M/lingoda_copycat',
    images: [
      '/lingoda_1.png',
      '/lingoda_2.png',
      '/lingoda_3.png'
    ],
    name: {
      DE: 'Lingoda Kopie',
      EN: 'Lingoda Copycat',
      FR: 'Copie Lingoda',
      UA: 'Копікат Лінгода'
    },
    tagline: {
      EN: 'Language Course Booking Platform',
      UA: 'Платформа для бронювання мовних курсів',
      FR: 'Plateforme de réservation de cours de langue',
      DE: 'Sprachkurs-Buchungsplattform'
    },
    description: {
      DE: 'Benutzerfreundliche Web-Plattform zum Entdecken und Buchen von Sprachkursen. Lernende filtern, ansehen und buchen in wenigen Klicks, während sie Buchungen mühelos verwalten. Mit Ruby on Rails, JavaScript (ES6) und SCSS gebaut, mit responsivem UI.',
      EN: 'A language course booking platform inspired by Lingoda, users can browse, filter, and reserve lessons, and manage their schedule. Focused on clean UX and reliable data management. Built with Ruby on Rails, JavaScript (ES6), and SCSS, with a responsive UI.',
      FR: "Plateforme web conviviale pour découvrir et réserver des cours de langues facilement. Les apprenants filtrent, voient et réservent en quelques clics tout en gérant leurs réservations. Construite avec Ruby on Rails, JavaScript (ES6) et SCSS, avec UI responsive.",
      UA: 'Зручна веб-платформа для пошуку та бронювання мовних курсів. Учні фільтрують, переглядають та резервують уроки кількома кліками, керуючи бронюваннями. Створено з Ruby on Rails, JavaScript (ES6) та SCSS, з адаптивним UI.'
    },
    highlights: {
      EN: [
        'Implemented <strong>secure authentication</strong> with Devise, login, signup, session management',
        'Built <strong>booking & cancellation flow</strong> with PostgreSQL relational data model',
        'Integrated <strong>Cloudinary</strong> for scalable image storage and upload'
      ],
      UA: [
        'Реалізував <strong>безпечну автентифікацію</strong> з Devise, вхід, реєстрація, управління сесіями',
        'Створив <strong>процес бронювання та скасування</strong> за допомогою реляційної моделі PostgreSQL',
        'Інтегрував <strong>Cloudinary</strong> для масштабованого зберігання та завантаження зображень'
      ],
      FR: [
        "Implémentation d'une <strong>authentification sécurisée</strong> avec Devise, connexion, inscription, sessions",
        "Création du <strong>flux de réservation & annulation</strong> avec le modèle de données PostgreSQL",
        "Intégration de <strong>Cloudinary</strong> pour le stockage et le téléchargement d'images évolutifs"
      ],
      DE: [
        'Implementierung der <strong>sicheren Authentifizierung</strong> mit Devise, Login, Registrierung, Sitzungsverwaltung',
        'Erstellung des <strong>Buchungs- und Stornierungsablaufs</strong> mit relationalem PostgreSQL-Datenmodell',
        'Integration von <strong>Cloudinary</strong> für skalierbare Bildspeicherung und -upload'
      ]
    },
    tags: ['Ruby on Rails', 'JavaScript ES6', 'PostgreSQL', 'Devise', 'Cloudinary'],
    project_type: {
      EN: 'Team project • 3 devs',
      UA: 'Командний проєкт • 3 розробники',
      FR: "Projet d'équipe • 3 dévs",
      DE: 'Teamprojekt • 3 Entwickler'
    }
  },
  {
    id: 'a928b108-0964-431c-b21d-fc828d9b8c66',
    slug: 'watch-list',
    position: 3,
    figma_url: '#',
    github_url: 'https://github.com/AnnaBoiko1/rails-watch-list',
    images: [
      '/watch_list.png'
    ],
    name: {
      DE: 'Watch List',
      EN: 'Watch List',
      FR: 'Liste de Visionnage',
      UA: 'Список для перегляду'
    },
    tagline: {
      EN: 'Personal Movie Collection Curator',
      UA: 'Персональний куратор колекції фільмів',
      FR: 'Conservateur personnel de collections de films',
      DE: 'Persönlicher Kurator für Filmsammlungen'
    },
    description: {
      DE: 'Eine persönliche Filmverwaltungs-App, mit der Benutzer benutzerdefinierte Merklisten erstellen, Filme aus einer externen API hinzufügen und Sammlungen nach Genre organisieren können. Solo als Rails-CRUD-Anwendung erstellt.',
      EN: 'A personal movie management app where users create custom watchlists, add films from an external API, and organize collections by genre. Built solo as a Rails CRUD application.',
      FR: 'Une application personnelle de gestion de films où les utilisateurs créent des listes de visionnage personnalisées, ajoutent des films depuis une API externe et organisent les collections par genre. Conçu en solo comme application Rails CRUD.',
      UA: 'Персональний додаток для управління фільмами, де користувачі створюють власні списки перегляду, додають фільми з зовнішнього API та організовують колекції за жанрами. Створено соло як Rails CRUD додаток.'
    },
    highlights: {
      EN: [
        'Built full <strong>CRUD functionality</strong>, create, read, update, delete lists and movies',
        'Integrated <strong>external movie API</strong> for search and data population',
        '<strong>Secure auth</strong> with Devise, responsive design with custom SCSS'
      ],
      UA: [
        'Створив повний <strong>функціонал CRUD</strong>, створення, читання, оновлення, видалення списків та фільмів',
        'Інтегрував <strong>зовнішній API фільмів</strong> для пошуку та наповнення даних',
        '<strong>Безпечна автентифікація</strong> з Devise, адаптивний дизайн з кастомним SCSS'
      ],
      FR: [
        'Création de la <strong>fonctionnalité CRUD</strong> complète, créer, lire, mettre à jour, supprimer des listes et des films',
        "Intégration d'une <strong>API externe de films</strong> pour la recherche et le peuplement des données",
        '<strong>Auth sécurisée</strong> avec Devise, design responsive avec SCSS personnalisé'
      ],
      DE: [
        'Erstellung der vollständigen <strong>CRUD-Funktionalität</strong>, Erstellen, Lesen, Aktualisieren, Löschen von Listen und Filmen',
        'Integration einer <strong>externen Film-API</strong> zur Suche und Datenbefüllung',
        '<strong>Sichere Authentifizierung</strong> mit Devise, responsive Gestaltung mit benutzerdefiniertem SCSS'
      ]
    },
    tags: ['Ruby on Rails', 'JavaScript ES6', 'PostgreSQL', 'SCSS', 'Devise'],
    project_type: {
      EN: 'Solo project',
      UA: 'Соло проєкт',
      FR: 'Projet solo',
      DE: 'Solo-Projekt'
    }
  }
];

export default function ProjectsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useScrollNavigation('/contact', '/about');
  const { t, language } = useLanguage();

  const [projects, setProjects] = React.useState<any[]>(localProjects);
  const [activeCategory, setActiveCategory] = React.useState<'all' | 'development' | 'data-analytics'>('all');
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeHoverImage, setActiveHoverImage] = React.useState<string | null>(null);
  const galleryScrollRef = React.useRef<HTMLDivElement>(null);

  const handleGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalScroll = target.scrollWidth - target.clientWidth;
    if (totalScroll <= 0) return;
    setScrollProgress(target.scrollLeft / totalScroll);
  };

  React.useEffect(() => {
    setScrollProgress(0);
    if (galleryScrollRef.current) {
      galleryScrollRef.current.scrollTop = 0;
    }
  }, [activeCategory]);

  React.useEffect(() => {
    setProjects(localProjects);
  }, []);

  const filteredProjects = React.useMemo(() => {
    const list = projects.filter((project) => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'development') {
        return project.slug !== 'bank-churn-analysis';
      }
      if (activeCategory === 'data-analytics') {
        return project.slug === 'bank-churn-analysis';
      }
      return true;
    });

    if (activeCategory === 'all') {
      return [...list].sort((a, b) => {
        if (a.slug === 'bank-churn-analysis') return -1;
        if (b.slug === 'bank-churn-analysis') return 1;
        return (a.position || 0) - (b.position || 0);
      });
    }
    return list;
  }, [projects, activeCategory]);

  const renderProjectDetailsTop = (project: any) => {
    return (
      <Box>
        {/* Organization/Category and Project Type badges */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{
            borderRadius: '50px',
            px: 2,
            py: 0.5,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            bgcolor: 'rgba(167, 73, 214, 0.12)',
            color: 'var(--purple)',
            border: '1.5px solid var(--purple)',
            textTransform: 'uppercase'
          }}>
            {t('projects_filter_development')}
          </Box>
          {project.project_type && (
            <Box sx={{
              borderRadius: '50px',
              px: 2,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text)',
              border: '1.5px solid var(--copy-email-hover)',
              textTransform: 'uppercase',
              opacity: 0.8
            }}>
              {project.project_type?.[language] || project.project_type?.EN || ""}
            </Box>
          )}
        </Box>

        <Typography variant='h4' sx={{ fontWeight: 800, color: 'var(--text)', lineHeight: 1.15 }}>
          <strong>{project.name?.[language] || project.name?.EN || ""}</strong>
        </Typography>

        <Typography variant='h5' sx={{ color: 'var(--purple)', fontWeight: 600, mt: 1, mb: 2, fontSize: '1.25rem', fontStyle: 'italic' }}>
          {project.tagline?.[language] || project.tagline?.EN || ""}
        </Typography>

        <Typography variant='body1' sx={{ mt: 1, mb: 3, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'var(--text)', opacity: 0.9, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: project.description?.[language] || project.description?.EN || "" }} />

        {/* Highlights */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          {(project.highlights?.[language] || project.highlights?.EN || []).map((highlight: string, i: number) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <Box sx={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                bgcolor: 'var(--purple)',
                mt: '8px',
                flexShrink: 0,
                boxShadow: '0 0 6px var(--purple)'
              }} />
              <Typography
                variant='body2'
                sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' }, color: 'var(--text)', lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: highlight }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderProjectDetailsBottom = (project: any) => {
    const hasFigma = Boolean(project.figma_url && project.figma_url.trim() !== '' && project.figma_url !== '#');
    const hasGithub = Boolean(project.github_url && project.github_url.trim() !== '' && project.github_url !== '#');

    return (
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 3, borderTop: '1px solid var(--copy-email-hover)', pt: 2, mt: 2, width: '100%' }}>
        {/* Tech Tags */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {project.tags?.map((tag: string, i: number) => (
            <Box key={i} sx={{
              borderRadius: '4px',
              px: 1.2,
              py: 0.4,
              fontSize: '0.8rem',
              fontWeight: 600,
              bgcolor: 'rgba(0,0,0,0.03)',
              color: 'var(--text)',
              border: '1px solid var(--copy-email-hover)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'var(--copy-email-hover)',
              }
            }}>
              {tag}
            </Box>
          ))}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' } }}>
          {hasFigma && (
            <Button
              onClick={() => window.open(project.figma_url, '_blank', 'noopener,noreferrer')}
              sx={{
                borderRadius: '8px',
                px: 2,
                py: 0.8,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: '1.5px solid var(--purple)',
                color: 'var(--purple)',
                bgcolor: 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.2,
                flex: { xs: 1, sm: 'initial' },
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'var(--copy-email-hover)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 28.5C19 25.8478 20.0536 23.3043 21.9289 21.4289C23.8043 19.5536 26.3478 18.5 29 18.5C31.6522 18.5 34.1957 19.5536 36.0711 21.4289C37.9464 23.3043 39 25.8478 39 28.5C39 31.1522 37.9464 33.6957 36.0711 35.5711C34.1957 37.4464 31.6522 38.5 29 38.5C26.3478 38.5 23.8043 37.4464 21.9289 35.5711C20.0536 33.6957 19 31.1522 19 28.5Z" fill="#1ABCFE" />
                <path d="M0 47.5C0 44.8478 1.05357 42.3043 2.92893 40.4289C4.8043 38.5536 7.34784 37.5 10 37.5C12.6522 37.5 15.1957 38.5536 17.0711 40.4289C18.9464 42.3043 20 44.8478 20 47.5C20 50.1522 18.9464 52.6957 17.0711 54.5711C15.1957 56.4464 12.6522 57.5 10 57.5C7.34784 57.5 4.8043 56.4464 2.92893 54.5711C1.05357 52.6957 0 50.1522 0 47.5Z" fill="#0ACF83" />
                <path d="M0 28.5C0 25.8478 1.05357 23.3043 2.92893 21.4289C4.8043 19.5536 7.34784 18.5 10 18.5H20V38.5H10C7.34784 38.5 4.8043 37.4464 2.92893 35.5711C1.05357 33.6957 0 31.1522 0 28.5Z" fill="#A259FF" />
                <path d="M0 9.5C0 6.84784 1.05357 4.3043 2.92893 2.42893C4.8043 0.553571 7.34784 -4.76837e-07 10 0H20V19H10C7.34784 19 4.8043 18.4464 2.92893 16.5711C1.05357 14.6957 0 12.1522 0 9.5Z" fill="#F24E1E" />
                <path d="M20 0H30C32.6522 -4.76837e-07 35.1957 0.553571 37.0711 2.42893C38.9464 4.3043 40 6.84784 40 9.5C40 12.1522 38.9464 14.6957 37.0711 16.5711C35.1957 18.4464 32.6522 19 30 19H20V0Z" fill="#FF7262" />
              </svg>
              Figma
            </Button>
          )}

          {hasGithub && (
            <Button
              onClick={() => window.open(project.github_url, '_blank', 'noopener,noreferrer')}
              sx={{
                borderRadius: '8px',
                px: 2,
                py: 0.8,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                bgcolor: 'var(--purple)',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.2,
                flex: { xs: 1, sm: 'initial' },
                boxShadow: '0 4px 12px rgba(167, 73, 214, 0.3)',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'var(--btn-hover-bg)',
                  boxShadow: '0 6px 16px rgba(167, 73, 214, 0.4)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </Button>
          )}
        </Box>
      </Box>
    );
  };

  const renderProjectDetails = (project: any, hideTextOnMobile = false) => {
    return (
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, position: 'relative', width: '100%' }}>
        <Box sx={{ display: hideTextOnMobile ? { xs: 'none', md: 'block' } : 'block' }}>
          {renderProjectDetailsTop(project)}
        </Box>
        {renderProjectDetailsBottom(project)}
      </Box>
    );
  };

  const renderHeader = () => {
    return (
      <Box sx={{ width: '100%', mb: { xs: 1, md: 2 } }}>
        <Typography variant='h3' sx={{ marginTop: { xs: '60px', md: 12 }, fontWeight: 700, color: 'var(--text)' }}>
          <strong>{t('projects_title')}</strong>
        </Typography>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, position: 'relative', top: { xs: -25, md: -15 }, lineHeight: 1 }}>
          <span style={{ color: 'var(--blue)' }}>____</span>
        </Typography>
      </Box>
    );
  };

  const renderDashboardMockup = () => {
    return (
      <Box sx={{
        bgcolor: '#0B132B',
        borderRadius: '16px',
        p: { xs: 2, md: 3 },
        color: '#E0E1DD',
        boxShadow: '0 8px 32px rgba(11, 19, 43, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, md: 3 },
        height: '100%',
        minHeight: { xs: '320px', md: '380px' },
        justifyContent: 'space-between',
        fontFamily: 'monospace'
      }}>
        {/* Stat Cards */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {/* Card 1 */}
          <Box sx={{
            flex: 1,
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            p: { xs: 1, md: 1.5 },
            textAlign: 'center'
          }}>
            <Typography sx={{ color: '#EF4444', fontWeight: 800, fontSize: { xs: '1.1rem', md: '1.4rem' }, fontFamily: 'sans-serif' }}>
              20.4%
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '8px', md: '10px' }, textTransform: 'uppercase', fontWeight: 600, mt: 0.5 }}>
              Churn rate
            </Typography>
          </Box>
          {/* Card 2 */}
          <Box sx={{
            flex: 1,
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            p: { xs: 1, md: 1.5 },
            textAlign: 'center'
          }}>
            <Typography sx={{ color: '#60E7F1', fontWeight: 800, fontSize: { xs: '1.1rem', md: '1.4rem' }, fontFamily: 'sans-serif' }}>
              10,000
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '8px', md: '10px' }, textTransform: 'uppercase', fontWeight: 600, mt: 0.5 }}>
              Customers
            </Typography>
          </Box>
          {/* Card 3 */}
          <Box sx={{
            flex: 1,
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            p: { xs: 1, md: 1.5 },
            textAlign: 'center'
          }}>
            <Typography sx={{ color: '#EF4444', fontWeight: 800, fontSize: { xs: '1.1rem', md: '1.4rem' }, fontFamily: 'sans-serif' }}>
              2,037
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: { xs: '8px', md: '10px' }, textTransform: 'uppercase', fontWeight: 600, mt: 0.5 }}>
              Churned
            </Typography>
          </Box>
        </Box>

        {/* Bar Chart Mockup */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{
            height: { xs: '100px', md: '120px' },
            display: 'flex',
            alignItems: 'flex-end',
            gap: { xs: 0.6, md: 1 },
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            pb: 0.5
          }}>
            {/* France */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <Box sx={{ height: '35%', bgcolor: '#3B82F6', borderRadius: '4px 4px 0 0', '&:hover': { opacity: 0.85 } }} />
            </Box>
            {/* Germany */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <Box sx={{ height: '75%', bgcolor: '#EF4444', borderRadius: '4px 4px 0 0', '&:hover': { opacity: 0.85 } }} />
            </Box>
            {/* Spain */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <Box sx={{ height: '35%', bgcolor: '#3B82F6', borderRadius: '4px 4px 0 0', '&:hover': { opacity: 0.85 } }} />
            </Box>

            {/* Gap separator */}
            <Box sx={{ width: '2px', height: '80%', bgcolor: 'rgba(255,255,255,0.08)', mx: 0.5 }} />

            {/* 18-30 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <Box sx={{ height: '28%', bgcolor: '#10B981', borderRadius: '4px 4px 0 0', '&:hover': { opacity: 0.85 } }} />
            </Box>
            {/* 31-40 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <Box sx={{ height: '42%', bgcolor: '#10B981', borderRadius: '4px 4px 0 0', '&:hover': { opacity: 0.85 } }} />
            </Box>
            {/* 41-50 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <Box sx={{ height: '60%', bgcolor: '#F59E0B', borderRadius: '4px 4px 0 0', '&:hover': { opacity: 0.85 } }} />
            </Box>
            {/* 51-60 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
              <Box sx={{ height: '90%', bgcolor: '#EF4444', borderRadius: '4px 4px 0 0', '&:hover': { opacity: 0.85 } }} />
            </Box>
          </Box>

          {/* Bar Chart Labels */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: { xs: '7.5px', md: '9px' }, color: 'rgba(255, 255, 255, 0.4)', fontWeight: 600 }}>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, width: '40%', justifyContent: 'space-around' }}>
              <span>France</span>
              <span>Germany</span>
              <span>Spain</span>
            </Box>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, width: '55%', justifyContent: 'space-around' }}>
              <span>18-30</span>
              <span>31-40</span>
              <span>41-50</span>
              <span>51-60</span>
            </Box>
          </Box>
        </Box>

        {/* Donut Chart and Legend */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'conic-gradient(#EF4444 0% 20.4%, #10B981 20.4% 100%)',
              position: 'relative',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
              <Box sx={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                bgcolor: '#0B132B',
                position: 'absolute',
                top: '8px',
                left: '8px'
              }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: { xs: '8px', md: '10px' }, fontWeight: 600 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box sx={{ width: '6px', height: '6px', borderRadius: '50%', bgcolor: '#EF4444' }} />
                <span>Churned 20.4%</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box sx={{ width: '6px', height: '6px', borderRadius: '50%', bgcolor: '#10B981' }} />
                <span>Retained 79.6%</span>
              </Box>
            </Box>
          </Box>

          <Typography sx={{ fontSize: { xs: '8px', md: '10px' }, color: 'rgba(255, 255, 255, 0.3)', fontStyle: 'italic', alignSelf: 'flex-end' }}>
            Plotly Dash • Interactive
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderLayout0 = (project: any) => {
    return (
      <Container key={project.id} maxWidth="lg" sx={{
        scrollSnapAlign: 'start',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        pb: 20
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, gap: { xs: 0, md: 4 }, mt: { xs: 14, md: 22 } }}>
          {/* MOBILE ONLY: Side-by-side layout */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', gap: 1, mt: 0, alignItems: 'center' }}>
            <Box sx={{ width: '50%', ml: -1 }}>
              <ImageCarousel images={project.images} alt={project.name?.[language] || project.name?.EN || ""} slideWidth="100%" />
            </Box>
            <Box sx={{ width: '60%' }}>
              <Typography variant='h6' sx={{ mb: 1, fontWeight: 700 }}>
                {project.name?.[language] || project.name?.EN || ""}
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '1rem', mr: -2 }} dangerouslySetInnerHTML={{ __html: project.description?.[language] || project.description?.EN || "" }} />
            </Box>
          </Box>

          {/* DESKTOP: Grid Images */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, flex: 1, maxWidth: { md: 600 } }}>
            <Grid container spacing={0} columns={{ xs: 6, md: 6 }}>
              {project.images?.map((src: string, i: number) => (
                <Grid size={{ xs: 2, md: 2 }} key={i}>
                  <Image src={src} alt={project.name?.[language] || project.name?.EN || ""} width={200} height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} priority />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Content Text (Right on Desktop) */}
          {renderProjectDetails(project, true)}
        </Box >
      </Container>
    );
  };

  const renderLayout1 = (project: any) => {
    return (
      <Container key={project.id} maxWidth="lg" sx={{
        scrollSnapAlign: 'start', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, pb: 20
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', gap: { xs: 0, md: 4 }, mt: { xs: 14, md: 22 } }}>
          <Box sx={{ display: { xs: 'contents', md: 'block' }, flex: 1, minWidth: 0, position: 'relative', zIndex: 10, pt: { md: 6 } }}>
            <Box sx={{ order: { xs: 1, md: 1 }, width: '100%' }}>
              {renderProjectDetailsTop(project)}
            </Box>
            <Box sx={{ order: { xs: 3, md: 3 }, width: '100%' }}>
              {renderProjectDetailsBottom(project)}
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'contents', md: 'block' }, flex: 1, maxWidth: { md: 600 }, width: '100%' }}>
            {/* MOBILE: Carousel */}
            <Box sx={{ order: { xs: 2, md: 2 }, display: { xs: 'block', md: 'none' }, width: '100%', mt: { xs: -4, md: 2 } }}>
              <ImageCarousel images={project.images} alt={project.name?.[language] || project.name?.EN || ""} objectFit="contain" />
            </Box>
            {/* DESKTOP: Grid */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid container spacing={0} columns={6}>
                {project.images?.map((src: string, i: number) => (
                  <Grid size={6} key={i}>
                    <Image src={src} alt={project.name?.[language] || project.name?.EN || ""} width={300} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} priority />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  };

  const renderLayout2 = (project: any) => {
    return (
      <Container key={project.id} maxWidth="lg" sx={{
        scrollSnapAlign: 'start', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, pb: 20
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, gap: { xs: 0, md: 4 }, mt: { xs: 14, md: 22 } }}>
          <Box sx={{ display: { xs: 'contents', md: 'block' }, flex: 1, maxWidth: { md: 600 }, width: '100%' }}>
            <Box sx={{ order: { xs: 2, md: 1 }, width: '100%', mt: { xs: 2, md: 0 } }}>
              <Image src={project.images?.[0] || '/img_placeholder.png'} alt={project.name?.[language] || project.name?.EN || ""} width={300} height={300} priority style={{
                width: '100%', height: '100%', maxHeight: '50vh', objectFit: 'cover', display: 'block'
              }} />
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'contents', md: 'block' }, flex: 1, minWidth: 0, position: 'relative', zIndex: 10 }}>
            <Box sx={{ order: { xs: 1, md: 2 }, width: '100%' }}>
              {renderProjectDetailsTop(project)}
            </Box>
            <Box sx={{ order: { xs: 3, md: 4 }, width: '100%' }}>
              {renderProjectDetailsBottom(project)}
            </Box>
          </Box>
        </Box>
      </Container>
    );
  };

  const renderBankChurnProject = (project: any) => {
    return (
      <Container key={project.id} maxWidth="lg" sx={{
        scrollSnapAlign: 'start',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        pb: 20
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch', gap: { xs: 4, md: 6 }, mt: { xs: 14, md: 22 }, width: '100%' }}>
          {/* Left panel: Horizontal scrollable screenshots gallery */}
          <Box sx={{ position: 'relative', flex: 1.1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              ref={galleryScrollRef}
              onScroll={handleGalleryScroll}
              sx={{
                width: '100%',
                height: { xs: '260px', md: '380px' },
                overflowX: 'scroll',
                scrollSnapType: 'x mandatory',
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                px: 2,
                py: 2,
                pb: 1.5,
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': { height: '6px' },
                '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'var(--copy-email-hover)',
                  borderRadius: '10px',
                  '&:hover': { bgcolor: 'var(--purple)' }
                },
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--copy-email-hover) transparent'
              }}
            >
              {project.images?.map((src: string, i: number) => (
                <Box
                  key={i}
                  onMouseEnter={() => i === 0 && setActiveHoverImage(src)}
                  onMouseLeave={() => i === 0 && setActiveHoverImage(null)}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    border: '2px solid rgba(167, 73, 214, 0.3)',
                    bgcolor: 'rgba(0,0,0,0.1)',
                    flexShrink: 0,
                    height: '100%',
                    scrollSnapAlign: 'center',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 1,
                    cursor: i === 0 ? 'zoom-in' : 'default',
                    '&:hover': {
                      transform: i === 0 ? 'scale(1.05)' : 'none',
                      zIndex: i === 0 ? 10 : 1,
                      boxShadow: i === 0 ? '0 12px 30px rgba(167, 73, 214, 0.3)' : '0 4px 20px rgba(0,0,0,0.15)',
                      borderColor: 'var(--purple)',
                    },
                    '&:hover img': {
                      transform: i === 0 ? 'scale(1.03)' : 'none',
                    }
                  }}
                >
                  <Image
                    src={src}
                    alt={`${project.name?.EN} screenshot ${i + 1}`}
                    width={600}
                    height={400}
                    priority={i === 0}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />

                  {/* Corner zoom button for all images */}
                  <Box
                    {...(i > 0 ? {
                      onMouseEnter: () => setActiveHoverImage(src),
                      onMouseLeave: () => setActiveHoverImage(null)
                    } : {})}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 20,
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      bgcolor: 'rgba(11, 19, 43, 0.75)',
                      backdropFilter: 'blur(4px)',
                      border: '1.5px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'zoom-in',
                      transition: 'all 0.2s ease',
                      pointerEvents: 'auto',
                      '&:hover': {
                        bgcolor: 'var(--purple)',
                        borderColor: 'var(--purple)',
                        transform: 'scale(1.1)',
                        boxShadow: '0 0 12px var(--purple)'
                      }
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Pagination Controls below the gallery (never overlaps content!) */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 0.5 }}>
              <Button
                onClick={() => {
                  if (galleryScrollRef.current) {
                    galleryScrollRef.current.scrollBy({ left: -galleryScrollRef.current.clientWidth, behavior: 'smooth' });
                  }
                }}
                sx={{
                  minWidth: 0,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  bgcolor: 'rgba(167, 73, 214, 0.1)',
                  color: 'var(--purple)',
                  border: '1.5px solid rgba(167, 73, 214, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    bgcolor: 'var(--purple)',
                    color: '#ffffff',
                    boxShadow: '0 0 10px rgba(167, 73, 214, 0.3)'
                  }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </Button>

              {/* Progress Dots */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {project.images?.map((_: any, idx: number) => {
                  const totalImages = project.images.length;
                  const activeIndex = Math.min(
                    Math.round(scrollProgress * (totalImages - 1)),
                    totalImages - 1
                  );
                  return (
                    <Box
                      key={idx}
                      onClick={() => {
                        if (galleryScrollRef.current) {
                          const targetLeft = idx * galleryScrollRef.current.clientWidth;
                          galleryScrollRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
                        }
                      }}
                      sx={{
                        width: activeIndex === idx ? '20px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        bgcolor: activeIndex === idx ? 'var(--purple)' : 'var(--copy-email-hover)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  );
                })}
              </Box>

              <Button
                onClick={() => {
                  if (galleryScrollRef.current) {
                    galleryScrollRef.current.scrollBy({ left: galleryScrollRef.current.clientWidth, behavior: 'smooth' });
                  }
                }}
                sx={{
                  minWidth: 0,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  bgcolor: 'rgba(167, 73, 214, 0.1)',
                  color: 'var(--purple)',
                  border: '1.5px solid rgba(167, 73, 214, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    bgcolor: 'var(--purple)',
                    color: '#ffffff',
                    boxShadow: '0 0 10px rgba(167, 73, 214, 0.3)'
                  }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Button>
            </Box>

            {/* Hover Zoom Overlay (Desktop only) */}
            {activeHoverImage && (
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  position: 'absolute',
                  top: { md: -60, lg: -100 },
                  bottom: { md: -60, lg: -100 },
                  left: { md: -20, lg: -40 },
                  right: { md: -120, lg: -200 },
                  bgcolor: '#ffffff',
                  borderRadius: '16px',
                  border: '2px solid var(--purple)',
                  overflow: 'hidden',
                  zIndex: 200,
                  boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  animation: 'fadeInScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  '@keyframes fadeInScale': {
                    '0%': { opacity: 0, transform: 'scale(0.95)' },
                    '100%': { opacity: 1, transform: 'scale(1)' }
                  }
                }}
              >
                <Image
                  src={activeHoverImage}
                  alt="Zoomed screenshot preview"
                  fill
                  style={{ objectFit: 'contain', padding: '8px' }}
                />
              </Box>
            )}
          </Box>

          {/* Right panel: Description and details */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, position: 'relative' }}>
            <Box>
              {/* Organization and Category badges */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                <Box sx={{
                  borderRadius: '50px',
                  px: 2,
                  py: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  bgcolor: 'rgba(96, 231, 241, 0.12)',
                  color: 'var(--text)',
                  border: '1.5px solid var(--blue)',
                  textTransform: 'uppercase'
                }}>
                  {language === 'UA' ? 'Аналітика даних' : language === 'FR' ? 'Analyse de données' : language === 'DE' ? 'Datenanalyse' : 'Data Analytics'}
                </Box>
                <Box sx={{
                  borderRadius: '50px',
                  px: 2,
                  py: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  bgcolor: 'rgba(167, 73, 214, 0.1)',
                  color: 'var(--purple)',
                  border: '1.5px solid var(--purple)',
                  textTransform: 'uppercase'
                }}>
                  NPower Canada
                </Box>
              </Box>

              <Typography variant='h4' sx={{ fontWeight: 800, color: 'var(--text)', lineHeight: 1.15 }}>
                <strong>{project.name?.[language] || project.name?.EN || ""}</strong>
              </Typography>

              <Typography variant='h5' sx={{ color: 'var(--purple)', fontWeight: 600, mt: 1, mb: 2, fontSize: '1.25rem', fontStyle: 'italic' }}>
                {project.tagline?.[language] || project.tagline?.EN || ""}
              </Typography>

              <Typography variant='body1' sx={{ mt: 1, mb: 3, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'var(--text)', opacity: 0.9, lineHeight: 1.6 }}>
                {project.description?.[language] || project.description?.EN || ""}
              </Typography>

              {/* Highlights */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                {(project.highlights?.[language] || project.highlights?.EN || []).map((highlight: string, i: number) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      bgcolor: 'var(--purple)',
                      mt: '8px',
                      flexShrink: 0,
                      boxShadow: '0 0 6px var(--purple)'
                    }} />
                    <Typography
                      variant='body2'
                      sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' }, color: 'var(--text)', lineHeight: 1.5 }}
                      dangerouslySetInnerHTML={{ __html: highlight }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Tech Tags & Buttons */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 3, borderTop: '1px solid var(--copy-email-hover)', pt: 2, mt: 2 }}>
              {/* Tech Tags */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.tags?.map((tag: string, i: number) => (
                  <Box key={i} sx={{
                    borderRadius: '4px',
                    px: 1.2,
                    py: 0.4,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    bgcolor: 'rgba(0,0,0,0.03)',
                    color: 'var(--text)',
                    border: '1px solid var(--copy-email-hover)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'var(--copy-email-hover)',
                    }
                  }}>
                    {tag}
                  </Box>
                ))}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' } }}>
                <Button
                  onClick={() => window.open(project.github_url, '_blank', 'noopener,noreferrer')}
                  sx={{
                    borderRadius: '8px',
                    px: 2,
                    py: 0.8,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    border: '1.5px solid var(--purple)',
                    color: 'var(--purple)',
                    bgcolor: 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    flex: { xs: 1, sm: 'initial' },
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'var(--copy-email-hover)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub
                </Button>

                <Button
                  onClick={() => window.open(project.notebook_url || project.github_url, '_blank', 'noopener,noreferrer')}
                  sx={{
                    borderRadius: '8px',
                    px: 2,
                    py: 0.8,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    bgcolor: 'var(--purple)',
                    color: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    flex: { xs: 1, sm: 'initial' },
                    boxShadow: '0 4px 12px rgba(167, 73, 214, 0.3)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'var(--btn-hover-bg)',
                      boxShadow: '0 6px 16px rgba(167, 73, 214, 0.4)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.9414 4.9757a7.033 7.033 0 0 0-4.9308 2.0646 7.033 7.033 0 0 0-.1232 9.8068l2.395-2.395a3.6455 3.6455 0 0 1 5.1497-5.1478l2.397-2.3989a7.033 7.033 0 0 0-4.8877-1.9297zM7.07 4.9855a7.033 7.033 0 0 0-4.8878 1.9316l2.3911 2.3911a3.6434 3.6434 0 0 1 5.0227.1271l1.7341-2.9737-.0997-.0802A7.033 7.033 0 0 0 7.07 4.9855zm15.0093 2.1721l-2.3892 2.3911a3.6455 3.6455 0 0 1-5.1497 5.1497l-2.4067 2.4068a7.0362 7.0362 0 0 0 9.9456-9.9476zM1.932 7.1674a7.033 7.033 0 0 0-.002 9.6816l2.397-2.397a3.6434 3.6434 0 0 1-.004-4.8916zm7.664 7.4235c-1.38 1.3816-3.5863 1.411-5.0168.1134l-2.397 2.395c2.4693 2.3328 6.263 2.5753 9.0072.5455l.1368-.1115z" />
                  </svg>
                  {language === 'UA' ? 'Переглянути блокнот' : language === 'FR' ? 'Voir le notebook' : language === 'DE' ? 'Notebook ansehen' : 'View Notebook'}
                </Button>
              </Box>
            </Box>

          </Box>
        </Box>
      </Container>
    );
  };

  return (
    <>
      <Box ref={containerRef} sx={{
        height: '100%',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        pb: 5
      }}>
        <Navbar />

        {/* Page Header (Title) */}
        <Container maxWidth="lg" sx={{ scrollSnapAlign: 'start' }}>
          {renderHeader()}
        </Container>

        {/* Sticky Filters Container */}
        <Box sx={{
          position: 'sticky',
          top: { xs: '50px', md: '90px' },
          zIndex: 99,
          background: 'var(--navbar-bg)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          py: { xs: 1.5, md: 2 },
          width: '100%',
          borderBottom: '1px solid var(--copy-email-hover)',
          transition: 'background-color 0.3s ease',
        }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', gap: { xs: 1, md: 2 }, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  sx={{
                    borderRadius: '50px',
                    px: { xs: 2.5, md: 4 },
                    py: { xs: 0.7, md: 1 },
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                    border: '2px solid var(--purple)',
                    bgcolor: activeCategory === cat.id ? 'var(--purple)' : 'transparent',
                    color: activeCategory === cat.id ? '#ffffff' : 'var(--text)',
                    boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(167, 73, 214, 0.4)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      bgcolor: activeCategory === cat.id ? 'var(--purple)' : 'rgba(167, 73, 214, 0.1)',
                      transform: 'translateY(-1px)',
                      boxShadow: activeCategory === cat.id ? '0 6px 20px rgba(167, 73, 214, 0.5)' : '0 4px 12px rgba(167, 73, 214, 0.15)',
                    }
                  }}
                >
                  {t(cat.translationKey)}
                </Button>
              ))}
            </Box>
          </Container>
        </Box>

        {filteredProjects.map((project) => {
          if (project.slug === 'bank-churn-analysis') {
            return renderBankChurnProject(project);
          } else if (project.slug === 'ping-it') {
            return renderLayout0(project);
          } else if (project.slug === 'lingoda') {
            return renderLayout1(project);
          } else {
            return renderLayout2(project);
          }
        })}
      </Box>
    </>
  );
}