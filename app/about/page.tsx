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

interface ToolbeltCardProps {
  title: string;
  children: React.ReactNode;
  gridColumn?: any;
}

function ToolbeltCard({ title, children, gridColumn }: ToolbeltCardProps) {
  return (
    <Box sx={{
      p: { xs: 2.5, md: 3 },
      width: '100%',
      bgcolor: 'var(--toolbelt-card-bg)',
      borderRadius: 4,
      border: '1px solid var(--toolbelt-card-border)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      gridColumn: gridColumn,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 30px rgba(99, 102, 241, 0.06)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        bgcolor: 'var(--toolbelt-card-hover-bg)'
      }
    }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.25rem' }}>
        {title}
      </Typography>
      <Box sx={{ width: '100%', height: '1px', bgcolor: 'var(--toolbelt-card-border)', my: 2, opacity: 0.6 }} />
      <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start' }}>
        {children}
      </Box>
    </Box>
  );
}

interface ToolbeltPillProps {
  label: string;
  color?: 'purple' | 'green';
}

function ToolbeltPill({ label, color = 'purple' }: ToolbeltPillProps) {
  const isGreen = color === 'green';
  return (
    <Typography sx={{
      px: 2,
      py: 0.6,
      borderRadius: '9999px',
      fontSize: { xs: '0.85rem', md: '0.9rem' },
      fontWeight: 500,
      border: isGreen ? '1.5px solid var(--pill-green-border)' : '1.5px solid var(--purple)',
      color: isGreen ? 'var(--pill-green-text)' : 'var(--purple)',
      bgcolor: isGreen ? 'var(--pill-green-bg)' : 'rgba(167, 73, 214, 0.03)',
      transition: 'all 0.2s ease',
      cursor: 'default',
      userSelect: 'none',
      '&:hover': {
        transform: 'scale(1.05)',
        bgcolor: isGreen ? 'var(--pill-green-hover-bg)' : 'rgba(167, 73, 214, 0.08)',
        boxShadow: isGreen ? '0 2px 10px rgba(16, 185, 129, 0.12)' : '0 2px 10px rgba(167, 73, 214, 0.12)'
      }
    }}>
      {label}
    </Typography>
  );
}

interface CertificatePillProps {
  label: string;
  tooltipTitle: string;
}

function CertificatePill({ label, tooltipTitle }: CertificatePillProps) {
  return (
    <Tooltip 
      enterTouchDelay={0} 
      leaveTouchDelay={60000} 
      title={<Box sx={{ p: 1, fontSize: '0.875rem' }} dangerouslySetInnerHTML={{ __html: tooltipTitle }} />} 
      arrow 
      placement="top" 
      componentsProps={{ 
        tooltip: { 
          sx: { 
            bgcolor: 'var(--purple)', 
            color: 'white', 
            maxWidth: 260,
            fontSize: '0.85rem',
            '& a': { color: '#60E7F1', textDecoration: 'underline' }
          } 
        } 
      }}
    >
      <Typography sx={{
        px: 2,
        py: 0.6,
        borderRadius: '9999px',
        fontSize: { xs: '0.85rem', md: '0.9rem' },
        fontWeight: 500,
        border: '1.5px solid var(--purple)',
        color: 'var(--purple)',
        bgcolor: 'rgba(167, 73, 214, 0.03)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
          transform: 'scale(1.05)',
          bgcolor: 'var(--purple)',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(167, 73, 214, 0.2)'
        }
      }}>
        {label}
      </Typography>
    </Tooltip>
  );
}

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
          justifyContent: 'flex-start',
          gap: 4,
          pt: { xs: 12, md: 18 },
          pb: { xs: 15, md: 20 }
        }}>
          <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant='h3' sx={{ fontWeight: 700, color: 'var(--text)' }}>
              <strong>{t('about_toolbelt')}</strong>
            </Typography>
            <Box sx={{ width: 60, height: 4, bgcolor: 'var(--blue)', mt: 1.5, borderRadius: 1 }} />
          </Box>

          {/* Grid Layout */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
            width: '100%'
          }}>
            {/* Languages */}
            <ToolbeltCard title={t('about_languages')}>
              <ToolbeltPill label="HTML" />
              <ToolbeltPill label="CSS" />
              <ToolbeltPill label="JavaScript" />
              <ToolbeltPill label="Ruby" />
              <ToolbeltPill label="Python" />
              <ToolbeltPill label="TypeScript" />
            </ToolbeltCard>

            {/* Frontend */}
            <ToolbeltCard title={t('about_frontend')}>
              <ToolbeltPill label="React" />
              <ToolbeltPill label="Next.js" />
              <ToolbeltPill label="Tailwind" />
              <ToolbeltPill label="Bootstrap" />
              <ToolbeltPill label="MUI" />
              <ToolbeltPill label="Responsive" />
            </ToolbeltCard>

            {/* Backend */}
            <ToolbeltCard title={t('about_backend')}>
              <ToolbeltPill label="Ruby on Rails" />
              <ToolbeltPill label="ActiveRecord" />
              <ToolbeltPill label="OOP" />
              <ToolbeltPill label="APIs" />
              <ToolbeltPill label="SQL" />
            </ToolbeltCard>

            {/* Data */}
            <ToolbeltCard title={t('about_data')}>
              <ToolbeltPill label="Pandas" />
              <ToolbeltPill label="NumPy" />
              <ToolbeltPill label="Matplotlib" />
              <ToolbeltPill label="Power BI" />
              <ToolbeltPill label="Tableau" />
              <ToolbeltPill label="PostgreSQL" />
              <ToolbeltPill label="Plotly" />
              <ToolbeltPill label="Dash" />
              <ToolbeltPill label="Scikit-learn" />
            </ToolbeltCard>

            {/* DevOps */}
            <ToolbeltCard title={t('about_devops')}>
              <ToolbeltPill label="Git" />
              <ToolbeltPill label="GitHub" />
            </ToolbeltCard>

            {/* Design */}
            <ToolbeltCard title={t('about_design')}>
              <ToolbeltPill label="Figma" />
              <ToolbeltPill label="UI/UX" />
            </ToolbeltCard>

            {/* Certificates & Education */}
            <ToolbeltCard 
              title={t('about_certificates')} 
              gridColumn={{ md: '1 / span 3', sm: '1 / span 2', xs: '1 / -1' }}
            >
              <CertificatePill label={t('cert_lewagon_chip')} tooltipTitle={t('cert_lewagon_tooltip')} />
              <CertificatePill label={t('cert_npower_chip')} tooltipTitle={t('cert_npower_tooltip')} />
              <CertificatePill label={t('cert_philo_chip')} tooltipTitle={t('cert_philo_tooltip')} />
              <CertificatePill label={t('cert_firstaid_chip')} tooltipTitle={t('cert_firstaid_tooltip')} />
            </ToolbeltCard>
          </Box>
        </Container>


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
          <Typography variant='h5' sx={{ mt: -3, fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.6, color: 'var(--text)' }} dangerouslySetInnerHTML={{ __html: t('about_create_description') }} />

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2.5,
            width: '100%',
            mt: 4,
            mb: 4
          }}>
            {/* Philosophy Card */}
            <Box sx={{
              p: { xs: 2.5, md: 3 },
              bgcolor: 'var(--toolbelt-card-bg)',
              borderRadius: 4,
              border: '1px solid var(--toolbelt-card-border)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 30px rgba(99, 102, 241, 0.06)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                bgcolor: 'var(--toolbelt-card-hover-bg)'
              }
            }}>
              <Typography sx={{ fontWeight: 700, color: 'var(--text)', mb: 1, fontSize: '1.1rem' }}>
                {t('about_card_philosophy_title')}
              </Typography>
              <Typography sx={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: 1.5 }}>
                {t('about_card_philosophy_desc')}
              </Typography>
            </Box>

            {/* Retail Card */}
            <Box sx={{
              p: { xs: 2.5, md: 3 },
              bgcolor: 'var(--toolbelt-card-bg)',
              borderRadius: 4,
              border: '1px solid var(--toolbelt-card-border)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 30px rgba(99, 102, 241, 0.06)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                bgcolor: 'var(--toolbelt-card-hover-bg)'
              }
            }}>
              <Typography sx={{ fontWeight: 700, color: 'var(--text)', mb: 1, fontSize: '1.1rem' }}>
                {t('about_card_retail_title')}
              </Typography>
              <Typography sx={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: 1.5 }}>
                {t('about_card_retail_desc')}
              </Typography>
            </Box>

            {/* Le Wagon Card */}
            <Box sx={{
              p: { xs: 2.5, md: 3 },
              bgcolor: 'var(--toolbelt-card-bg)',
              borderRadius: 4,
              border: '1px solid var(--toolbelt-card-border)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 30px rgba(99, 102, 241, 0.06)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                bgcolor: 'var(--toolbelt-card-hover-bg)'
              }
            }}>
              <Typography sx={{ fontWeight: 700, color: 'var(--text)', mb: 1, fontSize: '1.1rem' }}>
                {t('about_card_wagon_title')}
              </Typography>
              <Typography sx={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: 1.5 }}>
                {t('about_card_wagon_desc')}
              </Typography>
            </Box>

            {/* Starting Over Twice Card */}
            <Box sx={{
              p: { xs: 2.5, md: 3 },
              bgcolor: 'var(--toolbelt-card-bg)',
              borderRadius: 4,
              border: '1px solid var(--toolbelt-card-border)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 30px rgba(99, 102, 241, 0.06)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                bgcolor: 'var(--toolbelt-card-hover-bg)'
              }
            }}>
              <Typography sx={{ fontWeight: 700, color: 'var(--text)', mb: 1, fontSize: '1.1rem' }}>
                {t('about_card_starting_title')}
              </Typography>
              <Typography sx={{ color: 'var(--text)', opacity: 0.85, fontSize: '0.95rem', lineHeight: 1.5 }}>
                {t('about_card_starting_desc')}
              </Typography>
            </Box>
          </Box>

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