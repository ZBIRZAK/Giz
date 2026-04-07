import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'node:crypto';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
  const requestId = crypto.randomUUID();
  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);
  next();
});

const smtpHost = process.env.SMTP_HOST || 'smtp.mail.ovh.ca';
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = String(process.env.SMTP_SECURE || 'true') !== 'false';
const smtpUser = process.env.SMTP_USER || 'z.zbir@box-com.com';
const smtpPass = process.env.SMTP_PASS || 'box-2021@AZbi';
const toEmail = process.env.TO_EMAIL || 'zakaria.zbir@gmail.com';

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

function asList(items) {
  if (!items || items.length === 0) return 'Aucune';
  return items.join(', ');
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidMoroccanPhone(phoneNumber = '') {
  const normalized = String(phoneNumber).replace(/\D/g, '');
  return /^(05|06|07)\d{8}$/.test(normalized);
}

app.post('/api/candidature', async (req, res) => {
  const startedAt = Date.now();
  const requestId = req.requestId;
  try {
    const data = req.body || {};
    if (!isValidMoroccanPhone(data.phoneNumber)) {
      return res.status(400).json({
        ok: false,
        requestId,
        message: 'Numéro invalide. Entrez 10 chiffres commençant par 05, 06 ou 07.',
      });
    }

    const html = `
      <h2>Nouvelle candidature AMI INEFF</h2>
      <p><strong>Nom de l'entreprise:</strong> ${escapeHtml(data.companyName || '')}</p>
      <p><strong>Secteur:</strong> ${escapeHtml(data.sector || '')}${data.sectorOther ? ` - ${escapeHtml(data.sectorOther)}` : ''}</p>
      <p><strong>Nombre d'employés:</strong> ${escapeHtml(data.employees || '')}</p>
      <p><strong>Ville principale:</strong> ${escapeHtml(data.city || '')}</p>
      <hr />
      <p><strong>Point focal:</strong> ${escapeHtml(data.focalName || '')}</p>
      <p><strong>Fonction:</strong> ${escapeHtml(data.focalRole || '')}</p>
      <p><strong>Email professionnel:</strong> ${escapeHtml(data.professionalEmail || '')}</p>
      <p><strong>Téléphone:</strong> ${escapeHtml(data.phoneNumber || 'Non précisé')}</p>
      <p><strong>Engagement direction:</strong> ${escapeHtml(data.directionCommitment || '')}</p>
      <hr />
      <p><strong>Pourquoi rejoindre:</strong><br/>${escapeHtml(data.joinReason || '')}</p>
      <p><strong>Actions prioritaires:</strong> ${escapeHtml(asList(data.priorityActions))}${data.priorityActionsOther ? ` - ${escapeHtml(data.priorityActionsOther)}` : ''}</p>
      <p><strong>Projet identifié:</strong><br/>${escapeHtml(data.existingProject || 'Non précisé')}</p>
      <hr />
      <p><strong>Ouvert au co-financement:</strong> ${escapeHtml(data.coFundingOpen || '')}</p>
      <p><strong>Engagement final:</strong> ${data.finalCommitment ? 'Oui' : 'Non'}</p>
    `;

    const text = [
      'Nouvelle candidature AMI INEFF',
      `Nom entreprise: ${data.companyName || ''}`,
      `Secteur: ${data.sector || ''}${data.sectorOther ? ` - ${data.sectorOther}` : ''}`,
      `Nombre d'employés: ${data.employees || ''}`,
      `Ville principale: ${data.city || ''}`,
      `Point focal: ${data.focalName || ''}`,
      `Fonction: ${data.focalRole || ''}`,
      `Email professionnel: ${data.professionalEmail || ''}`,
      `Téléphone: ${data.phoneNumber || 'Non précisé'}`,
      `Engagement direction: ${data.directionCommitment || ''}`,
      `Pourquoi rejoindre: ${data.joinReason || ''}`,
      `Actions prioritaires: ${asList(data.priorityActions)}${data.priorityActionsOther ? ` - ${data.priorityActionsOther}` : ''}`,
      `Projet identifié: ${data.existingProject || 'Non précisé'}`,
      `Ouvert au co-financement: ${data.coFundingOpen || ''}`,
      `Engagement final: ${data.finalCommitment ? 'Oui' : 'Non'}`,
    ].join('\n');

    await transporter.sendMail({
      from: `"AMI INEFF Form" <${smtpUser}>`,
      to: toEmail,
      replyTo: data.professionalEmail || smtpUser,
      subject: `Nouvelle candidature - ${data.companyName || 'Entreprise'}`,
      text,
      html,
    });

    console.info(`[${requestId}] candidature_sent`, {
      company: data.companyName || '',
      email: data.professionalEmail || '',
      durationMs: Date.now() - startedAt,
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(`[${requestId}] email_send_error`, {
      message: error?.message || 'unknown_error',
      code: error?.code || '',
      durationMs: Date.now() - startedAt,
    });
    res.status(500).json({
      ok: false,
      requestId,
      message: "L'envoi de l'email a échoué.",
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'mail-api',
    uptimeSec: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Mail API running on http://localhost:${port}`);
});
