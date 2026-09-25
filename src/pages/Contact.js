import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { FaLinkedin, FaEnvelope, FaPaperPlane, FaGithub } from 'react-icons/fa';
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
  'w-full border-b border-line bg-transparent py-3 text-body text-frost placeholder:text-muted/80 transition-colors duration-300 focus:border-signal focus:outline-none';

const Contact = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const formEl = form.current;
    const formData = new FormData(formEl);

    if (!formData.get('user_name')?.trim() || !formData.get('user_email')?.trim() || !formData.get('message')?.trim()) {
      toast.error('Completá los tres campos para enviar el mensaje.');
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
          <span className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
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

      <div className="mt-14 grid grid-cols-12 gap-x-10 gap-y-16">
        {/* ── Form ──────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-7">
          <Blur>
            <form ref={form} onSubmit={sendEmail} className="max-w-xl">
              <div className="flex flex-col gap-8">
                <div>
                  <label htmlFor="user_name" className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
                    Nombre <span className="text-signal">*</span>
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Tu nombre"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="user_email" className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
                    Email <span className="text-signal">*</span>
                  </label>
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="tu@email.com"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
                    Mensaje <span className="text-signal">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="¿Qué necesitás? Plazo, stack, lo que tengas."
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2.5 bg-signal px-7 py-3.5 text-small font-medium text-ink transition-colors duration-300 ease-out hover:bg-[#F0BC63] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Enviando' : 'Enviar mensaje'}
                    {!loading && <FaPaperPlane aria-hidden="true" className="text-[0.8rem]" />}
                  </button>
                </div>
              </div>
            </form>
          </Blur>
        </div>

        {/* ── Direct channels ───────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Blur delay={0.1}>
              <h2 className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
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
                        <span className="block font-mono text-micro uppercase tracking-[0.14em] text-muted">
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
