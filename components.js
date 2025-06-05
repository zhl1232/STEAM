// 更新状态栏时间
function updateStatusBarTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // 格式化时间
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    
    document.querySelectorAll('.status-bar-time').forEach(el => {
        el.textContent = `${hours}:${minutes}`;
    });
}

// 初始化状态栏
function initStatusBar() {
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
    
    // 设置电池和信号图标
    document.querySelectorAll('.status-bar-battery').forEach(el => {
        el.innerHTML = '<i class="fas fa-battery-full"></i> 100%';
    });
    
    document.querySelectorAll('.status-bar-signal').forEach(el => {
        el.innerHTML = '<i class="fas fa-signal"></i> <i class="fas fa-wifi"></i>';
    });
}

// 初始化底部导航栏
function initTabBar(activeTab) {
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    
    if (activeTab) {
        document.querySelector(`.tab-item[data-tab="${activeTab}"]`).classList.add('active');
    }
}

// 页面加载完成后初始化组件
document.addEventListener('DOMContentLoaded', function() {
    initStatusBar();
    
    // 获取当前页面名称
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    initTabBar(pageName);
    
    // 添加底部导航栏点击事件
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            window.location.href = `${tabName}.html`;
        });
    });
}); 