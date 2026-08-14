export function toggleModal(modalId, isVisible) {
  const modal = document.getElementById(modalId);
  modal.classList.toggle('hidden', !isVisible)
}

export function showError(message) {
  const errorModal = document.getElementById('error-modal');
  const errorMsg = document.getElementById('error-message');

  toggleModal('error-modal', true);  
}