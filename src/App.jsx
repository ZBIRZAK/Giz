import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import gizLogo from './assets/giz-logo.svg';
import logoGiz from './assets/images/logos/giz.svg';
import logoWe4She from './assets/images/logos/we4she.svg';
import logoEu from './assets/images/logos/EU.svg';
import logoEldz from './assets/images/logos/ELdZ_Maro_cmyk_arab.svg';
import iconDiagnostic from './assets/icones/diagnostic.svg';
import iconTech from './assets/icones/tech.svg';
import iconPosition from './assets/icones/position.svg';

const eligibleSectors = [
  'Industrie',
  'Numérique / IT',
  'Énergies renouvelables',
  'Économie verte',
  'Agro-industrie innovante',
];

const fundedActions = [
  'Recrutement ciblé de femmes',
  "Aménagement d'une crèche d'entreprise",
  'Programmes de leadership féminin',
  'Formations techniques ou certifiantes',
];

const formSectorOptions = [
  'Industrie',
  'Numérique / IT',
  'Énergies renouvelables',
  'Économie verte',
  'Agro-industrie',
  'Autre',
];

const formEmployeeOptions = ['20-50', '50-200', '200+'];

const formDirectionOptions = [
  'Oui, avec sponsor identifié',
  'Oui, sans sponsor identifié',
  'En réflexion',
];

const formPriorityOptions = [
  'Recrutement de femmes',
  'Rétention',
  'Leadership féminin',
  'Conditions de travail',
  'Formation',
  'Infrastructures (ex : crèche)',
  'Autre',
];

const formCoFundingOptions = ['Oui', 'Non', 'À discuter'];

const faqItems = [
  {
    q: 'Est-ce que ce programme est vraiment utile ?',
    a: 'Il est conçu pour générer un impact concret et mesurable.',
  },
  {
    q: 'Qui peut candidater ?',
    a: "Toute entreprise formelle opérant au Maroc dans un secteur d’avenir ou stratégique (industrie, numérique, énergie, etc.) avec au moins 20 employés enregistré à la CNSS.",
  },
  {
    q: 'Une PME peut-elle candidater ?',
    a: "Oui ! Tant qu’elle a une capacité minimale d’organisation et d’engagement.",
  },
  {
    q: 'Les entreprises publiques peuvent-elles candidater ?',
    a: "Oui, sous réserve de remplir les critères d'éligibilité et d'engagement.",
  },
  {
    q: 'Est-ce que les startups sont éligibles ?',
    a: 'Oui, si elles ont une structuration RH minimale (>= 20 employés).',
  },
  {
    q: 'Combien d’entreprises seront sélectionnées ?',
    a: '10 entreprises.',
  },
  {
    q: 'Quels sont les critères les plus importants ?',
    a: "Engagement réel de la direction, potentiel d'impact sur l'emploi féminin et capacité à mettre en œuvre des actions concrètes.",
  },
  {
    q: 'Le financement d’un appui technique est-il garanti pour les entreprises sélectionnées ?',
    a: "Oui. C’est un appui technique qui va jusqu’à 250 000 MAD par entreprise, avec deux conditions : réalisation d’un diagnostic et validation du plan d’action par la direction.",
  },
  {
    q: 'Quel est le montant du financement ?',
    a: "Jusqu'à 250 000 MAD d'appui technique par entreprise.",
  },
  {
    q: 'Peut-on financer plusieurs actions ?',
    a: 'Oui, dans la limite du budget alloué.',
  },
  {
    q: 'Le co-financement est-il obligatoire ?',
    a: 'Non, mais fortement recommandé. Les entreprises qui co-financent sont généralement prioritaires.',
  },
  {
    q: 'Quelles dépenses sont éligibles ?',
    a: 'Formation, adaptation des postes, dispositifs RH, conditions de travail, mobilité, sécurité et services de garde.',
  },
  {
    q: 'Devons-nous mobiliser une équipe interne ?',
    a: 'Oui: un point focal et un sponsor au niveau de la direction.',
  },
  {
    q: 'Est-ce que l’accompagnement est personnalisé ?',
    a: "Oui, chaque entreprise bénéficie d'un diagnostic et d'un plan d'action sur mesure.",
  },
  {
    q: 'Les données sont-elles confidentielles ?',
    a: 'Oui, elles sont utilisées uniquement dans le cadre du programme et anonymisées pour la capitalisation.',
  },
  {
    q: 'Peut-on modifier sa candidature après soumission ?',
    a: "Non, sauf demande spécifique à l'équipe programme.",
  },
  {
    q: 'Peut-on candidater en consortium ?',
    a: 'Oui.',
  },
  {
    q: 'Pourquoi devrions-nous candidater ?',
    a: "Parce que vous accédez au financement d’un appui technique, vous améliorez votre performance et vous vous alignez avec les standards futurs.",
  },
];

const initialFormState = {
  companyName: '',
  sector: '',
  sectorOther: '',
  employees: '',
  city: '',
  focalName: '',
  focalRole: '',
  professionalEmail: '',
  directionCommitment: '',
  womenEmploymentChallenges: '',
  joinReason: '',
  priorityActions: [],
  priorityActionsOther: '',
  existingProject: '',
  coFundingOpen: '',
  finalCommitment: false,
};

function trackEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;
  const detail = { event: eventName, ...payload, ts: Date.now() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent('ami:analytics', { detail }));
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <img className="brand-logo" src={gizLogo} alt="GIZ" />
        <p className="brand-name">AMI INEFF x We4She</p>
        {/* <Link className="header-link" to="/#contact">Contact</Link> */}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Égalité genre & performance RH</p>
          <h1>Programme d’accompagnement financé</h1>
          <p className="hero-sub-amount">
            jusqu’à <strong className='nomber'>250 000 MAD</strong> par entreprise
          </p>
          <p className="lead">Pour entreprises des secteurs du futur au Maroc.</p>
          <ul className="check-list">
            <li>Diagnostic stratégique</li>
            <li>Plan d’action opérationnel</li>
            <li>Appui technique financé</li>
          </ul>
          <p className="deadline">Candidatures ouvertes jusqu’au <strong>30 mai 2026</strong>.</p>
          <Link className="btn btn-primary" to="/candidature" onClick={() => trackEvent('cta_click', { source: 'hero' })}>
            Postuler maintenant
          </Link>
        </div>
        <div className="hero-visual">
          <figure className="hero-media">
            <img
              src="https://images.pexels.com/photos/6476566/pexels-photo-6476566.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Femme professionnelle travaillant dans un environnement technologique"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

function WhyProgram() {
  const [animatedCompanies, setAnimatedCompanies] = useState(0);

  useEffect(() => {
    const target = 10;
    const durationMs = 1200;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const value = Math.round(progress * target);
      setAnimatedCompanies(value);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="section section-alt why-program">
      <div className="container two-col">
        <div className="why-copy">
          <h2>Pourquoi ce programme ?</h2>
          <p>
            Ce programme porté par le projet INEFF « Inclusion économique des femmes dans les secteurs du futur »
            et le réseau We4She avec d’autres partenaires nationaux lance le présent Appel à Manifestation
            d’Intérêt pour accompagner 10 entreprises des secteurs du futur dans la promotion de l’égalité genre.
          </p>
          <div className="program-stat" aria-label="10 entreprises et INEFF">
            <div className="program-stat-main">
              <span className="program-stat-number" aria-live="polite">{animatedCompanies}</span>
              <span className="program-stat-label">entreprises</span>
            </div>
            <div className="program-stat-side">INEFF</div>
          </div>
        </div>
        <figure className="section-media">
          <img
            src="https://images.pexels.com/photos/21405533/pexels-photo-21405533.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Professionnelle en environnement de travail numérique"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section">
      <div className="container">
        <h2>Pourquoi c’est intéressant pour votre entreprise</h2>
        <div className="cards-3">
          <article className="card">
            <img className="benefit-icon" src={iconDiagnostic} alt="" aria-hidden="true" />
            <h3>Accédez à un diagnostic stratégique</h3>
            <p>Comprenez précisément vos freins en matière de recrutement, rétention et promotion des femmes.</p>
          </article>
          <article className="card">
            <img className="benefit-icon" src={iconTech} alt="" aria-hidden="true" />
            <h3>Bénéficiez d’un appui technique direct</h3>
            <p>Jusqu’à 250 000 MAD d’appui technique pour mettre en œuvre des actions concrètes visant la promotion de l’égalité genre.</p>
          </article>
          <article className="card">
            <img className="benefit-icon" src={iconPosition} alt="" aria-hidden="true" />
            <h3>Renforcez votre positionnement ESG</h3>
            <p>Accès à de l’expertise et intégration d’un réseau international.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Eligibility() {
  return (
    <section className="section eligibility-section">
      <div className="container eligibility-showcase">
        <article className="eligibility-left">
          <h2>À qui s’adresse le programme ?</h2>
          <h3>Entreprises éligibles</h3>
          <p className="eligibility-link-wrap">
            Entreprises opérant dans les secteurs d’avenir ou stratégiques (
            <a href="https://amdie.gov.ma/guide-de-la-charte-dinvestissement/" target="_blank" rel="noreferrer">
              liste des secteurs - Click
            </a>
            ), notamment :
          </p>
          <ul className="eligibility-list">
            {eligibleSectors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="eligibility-right">
          <h3>Conditions principales</h3>
          <ul className="conditions-list">
            <li>Minimum 20 employés</li>
            <li>Engagement de la direction</li>
            <li>Désignation d’un référent interne</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function ActionsAndPractical() {
  return (
    <section className="section">
      <div className="container split-grid">
        <article className="panel">
          <h2>Exemples d’actions financées</h2>
          <ul className="plain-list">
            {fundedActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Informations pratiques</h2>
          <h3>Calendrier</h3>
          <p>Lancement: 08 avril 2026</p>
          <p>Clôture: 30 mai 2026</p>
          <h3>Format du programme</h3>
          <p>Accompagnement personnalisé</p>
          <p>Durée : environ 12 mois</p>
          <p>Interaction régulière avec experts</p>
          <h3>Ce que vous devez soumettre</h3>
          <Link className="btn btn-primary" to="/candidature" onClick={() => trackEvent('cta_click', { source: 'infos_pratiques' })}>
            Formulaire de candidature
          </Link>
        </article>
      </div>
    </section>
  );
}

function FaqCta() {
  return (
    <section className="section section-alt">
      <div className="container faq-cta">
        <h2>Questions fréquentes (FAQ)</h2>
        <p>Retrouvez toutes les réponses détaillées sur une page dédiée.</p>
        <Link className="btn btn-primary" to="/faq" onClick={() => trackEvent('cta_click', { source: 'faq_preview' })}>
          Consulter la FAQ complète
        </Link>
      </div>
    </section>
  );
}

function Contact() {
  const handleContact = () => {
    window.location.href =
      'mailto:Mohamed-amine.faiz@giz.de,afaf.aderdoun@giz.de?subject=Question%20sur%20l%27AMI%20INEFF';
  };

  return (
    <section className="section" id="contact">
      <div className="container contact-box">
        <h2>Besoin d’en parler ?</h2>
        <p>Une question ? Un doute sur votre éligibilité ?</p>
        <button className="btn btn-primary" type="button" onClick={handleContact}>
          Contacter l’équipe programme
        </button>
        <div className="partner-logos" aria-label="Partenaires">
          <div className="logo-placeholder">
            <img src={logoGiz} alt="GIZ" loading="lazy" decoding="async" />
          </div>
          <div className="logo-placeholder">
            <img src={logoWe4She} alt="We4She" loading="lazy" decoding="async" />
          </div>
          <div className="logo-placeholder">
            <img src={logoEu} alt="Union européenne" loading="lazy" decoding="async" />
          </div>
          <div className="logo-placeholder">
            <img src={logoEldz} alt="ELdZ Maroc" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileStickyCta() {
  useEffect(() => {
    document.body.classList.add('has-sticky-cta');
    return () => document.body.classList.remove('has-sticky-cta');
  }, []);

  return (
    <div className="mobile-sticky-cta">
      <Link className="btn btn-primary" to="/candidature" onClick={() => trackEvent('cta_click', { source: 'mobile_sticky' })}>
        Postuler maintenant
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <h3>À propos</h3>
        <p>
          Le projet INEFF « Inclusion économique des femmes dans les secteurs du futur » est mis en œuvre par
          la Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), en partenariat avec le Ministère de
          l’Inclusion Économique, de la Petite Entreprise, de l’Emploi et des Compétences, et financé par le
          Ministère fédéral allemand de la Coopération économique et du Développement (BMZ) et l’Union
          européenne.
        </p>
        <p className="copyright">
          © 2026 GIZ - Tous droits réservés. Developed by{' '}
          <a href="https://box-com.com/" target="_blank" rel="noreferrer">
            Box-com.com
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

function FormField({ label, required = false, error, children, hint, htmlFor }) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={htmlFor}>
        {label}
        {required ? ' *' : ''}
      </label>
      {hint ? <p className="field-hint">{hint}</p> : null}
      {children}
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}

function CandidaturePage() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const progressPercent = Math.round((Math.max(step - 1, 0) / 5) * 100);

  useEffect(() => {
    trackEvent('form_step_view', { step });
  }, [step]);

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const togglePriorityAction = (action) => {
    setFormData((prev) => {
      const exists = prev.priorityActions.includes(action);
      const nextActions = exists
        ? prev.priorityActions.filter((item) => item !== action)
        : [...prev.priorityActions, action];

      return {
        ...prev,
        priorityActions: nextActions,
        priorityActionsOther: nextActions.includes('Autre') ? prev.priorityActionsOther : '',
      };
    });
    setErrors((prev) => ({ ...prev, priorityActions: '', priorityActionsOther: '' }));
  };

  const validateStep = () => {
    const nextErrors = {};

    if (step === 1) {
      if (!formData.companyName.trim()) nextErrors.companyName = 'Ce champ est obligatoire.';
      if (!formData.sector) nextErrors.sector = 'Choisissez une option.';
      if (formData.sector === 'Autre' && !formData.sectorOther.trim()) {
        nextErrors.sectorOther = 'Précisez votre secteur.';
      }
      if (!formData.employees) nextErrors.employees = 'Choisissez une option.';
      if (!formData.city.trim()) nextErrors.city = 'Ce champ est obligatoire.';
    }

    if (step === 2) {
      if (!formData.focalName.trim()) nextErrors.focalName = 'Ce champ est obligatoire.';
      if (!formData.focalRole.trim()) nextErrors.focalRole = 'Ce champ est obligatoire.';
      if (!formData.professionalEmail.trim()) {
        nextErrors.professionalEmail = 'Ce champ est obligatoire.';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.professionalEmail)) {
        nextErrors.professionalEmail = 'Adresse email invalide.';
      }
      if (!formData.directionCommitment) nextErrors.directionCommitment = 'Choisissez une option.';
    }

    if (step === 3) {
      if (!formData.womenEmploymentChallenges.trim()) {
        nextErrors.womenEmploymentChallenges = 'Ce champ est obligatoire.';
      }
      if (!formData.joinReason.trim()) nextErrors.joinReason = 'Ce champ est obligatoire.';
      if (formData.womenEmploymentChallenges.length > 300) {
        nextErrors.womenEmploymentChallenges = '300 caractères maximum.';
      }
      if (formData.joinReason.length > 300) {
        nextErrors.joinReason = '300 caractères maximum.';
      }
      if (formData.priorityActions.length === 0) {
        nextErrors.priorityActions = 'Sélectionnez au moins une action.';
      }
      if (formData.priorityActions.includes('Autre') && !formData.priorityActionsOther.trim()) {
        nextErrors.priorityActionsOther = 'Précisez l’action prioritaire.';
      }
    }

    if (step === 4) {
      if (!formData.coFundingOpen) nextErrors.coFundingOpen = 'Choisissez une option.';
    }

    if (step === 5) {
      if (!formData.finalCommitment) {
        nextErrors.finalCommitment = 'La confirmation est obligatoire pour continuer.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitApplication = async () => {
    const response = await fetch('/api/candidature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      let backendMessage = '';
      try {
        const payload = await response.json();
        backendMessage = payload?.message || '';
      } catch (_error) {
        backendMessage = '';
      }
      throw new Error(backendMessage || "L'envoi de la candidature a échoué. Merci de réessayer.");
    }
  };

  const handleNext = async () => {
    if (step === 0) {
      trackEvent('form_step_complete', { step: 0 });
      setStep(1);
      return;
    }

    if (step === 6) return;

    if (!validateStep()) return;

    if (step === 5) {
      try {
        setIsSubmitting(true);
        setSubmitError('');
        await submitApplication();
        trackEvent('form_submit_success');
        setStep(6);
      } catch (error) {
        trackEvent('form_submit_error', { message: error?.message || 'unknown_error' });
        setSubmitError(error?.message || "L'envoi de la candidature a échoué. Merci de réessayer.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    trackEvent('form_step_complete', { step });
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step <= 0) return;
    setStep((prev) => prev - 1);
  };

  return (
    <>
      <Header />
      <main className="section candidature-page" aria-busy={isSubmitting}>
        <div className="container form-shell">
          <div className="form-title-wrap">
            <h1>Formulaire de candidature</h1>
          </div>

          {step > 0 && step < 6 ? (
            <div className="form-progress" aria-hidden="true">
              <div className="form-progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>
          ) : null}

          <section className="form-panel">
            {step === 0 ? (
              <div>
                <p className="step-tag">Écran d’introduction</p>
                <p>
                  Dans le cadre du projet INEFF « Inclusion économique des femmes dans les secteurs du futur » en
                  partenariat avec le réseau We4She, le présent AMI vise à accompagner 10 entreprises marocaines
                  dans la promotion de l’égalité genre avec un appui technique pouvant aller jusqu’à 250 000 MAD.
                </p>
                <p><strong>Temps estimé :</strong> 3 à 5 minutes</p>
                <p>Cliquez sur « Commencer » pour candidater.</p>
              </div>
            ) : null}

            {step === 1 ? (
              <div>
                <p className="step-tag">Section 1 - Informations sur votre entreprise</p>
                <FormField label="Nom de l’entreprise" required error={errors.companyName} htmlFor="companyName">
                  <input
                    id="companyName"
                    className="text-input"
                    type="text"
                    autoComplete="organization"
                    value={formData.companyName}
                    onChange={(e) => setField('companyName', e.target.value)}
                  />
                </FormField>

                <FormField label="Secteur d’activité" required error={errors.sector || errors.sectorOther}>
                  <div className="option-group">
                    {formSectorOptions.map((option) => (
                      <label key={option} className="option-row">
                        <input
                          type="radio"
                          name="sector"
                          checked={formData.sector === option}
                          onChange={() => setField('sector', option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {formData.sector === 'Autre' ? (
                    <input
                      className="text-input"
                      type="text"
                      placeholder="Précisez votre secteur"
                      value={formData.sectorOther}
                      onChange={(e) => setField('sectorOther', e.target.value)}
                    />
                  ) : null}
                </FormField>

                <FormField label="Nombre d’employés" required error={errors.employees}>
                  <div className="option-group">
                    {formEmployeeOptions.map((option) => (
                      <label key={option} className="option-row">
                        <input
                          type="radio"
                          name="employees"
                          checked={formData.employees === option}
                          onChange={() => setField('employees', option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </FormField>

                <FormField label="Ville principale d’activité" required error={errors.city} htmlFor="city">
                  <input
                    id="city"
                    className="text-input"
                    type="text"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={(e) => setField('city', e.target.value)}
                  />
                </FormField>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <p className="step-tag">Section 2 - Contact et gouvernance</p>
                <FormField label="Nom du point focal" required error={errors.focalName} htmlFor="focalName">
                  <input
                    id="focalName"
                    className="text-input"
                    type="text"
                    autoComplete="name"
                    value={formData.focalName}
                    onChange={(e) => setField('focalName', e.target.value)}
                  />
                </FormField>

                <FormField label="Fonction du point focal" required error={errors.focalRole} htmlFor="focalRole">
                  <input
                    id="focalRole"
                    className="text-input"
                    type="text"
                    autoComplete="organization-title"
                    value={formData.focalRole}
                    onChange={(e) => setField('focalRole', e.target.value)}
                  />
                </FormField>

                <FormField label="Email professionnel" required error={errors.professionalEmail} htmlFor="professionalEmail">
                  <input
                    id="professionalEmail"
                    className="text-input"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={formData.professionalEmail}
                    onChange={(e) => setField('professionalEmail', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="Niveau d’engagement de la direction"
                  required
                  error={errors.directionCommitment}
                >
                  <div className="option-group">
                    {formDirectionOptions.map((option) => (
                      <label key={option} className="option-row">
                        <input
                          type="radio"
                          name="direction"
                          checked={formData.directionCommitment === option}
                          onChange={() => setField('directionCommitment', option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </FormField>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <p className="step-tag">Section 3 - Diagnostic rapide</p>
                <FormField
                  label="Principaux défis concernant l’emploi des femmes"
                  required
                  hint={`${formData.womenEmploymentChallenges.length}/300 caractères`}
                  error={errors.womenEmploymentChallenges}
                  htmlFor="womenEmploymentChallenges"
                >
                  <textarea
                    id="womenEmploymentChallenges"
                    className="text-area"
                    maxLength={300}
                    value={formData.womenEmploymentChallenges}
                    onChange={(e) => setField('womenEmploymentChallenges', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="Pourquoi souhaitez-vous rejoindre ce programme ?"
                  required
                  hint={`${formData.joinReason.length}/300 caractères`}
                  error={errors.joinReason}
                  htmlFor="joinReason"
                >
                  <textarea
                    id="joinReason"
                    className="text-area"
                    maxLength={300}
                    value={formData.joinReason}
                    onChange={(e) => setField('joinReason', e.target.value)}
                  />
                </FormField>

                <FormField
                  label="Quelles actions souhaitez-vous prioriser ?"
                  required
                  error={errors.priorityActions || errors.priorityActionsOther}
                >
                  <div className="option-group">
                    {formPriorityOptions.map((option) => (
                      <label key={option} className="option-row">
                        <input
                          type="checkbox"
                          checked={formData.priorityActions.includes(option)}
                          onChange={() => togglePriorityAction(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {formData.priorityActions.includes('Autre') ? (
                    <input
                      className="text-input"
                      type="text"
                      placeholder="Précisez l’action"
                      value={formData.priorityActionsOther}
                      onChange={(e) => setField('priorityActionsOther', e.target.value)}
                    />
                  ) : null}
                </FormField>

                <FormField label="Avez-vous déjà un projet identifié ? (optionnel)" htmlFor="existingProject">
                  <textarea
                    id="existingProject"
                    className="text-area text-area-short"
                    value={formData.existingProject}
                    onChange={(e) => setField('existingProject', e.target.value)}
                  />
                </FormField>
              </div>
            ) : null}

            {step === 4 ? (
              <div>
                <p className="step-tag">Section 4 - Capacité et engagement</p>
                <FormField
                  label="Êtes-vous ouvert à co-financer certaines actions ?"
                  required
                  error={errors.coFundingOpen}
                >
                  <div className="option-group">
                    {formCoFundingOptions.map((option) => (
                      <label key={option} className="option-row">
                        <input
                          type="radio"
                          name="coFunding"
                          checked={formData.coFundingOpen === option}
                          onChange={() => setField('coFundingOpen', option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </FormField>
              </div>
            ) : null}

            {step === 5 ? (
              <div>
                <p className="step-tag">Section 5 - Engagement final</p>
                <FormField label="Confirmation d’engagement" required error={errors.finalCommitment}>
                  <label className="option-row">
                    <input
                      type="checkbox"
                      checked={formData.finalCommitment}
                      onChange={(e) => setField('finalCommitment', e.target.checked)}
                    />
                    <span>Nous confirmons notre engagement à participer activement au programme.</span>
                  </label>
                </FormField>
              </div>
            ) : null}

            {step === 6 ? (
              <div role="status" aria-live="polite">
                <p className="step-tag">Candidature envoyée</p>
                <h2>Merci pour votre candidature.</h2>
                <p>Les entreprises sélectionnées seront contactées après analyse des dossiers.</p>
                <Link className="btn btn-primary" to="/">Terminer</Link>
              </div>
            ) : null}
          </section>

          {step < 6 ? (
            <div className="form-actions">
              {step > 0 ? (
                <button className="btn btn-outline" type="button" onClick={handleBack} disabled={isSubmitting}>
                  Retour
                </button>
              ) : <span />}
              <button className="btn btn-primary" type="button" onClick={handleNext} disabled={isSubmitting}>
                {step === 0 ? 'Commencer' : step === 5 ? (isSubmitting ? 'Envoi en cours...' : 'Envoyer') : 'Continuer'}
              </button>
            </div>
          ) : null}
          {submitError ? <p className="field-error" role="alert" aria-live="assertive">{submitError}</p> : null}
          <p className="sr-only" aria-live="polite">
            {isSubmitting ? "Envoi de la candidature en cours." : ''}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyProgram />
        <Benefits />
        <Eligibility />
        <ActionsAndPractical />
        <FaqCta />
        <Contact />
      </main>
      <MobileStickyCta />
      <Footer />
    </>
  );
}

function FaqPage() {
  return (
    <>
      <Header />
      <main className="section faq-page">
        <div className="container">
          <h1>FAQ - Appel à Manifestation d’Intérêt</h1>
          <p className="lead">Réponses aux questions les plus fréquentes sur le programme.</p>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <div className="faq-actions">
            <Link className="btn btn-outline" to="/">Retour à la page principale</Link>
            <Link className="btn btn-primary" to="/candidature">Accéder au formulaire</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.section'));
    if (sections.length === 0) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((section) => {
      section.classList.remove('is-visible');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.hash, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/candidature" element={<CandidaturePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
