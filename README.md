          
# 实时工资计算器

![实时工资计算器](https://img.shields.io/badge/版本-1.0-gold) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📝 项目介绍

实时工资计算器是一个华丽的金色主题网页应用，能够按秒实时计算和展示您的工资收入。只需输入您的月薪、工作天数和上下班时间，应用将立即开始计算您每一秒钟赚取的金额，并以精美的动画效果展示。

## ✨ 特色功能

- **实时计算**：按秒更新您的工资收入
- **华丽金色主题**：尊贵的金色设计，一看就很有钱
- **金币爆发效果**：每当累计金额达到10的倍数时，屏幕上会爆发金币雨
- **多重视觉效果**：金色闪光、金币爆炸、数字脉冲等多种动画
- **响应式设计**：完美适配各种屏幕尺寸
- **简单易用**：直观的界面，输入几个数字即可开始使用

## 🚀 在线体验

访问 [实时工资计算器](https://kev1nl33.github.io/) 立即体验！

## 📋 使用说明

1. 在输入框中填写您的**月薪**（元）
2. 输入您每月的**工作天数**
3. 选择您的**上班时间**
4. 选择您的**下班时间**
5. 点击"**开始计算**"按钮
6. 观看您的财富实时增长，享受金币爆发的视觉盛宴！

## 💰 计算原理

应用基于以下公式计算您的实时收入：

- **日薪** = 月薪 ÷ 每月工作天数
- **时薪** = 日薪 ÷ 每日工作小时数
- **秒薪** = 时薪 ÷ 3600

系统会每秒更新一次您的收入，并在金额达到10的倍数时触发金币爆发特效。

## 🔧 技术实现

- **前端**：纯HTML5、CSS3和原生JavaScript
- **动画**：CSS动画和JavaScript DOM操作
- **响应式**：媒体查询确保在各种设备上的良好体验
- **无依赖**：不依赖任何外部库或框架，加载迅速

## 📁 项目结构

```
├── index.html      # 主HTML文件
├── style.css       # 样式表文件
├── script.js       # JavaScript脚本文件
└── README.md       # 项目说明文档
```

## 🎨 自定义

您可以通过修改`style.css`文件中的CSS变量来自定义应用的外观：

```css
:root {
    --gold-primary: #FFD700;    /* 主要金色 */
    --gold-secondary: #FFC107;   /* 次要金色 */
    --gold-dark: #B8860B;        /* 深金色 */
    --gold-light: #FFECB3;       /* 浅金色 */
    --dark-bg: #1A1A1A;          /* 深色背景 */
    --text-color: #FFFFFF;       /* 文字颜色 */
}
```

## 📱 兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 16+

## 📝 许可证

[MIT](https://opensource.org/licenses/MIT)

## 🙏 致谢

感谢所有为此项目提供反馈和建议的用户！

---

💼 **享受计算您的财富增长的过程吧！** 💰
        
