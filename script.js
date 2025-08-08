document.addEventListener('DOMContentLoaded', () => {
    const monthlySalaryInput = document.getElementById('monthly-salary');
    const workDaysInput = document.getElementById('work-days');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const startBtn = document.getElementById('start-btn');
    const resultSection = document.getElementById('result-section');
    const moneyCounter = document.getElementById('money-counter');
    const todaySalary = document.getElementById('today-salary');
    const hourlyRate = document.getElementById('hourly-rate');
    const secondRate = document.getElementById('second-rate');
    const coinsContainer = document.getElementById('coins-container');
    
    // 创建金色闪光元素
    const goldFlash = document.createElement('div');
    goldFlash.classList.add('gold-flash');
    document.body.appendChild(goldFlash);
    
    let isCalculating = false;
    let calculationInterval;
    let currentMoney = 0;
    let lastCoinDrop = 0;
    
    // 格式化金额显示
    function formatMoney(amount) {
        return amount.toFixed(2);
    }
    
    // 创建金币元素
    function createCoin() {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        
        // 随机位置
        const posX = Math.random() * window.innerWidth;
        coin.style.left = `${posX}px`;
        
        // 随机动画持续时间
        const duration = 1 + Math.random() * 2;
        coin.style.animation = `coinFall ${duration}s linear forwards`;
        
        coinsContainer.appendChild(coin);
        
        // 动画结束后移除金币
        setTimeout(() => {
            coin.remove();
        }, duration * 1000);
    }
    
    // 创建多个金币
    function createCoins(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createCoin();
            }, i * 100);
        }
    }
    
    // 创建爆炸金币效果
    function createCoinExplosion(x, y, count) {
        const explosionContainer = document.createElement('div');
        explosionContainer.classList.add('coin-explosion');
        document.body.appendChild(explosionContainer);
        
        for (let i = 0; i < count; i++) {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            
            // 设置初始位置在爆炸中心
            coin.style.position = 'absolute';
            coin.style.left = `${x}px`;
            coin.style.top = `${y}px`;
            
            // 随机方向和距离
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 150;
            const xEnd = Math.cos(angle) * distance;
            const yEnd = Math.sin(angle) * distance;
            const rotation = Math.random() * 720 - 360; // -360到360度的随机旋转
            
            // 设置CSS变量用于动画
            coin.style.setProperty('--x-end', `${xEnd}px`);
            coin.style.setProperty('--y-end', `${yEnd}px`);
            coin.style.setProperty('--rotation', `${rotation}deg`);
            
            // 随机大小
            const size = 20 + Math.random() * 20;
            coin.style.width = `${size}px`;
            coin.style.height = `${size}px`;
            
            // 随机动画持续时间
            const duration = 0.8 + Math.random() * 1.2;
            coin.style.animation = `coinExplosion ${duration}s ease-out forwards`;
            
            explosionContainer.appendChild(coin);
        }
        
        // 一段时间后移除爆炸容器
        setTimeout(() => {
            explosionContainer.remove();
        }, 2000);
    }
    
    // 显示金额里程碑
    function showMilestone(amount) {
        const milestone = document.createElement('div');
        milestone.classList.add('money-milestone');
        milestone.textContent = `¥${amount}!`;
        
        // 随机位置
        const posX = 100 + Math.random() * (window.innerWidth - 200);
        const posY = 100 + Math.random() * (window.innerHeight - 200);
        
        milestone.style.left = `${posX}px`;
        milestone.style.top = `${posY}px`;
        
        document.body.appendChild(milestone);
        
        // 动画结束后移除
        setTimeout(() => {
            milestone.remove();
        }, 1500);
    }
    
    // 触发金色闪光效果
    function triggerGoldFlash() {
        goldFlash.classList.add('active');
        
        setTimeout(() => {
            goldFlash.classList.remove('active');
        }, 800);
    }
    
    // 添加脉冲效果
    function addPulseEffect() {
        moneyCounter.classList.add('pulse');
        setTimeout(() => {
            moneyCounter.classList.remove('pulse');
        }, 500);
    }
    
    // 开始计算
    function startCalculation() {
        const monthlySalary = parseFloat(monthlySalaryInput.value);
        const workDays = parseInt(workDaysInput.value);
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;
        
        // 验证输入
        if (!monthlySalary || !workDays || !startTime || !endTime) {
            alert('请填写所有必填字段！');
            return;
        }
        
        // 计算工作时间（秒）
        const startTimeParts = startTime.split(':').map(Number);
        const endTimeParts = endTime.split(':').map(Number);
        
        const startSeconds = startTimeParts[0] * 3600 + startTimeParts[1] * 60;
        const endSeconds = endTimeParts[0] * 3600 + endTimeParts[1] * 60;
        
        let workSeconds;
        if (endSeconds > startSeconds) {
            workSeconds = endSeconds - startSeconds;
        } else {
            // 处理跨天情况
            workSeconds = (24 * 3600 - startSeconds) + endSeconds;
        }
        
        // 计算每秒薪资
        const dailySalary = monthlySalary / workDays;
        const hourSalary = dailySalary / (workSeconds / 3600);
        const secondSalary = hourSalary / 3600;
        
        // 显示计算结果区域
        resultSection.style.display = 'block';
        
        // 更新统计信息
        todaySalary.textContent = `¥${formatMoney(dailySalary)}`;
        hourlyRate.textContent = `¥${formatMoney(hourSalary)}`;
        secondRate.textContent = `¥${formatMoney(secondSalary)}`;
        
        // 重置计数器
        currentMoney = 0;
        moneyCounter.textContent = formatMoney(currentMoney);
        
        // 清除之前的计算
        if (calculationInterval) {
            clearInterval(calculationInterval);
        }
        
        // 开始实时计算
        isCalculating = true;
        startBtn.textContent = '停止计算';
        
        calculationInterval = setInterval(() => {
            currentMoney += secondSalary;
            moneyCounter.textContent = formatMoney(currentMoney);
            
            // 检查是否达到10的倍数
            const integerPart = Math.floor(currentMoney);
            if (integerPart > 0 && integerPart % 10 === 0 && integerPart !== lastCoinDrop) {
                lastCoinDrop = integerPart;
                
                // 触发金色闪光
                triggerGoldFlash();
                
                // 显示里程碑
                showMilestone(integerPart);
                
                // 在屏幕中央创建爆炸效果
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                createCoinExplosion(centerX, centerY, 30);
                
                // 在随机位置创建额外的爆炸效果
                for (let i = 0; i < 3; i++) {
                    const randX = Math.random() * window.innerWidth;
                    const randY = Math.random() * window.innerHeight;
                    setTimeout(() => {
                        createCoinExplosion(randX, randY, 15);
                    }, i * 200);
                }
                
                // 添加脉冲效果
                addPulseEffect();
            }
        }, 1000);
    }
    
    // 停止计算
    function stopCalculation() {
        isCalculating = false;
        startBtn.textContent = '开始计算';
        clearInterval(calculationInterval);
    }
    
    // 切换计算状态
    startBtn.addEventListener('click', () => {
        if (isCalculating) {
            stopCalculation();
        } else {
            startCalculation();
        }
    });
    
    // 添加输入验证
    monthlySalaryInput.addEventListener('input', () => {
        if (parseFloat(monthlySalaryInput.value) < 0) {
            monthlySalaryInput.value = 0;
        }
    });
    
    workDaysInput.addEventListener('input', () => {
        if (parseInt(workDaysInput.value) < 1) {
            workDaysInput.value = 1;
        } else if (parseInt(workDaysInput.value) > 31) {
            workDaysInput.value = 31;
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时导航栏高亮
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // 项目卡片动画效果
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
    
    // 技能标签动画
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
        });
    });
});