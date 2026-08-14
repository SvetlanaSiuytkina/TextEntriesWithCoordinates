import { parseCoordinates } from './coordinates.js';
import { toggleModal, showError } from './modal.js';

const posts = [];

function renderPost(post) {
  const timeline = document.getElementById('timeline');
  const postElement = document.createElement('div');
  postElement.className = 'post';

  const date = new Date();

  postElement.innerHTML = `
    <p class="post-content">${post.text}</p>
    <div class="post-meta">Дата: ${date} | Координаты: ${post.latitude}, ${post.longitude}
    </div>
  `;

  timeline.insertBefore(postElement, timeline.firstChild);
}

function handleAddPost() {
  const textarea = document.querySelector('textarea.post-text');
  const text = textarea.value.trim();

  if (!text) {
    showError('Поле не может быть пустым');
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      addPost(text, position.coords.latitude, position.coords.longitude);
      textarea.value = ''; 
    }, () => {
      toggleModal('manual-coords-modal', true);
    });
  } else {
    toggleModal('manual-coords-modal', true);
  }
}

function addPost(text, latitude, longitude) {
  const post = {
    text,
    latitude,
    longitude
  }

  posts.unshift(post);
  renderPost(post);
}

function handleManualCoordsConfirm() {
  const input = document.getElementById('manual-coords-input');
  const textarea = document.querySelector('.post-text');
  const text = textarea.value.trim();
  const errorDiv = document.getElementById('coords-error-message');

  if (!text) {
    showError('Напишите пост');
    return;
  }

  try {
    const coords = parseCoordinates(input.value);

    addPost(text, coords.latitude, coords.longitude);
  
    textarea.value = '';
    input.value = '';
    toggleModal('manual-coords-modal', false);
  } catch (error) {
    console.error('Неверный формат координат:', error);

    let message = error.message;

    if (message.includes('Неверный формат')) {
      message = 'Неверный формат. Введите два числа через запятую: широта, долгота (например: 51.50851, -0.12572)';
    } else if (message.includes('Диапазон')) {
      message = message;
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
}

export function initApp() {
  const addPostBtn = document.querySelector('.add-post-btn');
  const confirmBtn = document.getElementById('confirm-manual-coords');
  const cancelBtn = document.getElementById('cancel-manual-coords');
  const closeErrorBtn = document.getElementById('close-error-modal');
  const textarea = document.querySelector('.post-text');

  addPostBtn.addEventListener('click', handleAddPost);
  
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPost();
    }
  });

  confirmBtn.addEventListener('click', handleManualCoordsConfirm);
    
  cancelBtn.addEventListener('click', () => {
    toggleModal('manual-coords-modal', false);
    document.getElementById('manual-coords-input').value = '';
  });

  closeErrorBtn.addEventListener('click', () => {
    toggleModal('error-modal', false);
  });
}