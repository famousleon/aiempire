// ==========================================
// AI Empire - Proof Upload System
// ==========================================

const ProofManager = (() => {
  const STORAGE_KEY = 'aiempire_proofs';

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
      const limitedProofs = proofs.slice(0, 20).map(p => ({
        ...p,
        // Resize image for storage
        image: p.image.length > 500000 ? resizeImage(p.image) : p.image,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedProofs));
    } catch (e) {
      // If storage is full, remove oldest proofs
      if (proofs.length > 5) {
        proofs = proofs.slice(0, 5);
        save();
      }
    }
  }

  function resizeImage(dataUrl, maxWidth = 400) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
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
