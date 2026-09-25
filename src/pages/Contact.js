import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { FaLinkedin, FaEnvelope, FaPaperPlane, FaGithub, FaExclamationCircle } from 'react-icons/fa';
import { Wipe, Blur } from '../components/Reveal';

const channels = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'ignacioibaigorria@gmail.com',
    href: 'mailto:ignacioibaigorria@gmail.com',
    color: '#E3A94F',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'ignacio-ibaigorria',
    href: 'https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/',
    color: '#0A66C2',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'IgnacioIbaigorria',
    href: 'https://github.com/IgnacioIbaigorria',
    color: '#E9EDED',
  },
];

const fieldClass =
  'w-full border-b bg-transparent py-3 text-body text-frost placeholder:text-muted/80 transition-colors duration-300 focus:outline-none';

// Which form field backs each error key.
const FIELD_NAMES = { name: 'user_name', email: 'user_email', message: 'message' };

// Deliberately pragmatic. The full RFC 5322 grammar accepts addresses no mail
// server would honour, and the failure mode of a too-permissive pattern is a
// silent bounce. This is local@label(.label)+.tld written as dot-separated
// segments, so empty segments are impossible: it rejects what people actually
// get wrong (a missing @, a missing domain, stray spaces, a one-letter TLD) and
// also the sneaky ones — leading, trailing or doubled dots on either side.
const EMAIL_PATTERN = /^[^\s@.]+(?:\.[^\s@.]+)*@[^\s@.]+(?:\.[^\s@.]+)*\.[a-z]{2,}$/i;

const checkName = (value) => (value ? undefined : 'Escribí tu nombre para saber cómo contestarte.');

const checkEmail = (value) => {
  if (!value) return 'Necesito un email para responderte.';
  if (!EMAIL_PATTERN.test(value)) return 'Revisá el email: tiene que verse como nombre@dominio.com';
  return undefined;
};

const checkMessage = (value) => (value ? undefined : 'Contame qué necesitás, aunque sea de pasada.');

const CHECKS = { name: checkName, email: checkEmail, message: checkMessage };

const Contact = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Drop a field's error the moment the visitor starts fixing it.
  const clearError = (key) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const checkOnBlur = (key) => (e) => {
    const value = e.target.value.trim();
    setErrors((prev) => ({ ...prev, [key]: CHECKS[key](value) }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const formEl = form.current;
    const formData = new FormData(formEl);

    const values = {
      name: String(formData.get('user_name') ?? '').trim(),
      email: String(formData.get('user_email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };

    const nextErrors = Object.fromEntries(
      Object.keys(FIELD_NAMES)
        .map((key) => [key, CHECKS[key](values[key])])
        .filter(([, message]) => message)
    );

    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      formEl.querySelector(`[name="${FIELD_NAMES[firstInvalid]}"]`)?.focus();
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        formEl,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      toast.success('Mensaje enviado. Te respondo dentro de las próximas 24 horas.');
      formEl.reset();
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error('No pude enviar el mensaje. Probá de nuevo o escribime directo por email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="border-t border-line pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <Wipe>
            <h1 className="font-display text-headline text-frost">Contacto</h1>
          </Wipe>
          <span className="font-mono text-micro uppercase text-muted">
            Respondo en menos de 24 h
          </span>
        </div>
        <Blur className="mt-6 max-w-measure">
          <p className="text-lead text-muted">
            Contame qué necesitás construir y en qué plazo. Si tiene sentido, te digo cuánto cuesta
            y cuándo lo tenés funcionando.
          </p>
        </Blur>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-12">
        {/* ── Form ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <Blur>
            {/* noValidate on purpose: the browser's own bubble is unstyled and in
                the browser's language, and it would swallow the submit event before
                any of our Spanish, field-level messages could run. */}
            <form ref={form} onSubmit={sendEmail} className="max-w-xl" noValidate>
              <div className="flex flex-col gap-8">
                <div>
                  <label htmlFor="user_name" className="font-mono text-micro uppercase text-muted">
                    Nombre <span className="text-signal">*</span>
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    required
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Tu nombre"
                    onChange={() => clearError('name')}
                    onBlur={checkOnBlur('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'user_name-error' : undefined}
                    className={errors.name ? `${fieldClass} border-danger` : `${fieldClass} border-line focus:border-signal`}
                  />
                  {errors.name && (
                    <p id="user_name-error" role="alert" className="mt-2 flex items-start gap-2 text-small text-danger">
                      <FaExclamationCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[0.9rem]" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="user_email" className="font-mono text-micro uppercase text-muted">
                    Email <span className="text-signal">*</span>
                  </label>
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    inputMode="email"
                    placeholder="tu@email.com"
                    onChange={() => clearError('email')}
                    onBlur={checkOnBlur('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'user_email-error' : undefined}
                    className={errors.email ? `${fieldClass} border-danger` : `${fieldClass} border-line focus:border-signal`}
                  />
                  {errors.email && (
                    <p id="user_email-error" role="alert" className="mt-2 flex items-start gap-2 text-small text-danger">
                      <FaExclamationCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[0.9rem]" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="font-mono text-micro uppercase text-muted">
                    Mensaje <span className="text-signal">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={2000}
                    rows={5}
                    placeholder="¿Qué necesitás? Plazo, stack, lo que tengas."
                    onChange={() => clearError('message')}
                    onBlur={checkOnBlur('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${errors.message ? `${fieldClass} border-danger` : `${fieldClass} border-line focus:border-signal`} resize-y`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-2 flex items-start gap-2 text-small text-danger">
                      <FaExclamationCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[0.9rem]" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2.5 bg-signal px-7 py-3.5 text-small font-medium text-ink transition-colors duration-300 ease-out hover:bg-[#F0BC63] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Enviando' : 'Enviar mensaje'}
                    {!loading && <FaPaperPlane aria-hidden="true" className="text-[0.9rem]" />}
                  </button>
                </div>
              </div>
            </form>
          </Blur>
        </div>

        {/* ── Direct channels ───────────────────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Blur delay={0.1}>
              <h2 className="font-mono text-micro uppercase text-muted">
                O escribime directo
              </h2>

              <ul className="mt-4 border-t border-line">
                {channels.map(({ icon: Icon, label, value, href, color }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 border-b border-line py-5 transition-colors duration-300 hover:bg-raised/60"
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-line text-[0.9rem] transition-colors duration-300 group-hover:border-signal"
                        style={{ color }}
                        aria-hidden="true"
                      >
                        <Icon />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-micro uppercase text-muted">
                          {label}
                        </span>
                        <span className="mt-1 block truncate text-small text-frost transition-colors duration-300 group-hover:text-signal">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex items-center gap-2.5 text-small text-muted">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
                Disponible para proyectos nuevos y soporte de los que ya están.
              </p>
            </Blur>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
