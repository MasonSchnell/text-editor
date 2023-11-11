const butInstall = document.getElementById("buttonInstall");
console.log(butInstall);
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  try {
    console.log("beforeinstallprompt event triggered");
    //   event.preventDefault();
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle("hidden", false);
  } catch (error) {
    console.error("Error:", error);
  }
});

// TODO: Implement a click event handler on the `butInstall` element
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

    // butInstall.classList.toggle("hidden", true);
    butInstall.style.display = "none";
  } catch (error) {
    console.error("Error:", error);
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  //   event.preventDefault();
  console.log("App installed");
  // Clear prompt
  window.deferredPrompt = null;
});
