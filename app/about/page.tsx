"use client";
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import { supabaseClient } from '@/lib/supabaseClient';

const fallbackMilestones = [
  {
    id: "m1",
    period: "2020-2022",
    location: "KYIV",
    position: 1,
    title: {
      EN: "Worked as an <strong>analytics assistant in retail</strong>, sales data, Excel reports, pricing analysis across 50 key accounts. First real experience turning messy business data into decisions people acted on.",
      UA: "Працювала <strong>асистентом з аналітики в роздрібній торгівлі</strong>, дані про продажі, звіти в Excel, аналіз цін по 50 ключових клієнтах. Перший реальний досвід перетворення заплутаних бізнес-даних на рішення, на основі яких діяли люди.",
      FR: "Travail en tant qu'<strong>assistant analytique dans le commerce de détail</strong>, données de vente, rapports Excel, analyse des prix sur 50 comptes clés. Première véritable expérience de transformation de données commerciales confuses en décisions concrètes.",
      DE: "Arbeit als <strong>Analyseassistent im Einzelhandel</strong>, Umsatzdaten, Excel-Berichte, Preisanalysen für 50 Großkunden. Erste echte Erfahrung, unübersichtliche Geschäftsdaten in Entscheidungen zu verwandeln, nach denen gehandelt wurde."
    },
    subtext: {
      EN: null,
      UA: null,
      FR: null,
      DE: null
    }
  },
  {
    id: "m2",
    period: "2022-2023",
    location: "GERMANY",
    position: 2,
    title: {
      EN: "Left Ukraine after Russia's full-scale invasion. Arrived in Germany, learned German, stabilized and made a decision: if I'm starting over anyway, I'm building what I've always wanted to build. Enrolled in <strong>Le Wagon's Full Stack Bootcamp</strong>, built production apps in teams, graduated.",
      UA: "Покинула Україну після повномасштабного вторгнення Росії. Прибула до Німеччини, вивчила німецьку мову, стабілізувалася і прийняла рішення: якщо все одно починати спочатку, я будуватиму те, що завжди хотіла. Вступила до <strong>Le Wagon Full Stack буткемпу</strong>, створювала додатки в командах, випустилася.",
      FR: "A quitté l'Ukraine après l'invasion à grande échelle de la Russie. Arrivée en Allemagne, apprentissage de l'allemand, stabilisation et prise de décision : si je recommence à zéro, je vais construire ce que j'ai toujours voulu. Inscription au <strong>bootcamp Full Stack de Le Wagon</strong>, développement d'applications en équipe, diplômée.",
      DE: "Verließ die Ukraine nach der umfassenden Invasion Russlands. In Deutschland angekommen, Deutsch gelernt, stabilisiert und eine Entscheidung getroffen: Wenn ich schon neu anfange, baue ich das, was ich schon immer bauen wollte. Anmeldung zum <strong>Full Stack Bootcamp von Le Wagon</strong>, Erstellung von Produktions-Apps in Teams, Abschluss."
    },
    subtext: {
      EN: null,
      UA: null,
      FR: null,
      DE: null
    }
  },
  {
    id: "m3",
    period: "2024-NOW",
    location: "CANADA",
    position: 3,
    title: {
      EN: '<ul style="list-style-type: disc; padding-left: 1.2rem; margin: 0;"><li style="margin-bottom: 0.5rem;">Moved to Montreal, another new country, another system to figure out from scratch (learned French, decided to stay in Canada, kept moving).</li><li>Moved to Toronto, completed the <strong>NPower Canada Data Analytics Program</strong>.<br /><br />Currently working as a <strong>litigation assistant at a law firm</strong> (case data, legal documentation, file management), while actively building my tech portfolio and learning AI tools to sharpen my workflow.</li></ul>',
      UA: '<ul style="list-style-type: disc; padding-left: 1.2rem; margin: 0;"><li style="margin-bottom: 0.5rem;">Переїхала до Монреаля, ще одна нова країна, ще одна система, яку потрібно було зрозуміти з нуля (вчила французьку, вирішила залишитися в Канаді, рухалася далі).</li><li>Переїхала до Торонто, завершила <strong>програму з аналітики даних NPower Canada</strong>.<br /><br />Зараз працюю <strong>асистентом з судових процесів у юридичній фірмі</strong> (дані справ, юридична документація, керування файлами), одночасно активно розвиваючи технічне портфоліо та вивчаючи ШІ-інструменти для оптимізації роботи.</li></ul>',
      FR: '<ul style="list-style-type: disc; padding-left: 1.2rem; margin: 0;"><li style="margin-bottom: 0.5rem;">Installation à Montréal, un autre nouveau pays, un autre système à comprendre à partir de zéro (apprentissage du français, décidé de rester au Canada, continuer à avancer).</li><li>Installation à Toronto, programme d\'<strong>analyse de données de NPower Canada</strong> terminé.<br /><br />Travaille comme <strong>assistante juridique dans un cabinet d\'avocats</strong> (données de cas, documentation juridique, gestion de fichiers), tout en construisant mon portfolio et en apprenant des outils d\'IA.</li></ul>',
      DE: '<ul style="list-style-type: disc; padding-left: 1.2rem; margin: 0;"><li style="margin-bottom: 0.5rem;">Umzug nach Montreal, ein weiteres neues Land, ein weiteres System, das man von Grund auf verstehen musste (Französisch gelernt, beschlossen in Kanada zu bleiben, weitergegangen).</li><li>Umzug nach Toronto, Abschluss des <strong>Datenanalyseprogramms von NPower Canada</strong>.<br /><br />Derzeit tätig als <strong>Prozessführungsassistentin in einer Anwaltskanzlei</strong> (Falldaten, rechtliche Dokumentation, Dateiverwaltung), während ich mein Tech-Portfolio ausbaue und KI-Tools lerne.</li></ul>'
    },
    subtext: {
      EN: null,
      UA: null,
      FR: null,
      DE: null
    }
  }
];

export default function AboutPage() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useScrollNavigation('/projects', '/');
  const { t, language } = useLanguage();
  const [milestones, setMilestones] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('milestones')
          .select('*')
          .order('position', { ascending: true });
        if (!error && data && data.length > 0) {
          setMilestones(data);
        } else {
          setMilestones(fallbackMilestones);
        }
      } catch (e) {
        setMilestones(fallbackMilestones);
      }
    };
    fetchMilestones();
  }, []);

  const getDotColor = (input: string) => {
    const text = (input || '').toUpperCase();
    if (text.includes('KYIV')) return '#1ABCFE';
    if (text.includes('GERMANY')) return '#FFC107';
    if (text.includes('CANADA')) return '#0ACF83';
    return '#1ABCFE';
  };

  return (
    <>
      {/* Головний scroll container з snap */}
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
        {/* Секція "About me" - перша snap точка */}
        <Container maxWidth="lg" sx={{
          scrollSnapAlign: 'start',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 8, md: 12 },
          pb: { xs: 15, md: 20 }
        }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
            gap: { xs: 6, md: 10 },
            alignItems: 'flex-start'
          }}>
            {/* Left column: About me */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography variant='h3' sx={{ fontWeight: 700, color: 'var(--text)' }}>
                <strong>{t('about_about_me')}</strong>
              </Typography>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, position: 'relative', top: -20, lineHeight: 1 }}>
                <span style={{ color: 'var(--blue)' }}>____</span>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: -2 }}>
                <Typography variant='h5' sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.6, color: 'var(--text)' }} dangerouslySetInnerHTML={{ __html: t('about_bio_1') }} />
                <Typography variant='h5' sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.6, color: 'var(--text)' }} dangerouslySetInnerHTML={{ __html: t('about_bio_2') }} />
              </Box>
            </Box>

            {/* Right column: The journey */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: { xs: 0, md: 5 } }}>
              <Typography variant='h4' sx={{ fontWeight: 700, color: 'var(--blue)', fontSize: { xs: '1.5rem', md: '2rem' }, fontStyle: 'italic' }}>
                <strong>{t('about_journey_title')}</strong>
              </Typography>

              {/* Timeline Container */}
              <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', pl: 1, mt: 1 }}>
                {milestones.map((item, index) => {
                  const isLast = index === milestones.length - 1;
                  const itemTitle = item.title?.[language] || item.title?.EN || "";
                  const itemSubtext = item.subtext?.[language] || item.subtext?.EN || "";
                  const dotColor = getDotColor(item.location || item.period);

                  return (
                    <Box key={item.id} sx={{ display: 'flex', gap: 3, position: 'relative' }}>
                      {/* Left: Dot & Vertical line */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Dot */}
                        <Box sx={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          bgcolor: dotColor,
                          zIndex: 2,
                          boxShadow: `0 0 8px ${dotColor}`,
                          mt: '6px'
                        }} />
                        {/* Connecting Line */}
                        {!isLast && (
                          <Box sx={{
                            width: '2px',
                            flexGrow: 1,
                            bgcolor: 'var(--copy-email-hover)',
                            my: 0.5,
                            minHeight: '30px'
                          }} />
                        )}
                      </Box>

                      {/* Right: Content */}
                      <Box sx={{ pb: isLast ? 0 : 4, flex: 1 }}>
                        {/* Period & Location header */}
                        <Typography sx={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--purple)',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          mb: 0.5
                        }}>
                          {item.location ? `${item.location} · ${item.period}` : item.period}
                        </Typography>
                        {/* Title */}
                        <Typography variant="body1" sx={{
                          fontSize: { xs: '0.9rem', md: '0.98rem' },
                          lineHeight: 1.5,
                          color: 'var(--text)'
                        }} dangerouslySetInnerHTML={{ __html: itemTitle }} />
                        {/* Optional Subtext */}
                        {itemSubtext && (
                          <Typography variant="body2" sx={{
                            mt: 1,
                            fontSize: { xs: '0.85rem', md: '0.9rem' },
                            lineHeight: 1.5,
                            color: 'var(--text)',
                            opacity: 0.75,
                            fontStyle: 'italic'
                          }}>
                            {itemSubtext}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Секція TOOLBELT - друга snap точка */}
        <Container maxWidth="lg" sx={{
          scrollSnapAlign: 'start',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          pb: 20
        }}>
          <Typography variant='h3' sx={{ marginTop: { xs: 5, md: 10 } }}>
            <strong>{t('about_toolbelt')}</strong>
          </Typography>
          <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 600, position: 'relative', top: -50, lineHeight: 1 }}>
            <span style={{ color: 'var(--blue)' }}>____</span>
          </Typography>

          {/* ✅ Ряд 1: Бокси 1-2 */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3, mt: -2
          }}>
            {/* Languages */}
            <Box sx={{
              p: { xs: 2, md: 4 }, minHeight: 350, width: '100%', bgcolor: 'var(--toolbelt-cat-bg)', borderRadius: 3, border: '2px solid var(--blue)', mt: -5, mb: 6,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 3,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(236, 231, 243, 0.5)' }
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text)', mt: 1 }}>{t('about_languages')}</Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>HTML</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>CSS</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>JavaScript</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Ruby</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Python</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>TypeScript</Typography>
              </Box>
            </Box>

            {/* Languages */}
            <Box sx={{
              p: { xs: 2, md: 4 }, minHeight: 350, width: '100%', bgcolor: 'var(--toolbelt-cat-bg)', borderRadius: 3, border: '2px solid var(--blue)', mt: -5, mb: 6,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 3,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(236, 231, 243, 0.5)' }
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text)', mt: 1 }}>{t('about_frontend')}</Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>React</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Next.js</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Tailwind</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Bootstrap</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>MUI</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Responsive</Typography>
              </Box>
            </Box>
            {/* Languages */}
            <Box sx={{
              p: { xs: 2, md: 4 }, minHeight: 350, width: '100%', bgcolor: 'var(--toolbelt-cat-bg)', borderRadius: 3, border: '2px solid var(--blue)', mt: -5, mb: 6,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 3,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(236, 231, 243, 0.5)' }
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text)', mt: 1 }}>{t('about_backend')}</Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Ruby on Rails</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>ActiveRecord</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>OOP</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>APIs</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>SQL</Typography>
              </Box>
            </Box>
            {/* Languages */}
            <Box sx={{
              p: { xs: 2, md: 4 }, minHeight: 350, width: '100%', bgcolor: 'var(--toolbelt-cat-bg)', borderRadius: 3, border: '2px solid var(--blue)', mt: -5, mb: 6,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 3,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(236, 231, 243, 0.5)' }
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text)', mt: 1 }}>{t('about_devops')}</Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Git</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>GitHub</Typography>
              </Box>
            </Box>
            {/* Languages */}
            <Box sx={{
              p: { xs: 2, md: 4 }, minHeight: 350, width: '100%', bgcolor: 'var(--toolbelt-cat-bg)', borderRadius: 3, border: '2px solid var(--blue)', mt: -5, mb: 6,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 3,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(236, 231, 243, 0.5)' }
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text)', mt: 1 }}>{t('about_data')}</Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Pandas</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Power BI</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Tableau</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>Matplotlib</Typography>
                <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)' }}>PostgreSQL</Typography>
              </Box>
            </Box>
            {/* Languages */}
            <Box sx={{
              p: { xs: 2, md: 4 }, minHeight: 350, width: '100%', bgcolor: 'var(--toolbelt-cat-bg)', borderRadius: 3, border: '2px solid var(--blue)', mt: -5, mb: 6,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 3,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(236, 231, 243, 0.5)' }
            }}>
              {/* Certificates */}
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--text)', mt: 1 }}>{t('about_certificates')}</Typography>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* BA Philosophy */}
                <Tooltip enterTouchDelay={0} leaveTouchDelay={60000} title={<Box sx={{ p: 1, fontSize: '0.875rem' }} dangerouslySetInnerHTML={{ __html: t('cert_philo_tooltip') }} />} arrow placement="top" componentsProps={{ tooltip: { sx: { bgcolor: 'var(--purple)', color: 'white', maxWidth: 250 } } }}>
                  <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.1rem' }, border: '2px solid var(--purple)', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.1)', bgcolor: 'var(--purple)', cursor: 'pointer' } }}>{t('cert_philo_chip')}</Typography>
                </Tooltip>
                <Tooltip enterTouchDelay={0} leaveTouchDelay={60000} title={<Box sx={{ p: 1, fontSize: '0.875rem' }} dangerouslySetInnerHTML={{ __html: t('cert_npower_tooltip') }} />} arrow placement="top" componentsProps={{ tooltip: { sx: { bgcolor: 'var(--purple)', color: 'white', maxWidth: 250 } } }}>
                  <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.1)', bgcolor: 'var(--purple)', cursor: 'pointer' } }}>{t('cert_npower_chip')}</Typography>
                </Tooltip>
                <Tooltip enterTouchDelay={0} leaveTouchDelay={60000} title={<Box sx={{ p: 1, fontSize: '0.875rem' }} dangerouslySetInnerHTML={{ __html: t('cert_lewagon_tooltip') }} />} arrow placement="top" componentsProps={{ tooltip: { sx: { bgcolor: 'var(--purple)', color: 'white', maxWidth: 250 } } }}>
                  <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.1)', bgcolor: 'var(--purple)', cursor: 'pointer' } }}>{t('cert_lewagon_chip')}</Typography>
                </Tooltip>
                <Tooltip enterTouchDelay={0} leaveTouchDelay={60000} title={<Box sx={{ p: 1, fontSize: '0.875rem' }} dangerouslySetInnerHTML={{ __html: t('cert_firstaid_tooltip') }} />} arrow placement="top" componentsProps={{ tooltip: { sx: { bgcolor: 'var(--purple)', color: 'white', maxWidth: 250 } } }}>
                  <Typography sx={{ bgcolor: 'var(--toolbelt-item-bg)', px: 1.5, py: 0.5, borderRadius: 2, fontSize: { xs: '1rem', md: '1.2rem' }, border: '2px solid var(--purple)', transition: 'all 0.2s ease', '&:hover': { transform: 'scale(1.1)', bgcolor: 'var(--purple)', cursor: 'pointer' } }}>{t('cert_firstaid_chip')}</Typography>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Container >


        <Container sx={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          <Typography variant='h3' sx={{ mt: -6, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            <strong>{t('about_create_meaningful')}</strong><span style={{ color: 'var(--blue)' }}>.</span>
          </Typography>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, position: 'relative', top: -16, lineHeight: 1 }}><span style={{ color: 'var(--blue)' }}>____</span></Typography>
          <Typography variant='h5' sx={{ mt: -3, fontSize: { xs: '1rem', md: '1.5rem' } }} dangerouslySetInnerHTML={{ __html: t('about_create_description') }} />
          <Button
            onClick={() => {
              window.location.href = 'mailto:annaboiko1@icloud.com?subject=Let%27s%20work%20together&body=Hi%20Anna,%0A%0AI%20am%20interested%20in%20working%20together.%0A%0ABest%20regards';
            }}
            sx={{
              mt: 2,
              px: 6,
              py: 1,
              mb: 15,
              fontSize: '1.3rem',
              fontWeight: 550,
              width: 300,
              color: 'var(--btn-text)',
              bgcolor: 'transparent',
              textTransform: 'none',
              display: 'inline-flex',
              textShadow: `
                1px 1px 1px rgba(0,0,0,0.3),        
                0 0 3px rgba(255,255,255,0.4)
                `,


              backgroundImage: `linear-gradient(
                45deg, 
                transparent 25%, 
                var(--btn-stripes) 25%, 
                var(--btn-stripes) 50%, 
                transparent 50%, 
                transparent 75%, 
                var(--btn-stripes) 75%
              )`,

              backgroundSize: '15px 15px',



              position: 'relative',
              backgroundOrigin: 'padding-box',

              borderRadius: 3, // Adjusted roundness

              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 3, // Match parent border-radius
                padding: '3px',
                background: 'linear-gradient(45deg, #9333ea, #8e24aa)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
              },

              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px var(--red)',
                bgcolor: 'var(--btn-hover-bg)',
              }
            }}
          >
            {t('about_get_in_touch')}
          </Button>
        </Container>
      </Box >





    </>
  );
}