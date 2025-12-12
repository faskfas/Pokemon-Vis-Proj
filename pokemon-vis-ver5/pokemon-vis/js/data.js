// 全局数据存储
window.pokemonData = [];
window.abilities = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

// 加载数据
fetch('../Pokemon.json') 
    .then(response => {
        if (!response.ok) {
            throw new Error(`数据加载失败（状态码：${response.status}），请检查Pokemon.json是否存在`);
        }
        return response.json().catch(() => {
            throw new Error('JSON格式错误，请检查文件内容');
        });
    })
    .then(fetchedData => {
        if (!Array.isArray(fetchedData)) {
            throw new Error('数据必须是数组格式');
        }
        // 过滤有效数据
        window.pokemonData = fetchedData.filter(p => {
            if (typeof p !== 'object' || p === null) return false;
            if (!p["Type 1"] || typeof p["Type 1"] !== 'string') return false;
            return window.abilities.every(ab => !isNaN(Number(p[ab])));
        });
        // 兜底数据
        if (window.pokemonData.length === 0) {
            console.warn('使用测试数据');
            window.pokemonData = [{
                "Name": "测试宝可梦",
                "#": 1,
                "Type 1": "Fire",
                "Type 2": "Flying",
                "HP": 50, "Attack": 60, "Defense": 70,
                "Sp. Atk": 80, "Sp. Def": 90, "Speed": 100,
                "Total": 450, "Generation": 1, "Legendary": false
            }];
        }
        window.dispatchEvent(new Event('dataLoaded'));
    })
    .catch(error => {
        console.error('数据错误：', error);
        alert(error.message);
    });