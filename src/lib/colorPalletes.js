const colorPalettes = {
    default: {
        gradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 0)',
        textColor: '#334155',
        borderColor: '#e2e8f0'
    },
    gray: {
        gradient: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 0)',
        textColor: '#374151',
        borderColor: '#d1d5db'
    },
    brown: {
        gradient: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 0)',
        textColor: '#9a3412',
        borderColor: '#fdba74'
    },
    orange: {
        gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 0)',
        textColor: '#c2410c',
        borderColor: '#fb923c'
    },
    yellow: {
        gradient: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 0)',
        textColor: '#a16207',
        borderColor: '#fde047'
    },
    green: {
        gradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 0)',
        textColor: '#166534',
        borderColor: '#86efac'
    },
    blue: {
        gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 0)',
        textColor: '#1e40af',
        borderColor: '#93c5fd'
    },
    purple: {
        gradient: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 0)',
        textColor: '#7c3aed',
        borderColor: '#c4b5fd'
    },
    pink: {
        gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 0)',
        textColor: '#be185d',
        borderColor: '#f9a8d4'
    },
    red: {
        gradient: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 0)',
        textColor: '#dc2626',
        borderColor: '#fca5a5'
    }
};

export function getColorStyle(colorName) {
    const normalizedColor = colorName?.toLowerCase() || 'default';
    const palette = colorPalettes[normalizedColor] || colorPalettes.default;

    return `background: ${palette.gradient}; color: ${palette.textColor}; border-color: ${palette.borderColor};`;
}