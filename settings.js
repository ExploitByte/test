document.addEventListener('DOMContentLoaded', () => {
    const resetPasswordButton = document.getElementById('reset-password-btn');
    const changeWallpaperButton = document.getElementById('change-wallpaper-btn');
    const resetPasswordPopup = document.getElementById('reset-password-popup');
    const changeWallpaperPopup = document.getElementById('change-wallpaper-popup');
    const closePasswordPopupButton = document.getElementById('popup-close-btn');
    const closeWallpaperPopupButton = document.getElementById('popup-close-wallpaper-btn');
    const savePasswordButton = document.getElementById('save-password-btn');
    const saveWallpaperButton = document.getElementById('save-wallpaper-btn');
    const wallpaperInput = document.getElementById('wallpaper-input');

    // Apply saved wallpaper when the page loads
    const savedBackground = localStorage.getItem('app-background');
    if (savedBackground) {
        document.documentElement.style.setProperty('--app-background', `url(${savedBackground})`);
    }

    // Open Reset Password popup
    resetPasswordButton.addEventListener('click', () => {
        resetPasswordPopup.style.display = 'flex';
    });

    // Open Change Wallpaper popup
    changeWallpaperButton.addEventListener('click', () => {
        changeWallpaperPopup.style.display = 'flex';
    });

    // Close Reset Password popup
    closePasswordPopupButton.addEventListener('click', () => {
        resetPasswordPopup.style.display = 'none';
    });

    // Close Change Wallpaper popup
    closeWallpaperPopupButton.addEventListener('click', () => {
        changeWallpaperPopup.style.display = 'none';
    });

    // Save new password (dummy function for demo)
    savePasswordButton.addEventListener('click', () => {
        const newPassword = document.getElementById('new-password').value;
        if (newPassword) {
            alert('Password changed successfully');
            resetPasswordPopup.style.display = 'none';
        } else {
            alert('Please enter a new password');
        }
    });

    // Save new wallpaper
    saveWallpaperButton.addEventListener('click', () => {
        const file = wallpaperInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const backgroundUrl = e.target.result;
                document.documentElement.style.setProperty('--app-background', `url(${backgroundUrl})`);
                localStorage.setItem('app-background', backgroundUrl);
                changeWallpaperPopup.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please choose a wallpaper');
        }
    });
});
