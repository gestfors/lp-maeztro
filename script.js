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
  sparkles: '<path d="m12 3-1.2 4.2L7 8.5l3.8 1.3L12 14l1.2-4.2L17 8.5l-3.8-1.3L12 3ZM19 14l-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7L19 14ZM5 14l-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14Z" />',
  x: '<path d="M18 6 6 18M6 6l12 12" />',
};

function createFallbackIcons() {
  document.querySelectorAll('[data-lucide]').forEach((element) => {
    const name = element.getAttribute('data-lucide');
    const paths = iconPaths[name];
    if (!paths) return;

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
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
    menuButton.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  document.querySelectorAll('.lead-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
      }
    });
  });


// Modal Legal (Termos e Privacidade)
  const modal = document.getElementById('legal-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.getElementById('close-modal');
  const modalOkBtn = document.getElementById('modal-ok-btn');

  const openModal = (title, content) => {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const hideModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  const privacyBtn = document.getElementById('open-privacy');
  if (privacyBtn) {
    privacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('Política de Privacidade', `
        <p>O MAEZTRO Gestão valoriza sua privacidade e a confidencialidade das suas informações pedagógicas e financeiras.</p>
        <p>Seus dados cadastrais (nome, WhatsApp, atuação e faturamento informado) são utilizados exclusivamente para fins de criação e suporte da sua conta de teste durante os 14 dias.</p>
        <p>Não comercializamos nem compartilhamos seus dados com terceiros. A qualquer momento você pode solicitar a exclusão total dos seus dados de nossa base.</p>
      `);
    });
  }

  const termsBtn = document.getElementById('open-terms');
  if (termsBtn) {
    termsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('Termos de Uso', `
        <p>O período de teste gratuito concede direito de uso das ferramentas do MAEZTRO Gestão por 14 dias consecutivos a partir do cadastro.</p>
        <p>O usuário é responsável pela veracidade dos dados inseridos e pela correta gestão das aulas e recibos emitidos aos seus alunos.</p>
        <p>O serviço não possui cláusula de fidelidade obrigatória e pode ser cancelado pelo usuário a qualquer momento sem penalidades.</p>
      `);
    });
  }

  if (closeModal) closeModal.addEventListener('click', hideModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', hideModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModal();
    });
  }
});
