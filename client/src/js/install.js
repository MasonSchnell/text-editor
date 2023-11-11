const butInstall = document.getElementById("buttonInstall");
// Logic for installing the PWA

window.addEventListener("beforeinstallprompt", (event) => {
  try {
    window.deferredPrompt = event;

    butInstall.classList.toggle("hidden", false);
  } catch (error) {
    console.error("Error:", error);
  }
});

butInstall.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
      return;
    }

    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
  } catch (error) {
    console.error("Error:", error);
  }
});

window.addEventListener("appinstalled", (event) => {
  // Clear prompt
  window.deferredPrompt = null;
  butInstall.style.display = "none";
});
