"use client";

import Modal from './Modal';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  const isTerms = type === 'terms';
  const title = isTerms ? 'Terms of Service' : 'Privacy Policy';

  const content = isTerms ? (
    <div className="prose prose-invert max-w-none text-neutral-300 space-y-4 text-sm">
      <h3 className="text-white font-semibold text-lg mb-4">Terms of Service</h3>
      
      <section>
        <h4 className="text-white font-medium mb-2">1. User Responsibilities</h4>
        <p className="text-neutral-400">
          Users must provide accurate information and maintain the security of their accounts. 
          You are responsible for all activities that occur under your account.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">2. Copyright and Licensing</h4>
        <p className="text-neutral-400">
          Creators retain ownership of their beats. By uploading content, you grant BeatMarket 
          a non-exclusive license to host, stream, and sell your beats according to your selected 
          licensing terms.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">3. Beat Ownership</h4>
        <p className="text-neutral-400">
          Creators certify that they have the rights to upload and monetize all content. 
          You must own or have proper licensing for all samples and elements used in your beats.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">4. Marketplace Rules</h4>
        <p className="text-neutral-400">
          Prohibited content includes: illegal material, copyright violations, hate speech, 
          spam, or fraudulent activity. Violations may result in account suspension or termination.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">5. Purchases and Refunds</h4>
        <p className="text-neutral-400">
          Sales are generally final. Refund requests are handled on a case-by-case basis for 
          defective or misrepresented files. Contact support for assistance.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">6. Liability Limitations</h4>
        <p className="text-neutral-400">
          BeatMarket is provided "as is" without warranties. We are not liable for indirect 
          or consequential damages. Our liability is limited to amounts paid in the last 3 months.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">7. DMCA and Copyright Removal</h4>
        <p className="text-neutral-400">
          To submit a DMCA takedown notice, provide: your contact information, description of 
          the copyrighted work, URLs of infringing content, good faith statement, and signature. 
          Repeat infringers may have their accounts terminated.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">8. Changes to Terms</h4>
        <p className="text-neutral-400">
          We may update these terms at any time. Continued use of the platform constitutes 
          acceptance of the updated terms.
        </p>
      </section>
    </div>
  ) : (
    <div className="prose prose-invert max-w-none text-neutral-300 space-y-4 text-sm">
      <h3 className="text-white font-semibold text-lg mb-4">Privacy Policy</h3>
      
      <section>
        <h4 className="text-white font-medium mb-2">1. Information We Collect</h4>
        <p className="text-neutral-400">
          We collect information you provide directly (email, display name, payment information) 
          and automatically (usage data, device information, cookies).
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">2. How We Use Your Information</h4>
        <p className="text-neutral-400">
          We use your information to provide services, process transactions, communicate with you, 
          improve our platform, and ensure security.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">3. Information Sharing</h4>
        <p className="text-neutral-400">
          We do not sell your personal information. We may share data with service providers, 
          legal authorities when required, or in connection with business transfers.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">4. Data Security</h4>
        <p className="text-neutral-400">
          We implement industry-standard security measures to protect your data. However, 
          no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">5. Your Rights</h4>
        <p className="text-neutral-400">
          You have the right to access, update, or delete your personal information. 
          Contact us to exercise these rights.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">6. Cookies and Tracking</h4>
        <p className="text-neutral-400">
          We use cookies to enhance your experience, analyze usage, and personalize content. 
          You can control cookies through your browser settings.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">7. Children's Privacy</h4>
        <p className="text-neutral-400">
          Our service is not intended for users under 13 years of age. We do not knowingly 
          collect information from children.
        </p>
      </section>

      <section>
        <h4 className="text-white font-medium mb-2">8. Changes to Privacy Policy</h4>
        <p className="text-neutral-400">
          We may update this privacy policy periodically. We will notify you of significant 
          changes via email or platform notification.
        </p>
      </section>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {content}
    </Modal>
  );
}


