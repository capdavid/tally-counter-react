// Helper function to determine if a color is light or dark
const isLightColor = (hexColor) => {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
};

// Centralized badge color configuration - returns [badgeColor, textColor]
export const getBadgeColor = index => {
    let badgeColor;
    
    switch (index) {
        case 0:
            badgeColor = '#0090f0';
            break;
        case 1:
            badgeColor = '#2ab580';
            break;
        case 2:
            badgeColor = '#e6399e';
            break;
        case 3:
            badgeColor = '#ff9500';
            break;
        case 4:
            badgeColor = '#bf00ff';
            break;
        case 5:
            badgeColor = '#ff6b35';
            break;
        case 6:
            badgeColor = '#4ecdc4';
            break;
        case 7:
            badgeColor = '#45b7d1';
            break;
        case 8:
            badgeColor = '#f9ca24';
            break;
        case 9:
            badgeColor = '#6c5ce7';
            break;
        case 10:
            badgeColor = '#fd79a8';
            break;
        case 11:
            badgeColor = '#00b894';
            break;
        case 'err':
            badgeColor = '#f00';
            break;
        default:
            badgeColor = '#808080';
            break;
    }
    
    // Return tuple: [badgeColor, textColor]
    const textColor = isLightColor(badgeColor) ? '#000' : '#fff';
    return [badgeColor, textColor];
};
