const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior, which is showing the browser's install prompt
    event.preventDefault();

    // Store the event for later use
    deferredPrompt = event;

    // TODO: Show your custom install button or trigger installation in your UI
    // For example, you can display a button with an ID 'butInstall'
    const butInstall = document.getElementById('butInstall');
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Check if the deferredPrompt is available
    if (deferredPrompt) {
        // Show the browser's install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;

        // Check the result of the user's choice
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Reset the deferredPrompt variable
        deferredPrompt = null;
    }
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // TODO: Perform any additional actions after the app is successfully installed
    console.log('App installed successfully!', event);
});
