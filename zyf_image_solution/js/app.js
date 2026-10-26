/**
 * 《高级网页设计I》图像解决方案 —— 页面交互逻辑
 * 姓名：张耀夫  学号：24001010903  缩写：zyf
 * 原生 JavaScript，变量名以 zyf_ 开头
 */

(function () {
    // ========== 导航数据配置 ==========
    var zyf_tabData = [
        { id: "home",     label: "首页",    icon: "zyf_icon_home" },
        { id: "category", label: "分类",    icon: "zyf_icon_category" },
        { id: "publish",  label: "发布",    icon: "zyf_icon_publish", isCenter: true },
        { id: "message",  label: "消息",    icon: "zyf_icon_message", badge: 5 },
        { id: "mine",     label: "我的",    icon: "zyf_icon_mine" }
    ];

    // 分类 —— 三级导航数据
    var zyf_categoryData = [
        {
            name: "图片编辑",
            icon: "zyf_icon_filter",
            sub: ["基础调整", "裁剪旋转", "文字叠加", "边框装饰"]
        },
        {
            name: "AI 修图",
            icon: "zyf_icon_retouch",
            sub: ["智能抠图", "人像精修", "老照片修复", "AI 扩图"]
        },
        {
            name: "裁剪调整",
            icon: "zyf_icon_crop",
            sub: ["比例裁剪", "自由裁剪", "拉直矫正", "画布扩展"]
        },
        {
            name: "颜色调整",
            icon: "zyf_icon_color",
            sub: ["饱和度", "色温", "色调分离", "调色板"]
        },
        {
            name: "亮度对比度",
            icon: "zyf_icon_brightness",
            sub: ["曝光", "高光", "阴影", "灰度"]
        },
        {
            name: "滤镜特效",
            icon: "zyf_icon_contrast",
            sub: ["复古风", "胶片风", "赛博朋克", "小清新"]
        }
    ];

    // 发布二级菜单
    var zyf_publishData = [
        { label: "上传图片", icon: "zyf_icon_filter" },
        { label: "拍照",     icon: "zyf_icon_retouch" },
        { label: "从相册",   icon: "zyf_icon_crop" },
        { label: "AI 生成",  icon: "zyf_icon_brightness" }
    ];

    // ========== 工具函数 ==========
    function zyf_el(tag, className, html) {
        var el = document.createElement(tag);
        if (className) el.className = className;
        if (html !== undefined) el.innerHTML = html;
        return el;
    }

    function zyf_toast(msg) {
        var t = document.querySelector(".zyf_toast");
        if (!t) {
            t = zyf_el("div", "zyf_toast");
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.add("zyf_show");
        clearTimeout(t._zyf_timer);
        t._zyf_timer = setTimeout(function () {
            t.classList.remove("zyf_show");
        }, 1800);
    }

    // ========== 渲染顶部导航 ==========
    function zyf_renderHeader() {
        var header = zyf_el("header", "zyf_header");
        header.innerHTML =
            '<div class="zyf_header_top">' +
            '  <div>' +
            '    <div class="zyf_header_title">图像解决方案</div>' +
            '    <div class="zyf_header_subtitle">张耀夫 · 大连东软信息学院</div>' +
            '  </div>' +
            '</div>' +
            '<div class="zyf_header_search">' +
            '  <span class="zyf_icon zyf_icon_back" style="display:none"></span>' +
            '  <input type="text" placeholder="搜索作品、标签、功能...">' +
            '</div>';
        return header;
    }

    // ========== 渲染页面内容 ==========
    function zyf_renderPage(pageId) {
        var page = zyf_el("main", "zyf_page");

        if (pageId === "home") {
            // 首页：精选作品网格
            var card1 = zyf_el("section", "zyf_card");
            card1.innerHTML =
                '<div class="zyf_card_title">精选作品</div>' +
                '<div class="zyf_work_grid">' +
                '  <div class="zyf_work_item" onclick="zyf_toast(\'打开作品 1\')"><div class="zyf_work_cover zyf_work_cover--1">作品 01</div><div class="zyf_work_info"><span>渐变梦境</span><span>♥ 128</span></div></div>' +
                '  <div class="zyf_work_item" onclick="zyf_toast(\'打开作品 2\')"><div class="zyf_work_cover zyf_work_cover--2">作品 02</div><div class="zyf_work_info"><span>粉紫幻想</span><span>♥ 96</span></div></div>' +
                '  <div class="zyf_work_item" onclick="zyf_toast(\'打开作品 3\')"><div class="zyf_work_cover zyf_work_cover--3">作品 03</div><div class="zyf_work_info"><span>青色海岸</span><span>♥ 210</span></div></div>' +
                '  <div class="zyf_work_item" onclick="zyf_toast(\'打开作品 4\')"><div class="zyf_work_cover zyf_work_cover--4">作品 04</div><div class="zyf_work_info"><span>翠绿森林</span><span>♥ 73</span></div></div>' +
                '  <div class="zyf_work_item" onclick="zyf_toast(\'打开作品 5\')"><div class="zyf_work_cover zyf_work_cover--5">作品 05</div><div class="zyf_work_info"><span>夕阳暖调</span><span>♥ 154</span></div></div>' +
                '  <div class="zyf_work_item" onclick="zyf_toast(\'打开作品 6\')"><div class="zyf_work_cover zyf_work_cover--6">作品 06</div><div class="zyf_work_info"><span>紫粉银河</span><span>♥ 187</span></div></div>' +
                '</div>';
            page.appendChild(card1);

            // 项目信息卡
            var card2 = zyf_el("section", "zyf_card");
            card2.innerHTML =
                '<div class="zyf_card_title">项目信息</div>' +
                '<div class="zyf_info_list">' +
                '  <div class="zyf_info_row"><span class="zyf_info_key">项目</span><span class="zyf_info_val">图像解决方案</span></div>' +
                '  <div class="zyf_info_row"><span class="zyf_info_key">姓名</span><span class="zyf_info_val">张耀夫</span></div>' +
                '  <div class="zyf_info_row"><span class="zyf_info_key">学号</span><span class="zyf_info_val">24001010903</span></div>' +
                '  <div class="zyf_info_row"><span class="zyf_info_key">学校</span><span class="zyf_info_val">大连东软信息学院</span></div>' +
                '  <div class="zyf_info_row"><span class="zyf_info_key">技术栈</span><span class="zyf_info_val">原生 HTML / CSS / JS</span></div>' +
                '</div>';
            page.appendChild(card2);
        }

        if (pageId === "category") {
            var card = zyf_el("section", "zyf_card");
            card.innerHTML = '<div class="zyf_card_title">图片分类工具</div>';
            var list = zyf_el("div", "zyf_category_list");

            for (var zyf_i = 0; zyf_i < zyf_categoryData.length; zyf_i++) {
                var cat = zyf_categoryData[zyf_i];
                var item = zyf_el("div", "zyf_category_item zyf_category_item_main",
                    '<span class="zyf_icon ' + cat.icon + '"></span>' +
                    '<span class="zyf_category_label">' + cat.name + '</span>' +
                    '<span class="zyf_category_sub">' + cat.sub.length + ' 项</span>' +
                    '<span class="zyf_icon zyf_icon_arrow zyf_category_arrow"></span>');
                item._zyf_sub = cat.sub;
                item._zyf_open = false;

                item.addEventListener("click", function () {
                    var arrow = this.querySelector(".zyf_category_arrow");
                    var sub = this.parentNode.querySelector(".zyf_sub_category[data-for='" + this._zyf_sub_id + "']");
                    // 实际切换逻辑
                    var self = this;
                    var openState = !self._zyf_open;
                    self._zyf_open = openState;
                    arrow.classList.toggle("zyf_expanded", openState);
                    // 同时只有一个展开
                    var allCats = document.querySelectorAll(".zyf_category_item");
                    var allSubs = document.querySelectorAll(".zyf_sub_category");
                    for (var c = 0; c < allCats.length; c++) {
                        allCats[c]._zyf_open = false;
                        allCats[c].querySelector(".zyf_category_arrow").classList.remove("zyf_expanded");
                    }
                    self._zyf_open = openState;
                    arrow.classList.toggle("zyf_expanded", openState);
                    for (var s = 0; s < allSubs.length; s++) {
                        allSubs[s].classList.remove("zyf_show");
                    }
                    if (openState && sub) sub.classList.add("zyf_show");
                });

                // 三级子菜单渲染
                var subWrap = zyf_el("div", "zyf_sub_category");
                subWrap.innerHTML = "<ul></ul>";
                var ul = subWrap.querySelector("ul");
                for (var zyf_s = 0; zyf_s < cat.sub.length; zyf_s++) {
                    var li = zyf_el("li", "", cat.sub[zyf_s]);
                    li.addEventListener("click", function (e) {
                        e.stopPropagation();
                        zyf_toast("选择：" + this.textContent);
                    });
                    ul.appendChild(li);
                }

                list.appendChild(item);
                list.appendChild(subWrap);

                // 让 item 和 sub 关联（通过下一个兄弟节点）
                item._zyf_sub_id = "sub_" + zyf_i;
                subWrap.setAttribute("data-for", item._zyf_sub_id);
            }

            card.appendChild(list);
            page.appendChild(card);
        }

        if (pageId === "message") {
            var msgCard = zyf_el("section", "zyf_card");
            msgCard.innerHTML =
                '<div class="zyf_card_title">最新消息</div>' +
                '<div class="zyf_category_item">' +
                '  <span class="zyf_icon zyf_icon_message"></span>' +
                '  <span class="zyf_category_label">系统通知</span>' +
                '  <span class="zyf_category_sub">2 分钟前</span>' +
                '</div>' +
                '<div class="zyf_category_item">' +
                '  <span class="zyf_icon zyf_icon_heart"></span>' +
                '  <span class="zyf_category_label">点赞我的作品</span>' +
                '  <span class="zyf_category_sub">3 人点赞</span>' +
                '</div>' +
                '<div class="zyf_category_item">' +
                '  <span class="zyf_icon zyf_icon_retouch"></span>' +
                '  <span class="zyf_category_label">AI 修复已完成</span>' +
                '  <span class="zyf_category_sub">1 小时前</span>' +
                '</div>';
            page.appendChild(msgCard);
        }

        if (pageId === "mine") {
            var mineCard = zyf_el("section", "zyf_card");
            mineCard.innerHTML =
                '<div class="zyf_card_title">个人中心</div>' +
                '<div class="zyf_category_item">' +
                '  <span class="zyf_icon zyf_icon_mine"></span>' +
                '  <span class="zyf_category_label">我的作品</span>' +
                '  <span class="zyf_category_sub">6 件</span>' +
                '</div>' +
                '<div class="zyf_category_item">' +
                '  <span class="zyf_icon zyf_icon_filter"></span>' +
                '  <span class="zyf_category_label">收藏</span>' +
                '  <span class="zyf_category_sub">18 项</span>' +
                '</div>' +
                '<div class="zyf_category_item">' +
                '  <span class="zyf_icon zyf_icon_crop"></span>' +
                '  <span class="zyf_category_label">历史记录</span>' +
                '  <span class="zyf_category_sub">最近 7 天</span>' +
                '</div>';
            page.appendChild(mineCard);
        }

        return page;
    }

    // ========== 渲染底部导航栏 ==========
    function zyf_renderTabbar() {
        var tabbar = zyf_el("nav", "zyf_tabbar");
        var main = zyf_el("div", "zyf_tabbar_main");

        for (var zyf_i = 0; zyf_i < zyf_tabData.length; zyf_i++) {
            var t = zyf_tabData[zyf_i];
            var tabClass = "zyf_tab" + (t.isCenter ? " zyf_tab--publish" : "");
            var tab = zyf_el("div", tabClass);
            tab.setAttribute("data-tab", t.id);

            var html = '<span class="zyf_icon ' + t.icon + '"></span>' +
                       '<span class="zyf_tab_label">' + t.label + '</span>';
            if (t.isCenter) html = '<span class="zyf_icon ' + t.icon + '"></span>';
            if (t.badge) html += '<span class="zyf_tab_badge">' + t.badge + '</span>';

            tab.innerHTML = html;
            if (zyf_i === 0) tab.classList.add("zyf_active");
            main.appendChild(tab);
        }

        tabbar.appendChild(main);

        // 发布二级弹出菜单
        var secondary = zyf_el("div", "zyf_tabbar_secondary");
        secondary.innerHTML =
            '<div class="zyf_tabbar_secondary_handle"></div>' +
            '<div class="zyf_tabbar_secondary_title">' +
            '  <span>选择发布方式</span>' +
            '  <button data-action="cancel">取消</button>' +
            '</div>';
        var secGrid = zyf_el("div", "zyf_secondary_grid");
        for (var zyf_j = 0; zyf_j < zyf_publishData.length; zyf_j++) {
            var p = zyf_publishData[zyf_j];
            var item = zyf_el("div", "zyf_secondary_item");
            item.innerHTML = '<span class="zyf_icon ' + p.icon + '"></span>' + p.label;
            item.addEventListener("click", function () {
                zyf_toast("触发：" + this.textContent.trim());
                zyf_closeSecondary();
            });
            secGrid.appendChild(item);
        }
        secondary.appendChild(secGrid);
        tabbar.appendChild(secondary);

        // 遮罩
        var mask = zyf_el("div", "zyf_mask");
        mask.addEventListener("click", zyf_closeSecondary);
        document.body.appendChild(mask);
        document.body.appendChild(tabbar);

        // 绑定 tab 切换
        main.addEventListener("click", function (e) {
            var tab = e.target.closest(".zyf_tab");
            if (!tab) return;
            var id = tab.getAttribute("data-tab");

            if (id === "publish") {
                zyf_openSecondary();
                return;
            }
            // 激活状态
            var allTabs = main.querySelectorAll(".zyf_tab");
            for (var a = 0; a < allTabs.length; a++) allTabs[a].classList.remove("zyf_active");
            tab.classList.add("zyf_active");
            zyf_switchPage(id);
        });

        secondary.querySelector('[data-action="cancel"]').addEventListener("click", zyf_closeSecondary);

        return tabbar;
    }

    function zyf_openSecondary() {
        var sec = document.querySelector(".zyf_tabbar_secondary");
        var mask = document.querySelector(".zyf_mask");
        if (sec) sec.classList.add("zyf_show");
        if (mask) mask.classList.add("zyf_show");
    }
    function zyf_closeSecondary() {
        var sec = document.querySelector(".zyf_tabbar_secondary");
        var mask = document.querySelector(".zyf_mask");
        if (sec) sec.classList.remove("zyf_show");
        if (mask) mask.classList.remove("zyf_show");
    }

    // ========== 页面切换 ==========
    function zyf_switchPage(pageId) {
        var content = document.querySelector(".zyf_app");
        var oldPage = content.querySelector(".zyf_page");
        var newPage = zyf_renderPage(pageId);
        if (oldPage) content.replaceChild(newPage, oldPage);
        else content.appendChild(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ========== 初始化 ==========
    function zyf_init() {
        var app = document.querySelector(".zyf_app");
        if (!app) return;

        app.appendChild(zyf_renderHeader());
        app.appendChild(zyf_renderPage("home"));
        zyf_renderTabbar();

        console.log("[zyf] 图像解决方案 页面初始化完成");
    }

    document.addEventListener("DOMContentLoaded", zyf_init);
})();
