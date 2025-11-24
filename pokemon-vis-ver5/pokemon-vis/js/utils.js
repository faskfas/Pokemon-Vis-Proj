// 属性颜色映射（宝可梦官方配色）
window.getTypeColor = function(type) {
    const colorMap = {
        Grass: '#78C850', Fire: '#F08030', Water: '#6890F0', Electric: '#F8D030',
        Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0', Ground: '#E0C068',
        Flying: '#A890F0', Psychic: '#F85888', Bug: '#A8B820', Rock: '#B8A038',
        Ghost: '#705898', Dragon: '#7038F8', Dark: '#705848', Steel: '#B8B8D0',
        Fairy: '#EE99AC', 无: '#888888'
    };
    return colorMap[type] || '#888888';
};

// 箱线图数据计算
window.calculateBoxplotData = function(data) {
    if (!Array.isArray(data) || data.length === 0) return [0, 0, 0, 0, 0];
    const validData = data.filter(v => typeof v === 'number' && !isNaN(v));
    if (validData.length === 0) return [0, 0, 0, 0, 0];
    const sorted = [...validData].sort((a, b) => a - b);
    const n = sorted.length;
    return [
        sorted[0],
        sorted[Math.floor(n * 0.25)],
        sorted[Math.floor(n * 0.5)],
        sorted[Math.floor(n * 0.75)],
        sorted[n - 1]
    ];
};

// 皮尔逊相关系数
window.pearsonCorrelation = function(x, y) {
    if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length || x.length < 2) return 0;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumX2 = x.reduce((a, b) => a + b **2, 0);
    const sumY2 = y.reduce((a, b) => a + b** 2, 0);
    const denominator = Math.sqrt((x.length * sumX2 - sumX **2) * (x.length * sumY2 - sumY** 2));
    return denominator === 0 ? 0 : (x.length * sumXY - sumX * sumY) / denominator;
};