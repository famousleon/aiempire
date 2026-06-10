// ==========================================
// AI Empire - Proof Upload System
// ==========================================

const ProofManager = (() => {
  const STORAGE_KEY = 'aiempire_proofs';
  const MAX_PROOFS = 10; // Max proofs to store (localStorage ~5-10MB limit)
  const RESIZE_MAX = 200; // Max width/height for thumbnails
  const RESIZE_QUALITY = 0.5; // JPEG quality (0.5 = ~50% of original quality)
  const MAX_SINGLE_SIZE = 200000; // ~200KB per image after resize

  let proofs = [];
  let selectedTask = null;
  let uploadedImage = null;

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        proofs = JSON.parse(saved);
      } catch (e) {
        proofs = [];
      }
    }
  }

  function getProofs() {
    return proofs;
  }

  function setTask(task) {
    selectedTask = task;
  }

  function getSelectedTask() {
    return selectedTask;
  }

  function setImage(dataUrl) {
    uploadedImage = dataUrl;
  }

  function getImage() {
    return uploadedImage;
  }

  function clearImage() {
    uploadedImage = null;
  }

  function submit(description = '') {
    if (!selectedTask || !uploadedImage) return false;

    const proof = {
      id: 'proof-' + Date.now(),
      taskId: selectedTask.id,
      taskName: selectedTask.name,
      taskEmoji: selectedTask.emoji,
      taskCategory: selectedTask.category,
      image: uploadedImage,
      description,
      date: new Date().toISOString(),
      timestamp: Date.now(),
    };

    proofs.unshift(proof);
    save();

    // Clear selection
    selectedTask = null;
    uploadedImage = null;

    return proof;
  }

  function deleteProof(proofId) {
    proofs = proofs.filter(p => p.id !== proofId);
    save();
  }

  function getProofCount() {
    return proofs.length;
  }

  function save() {
    try {
      // Limit stored proofs to avoid localStorage overflow
      const limitedProofs = proofs.slice(0, MAX_PROOFS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedProofs));
    } catch (e) {
      // If storage is full, remove oldest proofs until it fits
      while (proofs.length > 3) {
        proofs.pop(); // Remove oldest
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(proofs.slice(0, 3)));
          return;
        } catch (e2) {
          // Still too full, keep removing
        }
      }
      // If even 3 won't fit, localStorage is critically full
      console.warn('localStorage critically full, proofs not saved');
    }
  }

  function resizeImage(dataUrl, maxWidth = RESIZE_MAX, quality = RESIZE_QUALITY) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(dataUrl); // Fallback: return original
      img.src = dataUrl;
    });
  }

  init();

  return {
    getProofs,
    setTask,
    getSelectedTask,
    setImage,
    getImage,
    clearImage,
    submit,
    deleteProof,
    getProofCount,
  };
})();
