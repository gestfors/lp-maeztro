const iconPaths = {
      menu: '<path d="M4 6h16M4 12h16M4 18h16" />',
      'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6" />',
      check: '<path d="m5 12 4 4L19 6" />',
      'message-circle': '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.9L3 21l1.9-4A8.4 8.4 0 0 1 3 11.5a9 9 0 0 1 18 0Z" />',
      'credit-card': '<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" />',
      'clipboard-list': '<rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h3" />',
      'calendar-days': '<rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />',
      'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h6" />',
      'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" />',
      'chevron-down': '<path d="m6 9 6 6 6-6" />',
      x: '<path d="M18 6 6 18M6 6l12 12" />',
    };

    function createFallbackIcons() {
      document.querySelectorAll('[data-lucide]').forEach((element) => {
        const paths = iconPaths[element.getAttribute('data-lucide')];
        if (!paths) return;

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '2');
        icon.setAttribute('stroke-linecap', 'round');
        icon.setAttribute('stroke-linejoin', 'round');
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = paths;
        element.replaceWith(icon);
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      createFallbackIcons();

      const menuButton = document.querySelector('.menu-toggle');
      const mobileNav = document.querySelector('.mobile-nav');
      if (menuButton && mobileNav) {
        const closeMenu = () => {
          mobileNav.classList.remove('open');
          menuButton.setAttribute('aria-expanded', 'false');
          menuButton.setAttribute('aria-label', 'Abrir menu');
        };

        menuButton.addEventListener('click', () => {
          const isOpen = mobileNav.classList.toggle('open');
          menuButton.setAttribute('aria-expanded', String(isOpen));
          menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });
        mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
        document.addEventListener('click', (event) => {
          if (!mobileNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
        });
        document.addEventListener('keydown', (event) => {
          if (event.key !== 'Escape' || !mobileNav.classList.contains('open')) return;
          closeMenu();
          menuButton.focus();
        });
      }

      const modal = document.getElementById('legal-modal');
      const modalTitle = document.getElementById('modal-title');
      const modalBody = document.getElementById('modal-body');
      const modalPanel = modal?.querySelector('.modal-panel');
      const closeModal = document.getElementById('close-modal');
      const modalOkButton = document.getElementById('modal-ok-btn');
      let previousFocus = null;

      const openModal = (title, content) => {
        if (!modal || !modalTitle || !modalBody) return;
        previousFocus = document.activeElement;
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeModal?.focus();
      };

      const hideModal = () => {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        previousFocus?.focus();
      };

      document.getElementById('open-privacy')?.addEventListener('click', (event) => {
        event.preventDefault();
        openModal('Política de Privacidade', `
          <p>O MAEZTRO Gestão valoriza sua privacidade e a confidencialidade das suas informações pedagógicas e financeiras.</p>
          <p>Seus dados cadastrais (nome, WhatsApp, atuação e faturamento informado) são utilizados exclusivamente para fins de criação e suporte da sua conta de teste durante os 14 dias.</p>
          <p>Não comercializamos nem compartilhamos seus dados com terceiros. A qualquer momento você pode solicitar a exclusão total dos seus dados de nossa base.</p>
        `);
      });

      document.getElementById('open-terms')?.addEventListener('click', (event) => {
        event.preventDefault();
        openModal('Termos de Uso', `
          <p>O período de teste gratuito concede direito de uso das ferramentas do MAEZTRO Gestão por 14 dias consecutivos a partir do cadastro.</p>
          <p>O usuário é responsável pela veracidade dos dados inseridos e pela correta gestão das aulas e recibos emitidos aos seus alunos.</p>
          <p>O serviço não possui cláusula de fidelidade obrigatória e pode ser cancelado pelo usuário a qualquer momento sem penalidades.</p>
        `);
      });

      closeModal?.addEventListener('click', hideModal);
      modalOkButton?.addEventListener('click', hideModal);
      modal?.addEventListener('click', (event) => {
        if (event.target === modal) hideModal();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal?.classList.contains('is-open')) hideModal();
        if (event.key !== 'Tab' || !modal?.classList.contains('is-open') || !modalPanel) return;

        const focusable = modalPanel.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });

      const feedbackForm = document.getElementById('feedback-form');
      if (feedbackForm) {
        const differentialFollowup = document.getElementById('differential-followup');
        const subscriptionFollowup = document.getElementById('subscription-followup');
        const differentialField = document.getElementById('differential');
        const subscriptionReasonField = document.getElementById('subscription-reason');

        const updateFeedbackFollowups = () => {
          const differentialAnswer = feedbackForm.querySelector('[name="hasDifferential"]:checked')?.value;
          const subscriptionAnswer = feedbackForm.querySelector('[name="subscription"]:checked')?.value;
          const showDifferential = differentialAnswer === 'Sim';
          const showSubscription = Boolean(subscriptionAnswer && subscriptionAnswer !== 'Sim, assinei.');

          differentialFollowup.hidden = !showDifferential;
          differentialField.required = showDifferential;
          differentialField.disabled = !showDifferential;
          subscriptionFollowup.hidden = !showSubscription;
          subscriptionReasonField.disabled = !showSubscription;
        };

        feedbackForm.addEventListener('change', updateFeedbackFollowups);
        updateFeedbackFollowups();

        const submitButton = feedbackForm.querySelector('[type="submit"]');
        const submitStatus = document.getElementById('feedback-status');
        const submitLabel = submitButton.textContent;

        feedbackForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          if (!feedbackForm.reportValidity()) return;

          submitButton.disabled = true;
          submitButton.textContent = 'Enviando...';
          submitStatus.textContent = 'Enviando sua avaliação...';

          try {
            const response = await fetch(feedbackForm.action, {
              method: 'POST',
              body: new FormData(feedbackForm),
              headers: { Accept: 'application/json' },
            });

            if (!response.ok) throw new Error('Falha ao enviar avaliação');
            window.location.assign('index.html');
          } catch {
            submitButton.disabled = false;
            submitButton.textContent = submitLabel;
            submitStatus.textContent = 'Não foi possível enviar agora. Verifique sua conexão e tente novamente.';
          }
        });
      }
    });
