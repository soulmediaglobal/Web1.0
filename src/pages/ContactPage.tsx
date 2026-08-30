import React, { useState } from 'react';
import { submitContactInquiry } from '../contact/api';
import { countryCallingCodes, regionToFlag, sanitizePhoneDigits } from '../contact/countryCallingCodes';

export const ContactPage: React.FC = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [challengingProject, setChallengingProject] = useState('');
  const [phoneCountry, setPhoneCountry] = useState({ option: 'ID-62', region: 'ID', code: '62' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev => {
      const isRemoving = prev.includes(domain);
      if (domain === 'challenging-project' && isRemoving) setChallengingProject('');
      return isRemoving ? prev.filter(item => item !== domain) : [...prev, domain];
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitContactInquiry({
        name: String(data.get('name') ?? ''),
        phoneCountryCode: phoneCountry.code,
        phoneNumber: String(data.get('phoneNumber') ?? ''),
        email: String(data.get('email') ?? ''),
        organization: String(data.get('organization') ?? ''),
        services: selectedDomains,
        challengingProject: selectedDomains.includes('challenging-project') ? challengingProject : '',
        message: String(data.get('message') ?? ''),
        website: String(data.get('website') ?? ''),
      });
      form.reset();
      setSelectedDomains([]);
      setChallengingProject('');
      setPhoneCountry({ option: 'ID-62', region: 'ID', code: '62' });
      setPhoneNumber('');
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your inquiry right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-20 bg-[#131313] text-[#e5e2e1] min-h-screen">
      
      <div className="relative w-full overflow-hidden bg-[#131313]">
        <div className="absolute inset-0 pointer-events-none opacity-5 [background-size:48px_48px] [background-image:radial-gradient(#ffffff_1px,transparent_1px)]"></div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-16 w-full pt-16 pb-24 relative z-10">
          
          <div className="flex flex-col gap-6 md:w-2/3 xl:w-1/2 mb-16 relative pl-6 border-l-4 border-[#D0190F]">
            <span className="font-mono text-xs text-[#D0190F] tracking-widest uppercase">
              Secure Channel // Access Level 4
            </span>
            <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-white uppercase m-0 p-0 leading-none">
              Initiate Strategic Consultation
            </h1>
            <p className="font-sans text-base text-gray-400 max-w-xl leading-relaxed">
              Submit comprehensive RFP parameters or request architectural audits. Engaging with our enterprise engineering teams guarantees strict adherence to corporate security protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FORM CONTAINER */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8 bg-[#1c1b1b] p-6 md:p-10 relative border border-white/10 shadow-xl">
              <div className="flex flex-col gap-2 border-b border-white/10 pb-4 justify-between md:flex-row md:items-center">
                <h2 className="font-['Bebas_Neue'] text-3xl text-white uppercase tracking-wide">
                  Inquiry Parameters
                </h2>
                <span className="font-mono text-[10px] text-gray-500 uppercase">SYS.REQ.889.B</span>
              </div>

              {submitSuccess ? (
                <div className="p-8 bg-[#D0190F]/10 border border-[#D0190F] flex flex-col gap-4 text-center items-center my-12">
                  <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest">[ TRANSMISSION COMPLETE ]</span>
                  <h3 className="font-['Bebas_Neue'] text-4xl text-white uppercase">Inquiry Received</h3>
                  <p className="font-sans text-sm text-gray-300 max-w-md">
                    Thank you. Our team will review your briefing and respond through the contact details provided.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 px-6 py-2 border border-white/20 text-xs font-mono uppercase hover:border-[#D0190F] transition-all"
                  >
                    Submit Another Protocol
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
                  <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <fieldset className="flex flex-col gap-6">
                    <legend className="mb-1 font-['Bebas_Neue'] text-2xl text-white uppercase tracking-wide">User Data</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-mono text-xs text-gray-400 uppercase">
                        Name *
                      </label>
                      <input 
                        id="name"
                        name="name"
                        className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all placeholder-gray-600" 
                        placeholder="Your full name"
                        required 
                        minLength={2}
                        maxLength={120}
                        autoComplete="name"
                        type="text"
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-2">
                      <label htmlFor="phoneNumber" className="font-mono text-xs text-gray-400 uppercase">
                        Phone Number *
                      </label>
                      <div className="flex min-w-0 gap-2">
                        <div className="relative w-[8.25rem] shrink-0 bg-[#131313] border border-white/10 focus-within:border-[#D0190F] transition-all">
                          <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center gap-2 px-4 pr-9 text-sm text-white font-sans">
                            <span>{regionToFlag(phoneCountry.region)}</span>
                            <span>+{phoneCountry.code}</span>
                          </span>
                          <select
                            id="phoneCountryCode"
                            name="phoneCountryOption"
                            aria-label="Country calling code"
                            className="relative z-10 h-full w-full cursor-pointer appearance-none bg-transparent p-4 pr-9 text-sm text-transparent font-sans focus:outline-none"
                            required
                            value={phoneCountry.option}
                            autoComplete="tel-country-code"
                            onChange={(event) => {
                              const option = event.target.selectedOptions[0];
                              setPhoneCountry({
                                option: option.value,
                                region: option.dataset.region ?? 'ID',
                                code: option.dataset.code ?? '62',
                              });
                            }}
                          >
                            {countryCallingCodes.map(({ region, name, code }, index) => (
                              <option className="bg-white text-black" data-code={code} data-region={region} key={`${region}-${code}-${index}`} value={`${region}-${code}`}>
                                {regionToFlag(region)} +{code} — {name}
                              </option>
                            ))}
                          </select>
                          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute right-3 top-1/2 z-20 h-4 w-4 -translate-y-1/2 text-gray-500">
                            <path fillRule="evenodd" d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          aria-describedby="phoneNumberHelp"
                          className="min-w-0 flex-1 bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all placeholder-gray-600"
                          placeholder="81234567890"
                          required
                          minLength={4}
                          maxLength={14}
                          inputMode="numeric"
                          pattern="[0-9]+"
                          autoComplete="tel-national"
                          type="text"
                          value={phoneNumber}
                          onChange={(event) => setPhoneNumber(sanitizePhoneDigits(event.target.value))}
                        />
                      </div>
                      <p id="phoneNumberHelp" className="font-sans text-xs leading-relaxed text-gray-500">
                        Country code is already selected. Enter the rest of your phone number only.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-mono text-xs text-gray-400 uppercase">
                        Email *
                      </label>
                      <input 
                        id="email"
                        name="email"
                        className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all placeholder-gray-600" 
                        placeholder="name@company.com"
                        required 
                        maxLength={254}
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        autoComplete="email"
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="organization" className="font-mono text-xs text-gray-400 uppercase">
                        Organization / Company *
                      </label>
                      <input 
                        id="organization"
                        name="organization"
                        className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all placeholder-gray-600" 
                        placeholder="Global Corp Ltd." 
                        required 
                        minLength={2}
                        maxLength={160}
                        autoComplete="organization"
                        type="text"
                      />
                    </div>
                  </div>
                  </fieldset>

                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-1 font-['Bebas_Neue'] text-2xl text-white uppercase tracking-wide">Service</legend>
                    <span className="font-mono text-xs text-gray-400 uppercase">
                      Service (Select Multiple)
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'strategy-product', label: 'Digital Strategy & Product Architecture' },
                        { id: 'software-enterprise', label: 'Custom Software & Enterprise Applications' },
                        { id: 'ai-automation', label: 'AI, Automation & System Integration' },
                        { id: 'cloud-platform', label: 'Cloud & Platform Engineering' },
                        { id: 'challenging-project', label: 'Another Challenging Project' }
                      ].map(domain => {
                        const isSelected = selectedDomains.includes(domain.id);
                        return (
                          <button
                            type="button"
                            key={domain.id}
                            onClick={() => toggleDomain(domain.id)}
                            aria-pressed={isSelected}
                            className={`px-5 py-3 border font-mono text-xs uppercase transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#D0190F]/20 border-[#D0190F] text-[#D0190F]'
                                : 'bg-[#131313] border-white/10 text-gray-300 hover:border-[#D0190F]/50'
                            }`}
                          >
                            {domain.label}
                          </button>
                        );
                      })}
                    </div>
                    {selectedDomains.includes('challenging-project') ? (
                      <div className="flex flex-col gap-2 pt-2">
                        <label htmlFor="challengingProject" className="font-mono text-xs text-gray-400 uppercase">
                          Define Your Challenging Project *
                        </label>
                        <textarea
                          id="challengingProject"
                          name="challengingProject"
                          value={challengingProject}
                          onChange={(event) => setChallengingProject(event.target.value)}
                          className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all min-h-[120px] resize-y placeholder-gray-600"
                          placeholder="Tell us what you would like to build or solve..."
                          required
                          minLength={5}
                          maxLength={1000}
                        />
                      </div>
                    ) : null}
                  </fieldset>

                  <fieldset className="flex flex-col gap-2">
                    <legend className="mb-1 font-['Bebas_Neue'] text-2xl text-white uppercase tracking-wide">Briefing Summary</legend>
                    <label className="font-mono text-xs text-gray-400 uppercase">
                      Project Briefing / Message *
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all min-h-[160px] resize-y placeholder-gray-600" 
                      placeholder="Tell us about your goals, current situation, and what support you need..."
                      required
                      minLength={20}
                      maxLength={5000}
                    ></textarea>
                  </fieldset>

                  {submitError ? (
                    <p className="border border-red-500/60 bg-red-500/10 p-4 font-sans text-sm text-red-200" role="alert">
                      {submitError}
                    </p>
                  ) : null}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
                    <p className="font-mono text-[10px] text-gray-400 uppercase max-w-xs leading-relaxed">
                      Your information is used only to review and respond to this inquiry.
                    </p>
                    <button 
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="w-full sm:w-auto px-10 py-4 bg-[#D0190F] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#a0130b] transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50" 
                      type="submit"
                    >
                      {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY →'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT SIDEBAR / INFO */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
              
              <div className="bg-[#1c1b1b] p-8 flex flex-col gap-4 border-t-2 border-[#D0190F] shadow-xl border-x border-b border-white/10">
                <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest">// SECURITY ASSURANCE</span>
                <h3 className="font-['Bebas_Neue'] text-3xl text-white uppercase leading-none">
                  Confidential Inquiry Channel
                </h3>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  Your inquiry is stored in our secured operations system and is available only to authorized CMS administrators.
                </p>
              </div>

              <div className="bg-[#1c1b1b] p-8 flex flex-col gap-6 border border-white/10 shadow-xl">
                <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Direct Comms</span>
                  <a href="mailto:info@soulmedia.id" className="font-mono text-base text-[#D0190F] hover:underline flex items-center gap-2">
                    info@soulmedia.id →
                  </a>
                </div>

                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Global Nodes</span>
                  
                  {/* HQ Jogja */}
                  <div className="flex flex-col gap-2 border-l-2 border-[#D0190F] pl-4">
                    <span className="font-mono text-xs text-white uppercase font-bold">HQ Yogyakarta, IND</span>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      RUKO DE MERCY<br />
                      Jl. Kapten Haryadi Ngebel Gede No.R.02<br />
                      Kec. Ngaglik, Kab. Sleman, DI Yogyakarta 55581
                    </p>
                    <div className="w-full h-28 mt-2 bg-[#131313] border border-white/10 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" 
                        alt="Yogyakarta Tech Hub" 
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100" 
                      />
                    </div>
                  </div>

                  {/* Jakarta Node */}
                  <div className="flex flex-col gap-2 border-l-2 border-gray-600 pl-4 mt-2">
                    <span className="font-mono text-xs text-white uppercase font-bold">Jakarta Exchange Node</span>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      [soon]
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
