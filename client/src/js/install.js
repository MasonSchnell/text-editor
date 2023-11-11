const butInstall = document.getElementById("buttonInstall");
console.log(butInstall);
// Logic for installing the PWA

window.addEventListener("beforeinstallprompt", (event) => {
  try {
    console.log("beforeinstallprompt event triggered");

    window.deferredPrompt = event;

    butInstall.classList.toggle("hidden", false);
  } catch (error) {
    console.error("Error:", error);
  }
});

butInstall.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    console.log("Install button clicked");
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
  console.log("App installed");
  // Clear prompt
  window.deferredPrompt = null;
  butInstall.style.display = "none";
});
