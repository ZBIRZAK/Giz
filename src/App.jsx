import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import logoGiz from './assets/images/logos/giz.svg';
import logoWe4She from './assets/images/logos/we4she.svg';
import logoEu from './assets/images/logos/EU.svg';
import logoEldz from './assets/images/logos/ELdZ_Maro_cmyk_arab.webp';

import iconDiagnostic from './assets/icones/diagnostic.svg';
import iconTech from './assets/icones/tech.svg';
import iconPosition from './assets/icones/position.svg';
import iconFundedRecrutement from './assets/icones/Recrutement.png';
import iconFundedAmenagement from './assets/icones/Amenagement.png';
import iconFundedFormations from './assets/icones/Formations.png';
import iconFundedProgrammes from './assets/icones/Programmes.png';

const eligibleSectors = [
  'Industrie',
  'Numérique / IT',
  'Énergies renouvelables',
  'Économie verte',
  'Agro-industrie innovante',
];

const fundedActions = [
  { id: 'recrutement', label: 'Recrutement ciblé de femmes' },
  { id: 'creche', label: "Aménagement d’une crèche\u00a0d’entreprise" },
  { id: 'leadership', label: 'Programmes de leadership\u00a0féminin' },
  { id: 'formation', label: 'Formations techniques ou certifiantes' },
];

const heroSlides = [
  {
    src: '/images/woman-orange-safety-jacket-working-laptop.jpg',
    alt: 'Professionnelle travaillant sur ordinateur dans un environnement industriel',
  },
  {
    src: '/images/woman-wearing-safety-helmet-is-working-computer.jpg',
    alt: 'Femme en casque de sécurité travaillant sur ordinateur',
  },
  {
    src: '/images/male-female-workers-high-visibility-vests-hard-hats-using-tablet-industrial-facility.jpg',
    alt: 'Équipe mixte utilisant une tablette dans un site industriel',
  },
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
  "Infrastructures (ex : crèche d'entreprise)",
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
    a: [
      'Engagement réel de la direction',
      "Potentiel d'impact sur l'emploi féminin",
      'Capacité à mettre en œuvre des actions concrètes',
    ],
  },
  {
    q: 'Le financement d’un appui technique est-il garanti pour les entreprises sélectionnées ?',
    a: "Oui. C’est un appui technique qui va jusqu’à 250 000 MAD par entreprise, sous deux conditions : réalisation d’un diagnostic et validation du plan d’action par la direction.",
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
    a: {
      intro: 'Oui.',
      bullets: ['un point focal', 'un sponsor au niveau de la direction'],
    },
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
  phoneNumber: '',
  directionCommitment: '',
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
        <div className="header-logos" aria-label="Partenaires du programme">
          <img className="header-logo-item" src={logoEldz} alt="ELdZ Maroc" loading="lazy" decoding="async" />
          <img className="header-logo-item" src={logoEu} alt="Union européenne" loading="lazy" decoding="async" />
          <img className="header-logo-item" src={logoGiz} alt="GIZ" loading="lazy" decoding="async" />
          <img className="header-logo-item" src={logoWe4She} alt="We4She" loading="lazy" decoding="async" />
        </div>
        {/* <Link className="header-link" to="/#contact">Contact</Link> */}
      </div>
    </header>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero section">
      <div className="container hero-grid">
        <div>
          {/* <p className="eyebrow">Programme d’accompagnement financé</p> */}
          <h1>Appel à Manifestation d'Intérêt</h1>
          <p className="hero-intro">
            <strong>Le projet INEFF</strong> « Inclusion économique des femmes dans les secteurs du futur » et le réseau We4She
            lancent un Appel à Manifestation d’Intérêt pour accompagner 10 entreprises des secteurs du futur dans la
            promotion de l’égalité genre.
          </p>
          <ol className="hero-steps">
            <li>
              <strong>Design :</strong> diagnostic stratégique et accompagnement sur mesure pour identifier vos leviers de performance pour la promotion de l’égalité genre
            </li>
            <li>
              <strong>Execute :</strong> feuille de route opérationnelle et appui technique jusqu’à 250 000 MAD pour implémenter des actions à fort impact
            </li>
            <li>
              <strong>Scale :</strong> dynamique entre pairs et cadre structuré pour ancrer des résultats mesurables et durables
            </li>
          </ol>
          <p className="deadline">Candidatures ouvertes jusqu’au <strong>30 mai 2026</strong>.</p>
          <Link className="btn btn-primary" to="/candidature" onClick={() => trackEvent('cta_click', { source: 'hero' })}>
            Postuler maintenant
          </Link>
        </div>
        <div className="hero-visual">
          <figure className="hero-media">
            <div className="hero-slider" aria-roledescription="carousel" aria-label="Images du programme">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`hero-slide ${index === activeSlide ? 'is-active' : ''}`}
                  aria-hidden={index !== activeSlide}
                >
                  <img src={slide.src} alt={slide.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                </div>
              ))}

              <div className="hero-dots" aria-hidden="true">
                {heroSlides.map((slide, index) => (
                  <button
                    key={`${slide.src}-dot`}
                    type="button"
                    className={`hero-dot ${index === activeSlide ? 'is-active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section section-alt">
      <div className="container">
        <h2>Pourquoi c’est intéressant pour votre entreprise ?</h2>
        <div className="cards-3">
          <article className="card">
            <img className="benefit-icon" src={iconDiagnostic} alt="" aria-hidden="true" />
            <h3>Accédez à un diagnostic stratégique</h3>
            <p className='para-pourq'>Comprenez précisément vos freins en matière de recrutement, rétention et promotion des femmes.</p>
          </article>
          <article className="card">
            <img className="benefit-icon" src={iconTech} alt="" aria-hidden="true" />
            <h3>Bénéficiez d’un appui technique direct</h3>
            <p className='para-pourq'>Jusqu’à <strong>250 000 MAD</strong> d’appui technique pour mettre en œuvre des actions concrètes visant la promotion de l’égalité genre.</p>
          </article>
          <article className="card">
            <img className="benefit-icon" src={iconPosition} alt="" aria-hidden="true" />
            <h3>Renforcez votre positionnement ESG</h3>
            <p className='para-pourq'>Accès à une expertise et intégration d’un réseau international.</p>
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
          <h2>À qui s’adresse le programme&nbsp;?</h2>
          <h3>Entreprises éligibles</h3>
          <p className="eligibility-link-wrap para-pourq">
            Entreprises opérant dans les secteurs d’avenir ou stratégiques (
            <a href="https://amdie.gov.ma/guide-de-la-charte-dinvestissement/" target="_blank" rel="noreferrer">
              liste des secteurs
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
            <li>Minimum <strong>20 employés</strong></li>
            <li>Engagement de la direction</li>
            <li>Désignation d’un référent interne</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function FundedActionIcon({ type }) {
  if (type === 'recrutement') {
    return <img src={iconFundedRecrutement} alt="" aria-hidden="true" />;
  }

  if (type === 'creche') {
    return <img src={iconFundedAmenagement} alt="" aria-hidden="true" />;
  }

  if (type === 'formation') {
    return <img src={iconFundedFormations} alt="" aria-hidden="true" />;
  }

  if (type === 'leadership') {
    return <img src={iconFundedProgrammes} alt="" aria-hidden="true" />;
  }

  return <img src={iconFundedFormations} alt="" aria-hidden="true" />;
}

function ActionsAndPractical() {
  return (
    <section className="section">
      <div className="container split-grid">
        <article className="panel funded-panel">
          <h2>Exemples d’actions financées</h2>
          <ul className="funded-grid">
            {fundedActions.map((item) => (
              <li key={item.id} className="funded-card">
                <span className="funded-icon">
                  <FundedActionIcon type={item.id} />
                </span>
                <p>{item.label}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Informations pratiques</h2>
          <h3 className="icon-title"><span aria-hidden="true">📅</span>Calendrier</h3>
          <ul className="info-lines info-lines-bulleted">
            <li>Clôture de l’Appel à Manifestation d’intérêt : <strong>Le 30 mai 2026</strong></li>
          </ul>
          <h3 className="icon-title"><span aria-hidden="true">📍</span>Format du programme</h3>
          <ul className="info-lines info-lines-bulleted">
            <li>Accompagnement personnalisé</li>
            <li>Durée : environ 12 mois</li>
            <li>Interaction régulière avec experts</li>
          </ul>
          <h3 className="icon-title"><span aria-hidden="true">📄</span>Ce que vous devez soumettre</h3>
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
        <Link
          className="btn btn-primary"
          to="/faq"
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('cta_click', { source: 'faq_preview' })}
        >
          Consulter la FAQ complète
        </Link>
      </div>
    </section>
  );
}

function Contact() {
  const handleContact = () => {
    window.location.href =
      'mailto:Mohamed-amine.faiz@giz.de,afaf.aderdoun@giz.de?subject=Demande d’information – AMI INEFF x We4She';
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
            <img src={logoEldz} alt="ELdZ Maroc" loading="lazy" decoding="async" />
          </div>
          <div className="logo-placeholder">
            <img src={logoEu} alt="Union européenne" loading="lazy" decoding="async" />
          </div>
          <div className="logo-placeholder">
            <img src={logoGiz} alt="GIZ" loading="lazy" decoding="async" />
          </div>
          <div className="logo-placeholder">
            <img src={logoWe4She} alt="We4She" loading="lazy" decoding="async" />
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
        <h3>À propos du projet INEFF</h3>
        <p>
          <strong>Le projet INEFF</strong> « Inclusion économique des femmes dans les secteurs du futur » est mis en œuvre par la Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), en partenariat avec le Ministère de l’Inclusion Économique, de la Petite Entreprise, de l’Emploi et des Compétences, et financé par le Ministère fédéral allemand de la Coopération économique et du Développement (BMZ) et l’Union Européenne.
        </p>
        
        <h3>À propos de We4She</h3>
        <p>
          <strong>We4She </strong>est une association marocaine ayant pour mission d’améliorer la représentativité des femmes dans le milieu de l’entreprise et dans les instances dirigeantes. Son réseau œuvre pour l’autonomisation des femmes marocaines et la promotion de l’égalité de genre au sein des entreprises et des organisations, et développe des actions de sensibilisation, de formation, d’accompagnement et de plaidoyer en faveur d’une participation accrue des femmes aux instances de décision.
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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
      const normalizedPhoneNumber = formData.phoneNumber.replace(/\D/g, '');
      if (!formData.phoneNumber.trim()) {
        nextErrors.phoneNumber = 'Ce champ est obligatoire.';
      } else if (!/^(05|06|07)\d{8}$/.test(normalizedPhoneNumber)) {
        nextErrors.phoneNumber = 'Numéro invalide. Entrez 10 chiffres commençant par 05, 06 ou 07.';
      }
      if (!formData.directionCommitment) nextErrors.directionCommitment = 'Choisissez une option.';
    }

    if (step === 3) {
      if (!formData.joinReason.trim()) nextErrors.joinReason = 'Ce champ est obligatoire.';
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
                {/* <p className="step-tag">ÉCRAN D’INTRO</p> */}
                <p>
                  Dans le cadre du projet INEFF « Inclusion économique des femmes dans les secteurs du futur » en
                  partenariat avec le réseau We4She, le présent AMI vise à accompagner 10 entreprises marocaines
                  dans la promotion de l’égalité genre avec un appui technique pouvant aller jusqu’à 250 000 MAD.
                </p>
                <p><strong>Temps estimé :</strong> 3–5 minutes</p>
                <p>Cliquez sur “Commencer” pour candidater.</p>
              </div>
            ) : null}

            {step === 1 ? (
              <div>
                <p className="step-tag">SECTION 1 — Informations sur votre entreprise</p>
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
                <p className="step-tag">SECTION 2 — Contact & gouvernance</p>
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
                  label="Numéro de téléphone"
                  required
                  // hint="Format attendu: 10 chiffres, commence par 05, 06 ou 07."
                  error={errors.phoneNumber}
                  htmlFor="phoneNumber"
                >
                  <input
                    id="phoneNumber"
                    className="text-input"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="(05|06|07)[0-9]{8}"
                    maxLength={14}
                    value={formData.phoneNumber}
                    onChange={(e) => setField('phoneNumber', e.target.value)}
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
                <p className="step-tag">SECTION 3 — Diagnostic rapide</p>
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
                <p className="step-tag">SECTION 4 — Capacité & engagement</p>
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
                <p className="step-tag">SECTION 5 — Engagement final</p>
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
                {Array.isArray(item.a) ? (
                  <ul className="faq-bullets">
                    {item.a.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : item.a && typeof item.a === 'object' ? (
                  <>
                    {item.a.intro ? <p>{item.a.intro}</p> : null}
                    {Array.isArray(item.a.bullets) ? (
                      <ul className="faq-bullets">
                        {item.a.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <p>{item.a}</p>
                )}
              </details>
            ))}
          </div>
          <div className="faq-actions">
            {/* <Link className="btn btn-outline" to="/">Retour à la page principale</Link> */}
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
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

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
