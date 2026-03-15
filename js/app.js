// Khởi tạo App
let currentProfileId = null;
let currentTab = 'wonder_weeks'; // wonder_weeks | vaccination | profiles

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Set date
    const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
    document.getElementById('nav-date').textContent = new Date().toLocaleDateString('vi-VN', options);

    // Bind Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            currentTab = target.dataset.tab;
            renderCurrentTab();
        });
    });

    const profiles = getProfiles();
    if (profiles.length > 0) {
        currentProfileId = profiles[0].id;
        renderCurrentTab();
    } else {
        currentTab = 'profiles';
        document.querySelector('[data-tab="profiles"]').click();
        renderCurrentTab();
    }
}

function renderCurrentTab() {
    const main = document.getElementById('app-content');
    main.innerHTML = ''; // Clear

    const profiles = getProfiles();
    if (profiles.length === 0 && currentTab !== 'profiles') {
        currentTab = 'profiles';
        document.querySelector('[data-tab="profiles"]').click();
    }

    if (currentTab === 'profiles') {
        renderProfilesTab(main);
    } else if (currentTab === 'wonder_weeks') {
        renderWonderWeeksTab(main);
    } else if (currentTab === 'vaccination') {
        renderVaccinationTab(main);
    }
}

// ─── Component: Trình chọn Profile ─────────────────────────────────────────
function renderProfileSelector(parent) {
    const profiles = getProfiles();
    if (profiles.length <= 1) return; // Không cần chọn nếu có 1 bé
    
    const wrapper = document.createElement('div');
    wrapper.className = 'profile-select-wrapper';
    
    const select = document.createElement('select');
    select.className = 'profile-select';
    profiles.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `👶 ${p.name}`;
        if (p.id === currentProfileId) opt.selected = true;
        select.appendChild(opt);
    });
    
    select.addEventListener('change', (e) => {
        currentProfileId = e.target.value;
        renderCurrentTab();
    });
    
    wrapper.appendChild(select);
    parent.appendChild(wrapper);
}

// ─── TAB: HỒ SƠ ────────────────────────────────────────────────────────────
function renderProfilesTab(main) {
    const profiles = getProfiles();

    const title = document.createElement('h2');
    title.textContent = "Hồ sơ em bé";
    title.style.marginBottom = "16px";
    title.style.color = "var(--accent)";
    main.appendChild(title);

    if (profiles.length === 0) {
        main.innerHTML += `
            <div class="empty-state">
                <h1>👶</h1>
                <h2>Chào mừng!</h2>
                <p>Thêm hồ sơ em bé để bắt đầu theo dõi các tuần lễ phát triển.</p>
                <button class="btn" onclick="openProfileForm()">＋ Thêm bé đầu tiên</button>
            </div>
        `;
        return;
    }

    profiles.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.style.background = p.avatar_color;
        avatar.textContent = p.name.charAt(0).toUpperCase();
        avatar.style.marginRight = '16px';
        avatar.style.marginBottom = '0';
        
        const info = document.createElement('div');
        info.style.flex = 1;
        
        const ageWeeks = getAgeWeeksFromDue(p.due_date);
        const ageStr = ageWeeks > 0 ? ageWeeksToLabel(ageWeeks) : "Chưa sinh";
        
        info.innerHTML = `
            <h3 style="margin-bottom:4px; font-size:18px;">${p.name}</h3>
            <p style="font-size:13px; color:var(--text-muted);">Tuổi: ${ageStr}</p>
        `;
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✎';
        editBtn.style.background = 'none';
        editBtn.style.border = 'none';
        editBtn.style.color = 'var(--text-muted)';
        editBtn.style.fontSize = '20px';
        editBtn.style.padding = '8px';
        editBtn.onclick = () => openProfileForm(p.id);

        card.appendChild(avatar);
        card.appendChild(info);
        card.appendChild(editBtn);
        main.appendChild(card);
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'btn';
    addBtn.innerHTML = '＋ Thêm hồ sơ bé';
    addBtn.onclick = () => openProfileForm();
    main.appendChild(addBtn);
}


// ─── FORM: THÊM / SỬA PROFILE ──────────────────────────────────────────────
const AVATAR_COLORS = [
    "#B8A9D9", "#A9C5D9", "#A9D9B8", "#D9C5A9",
    "#D9A9B8", "#C5A9D9", "#A9D9D0", "#D9D0A9",
    "#D9A9A9", "#B8D9A9"
];

function openProfileForm(profileId = null) {
    const p = profileId ? getProfileById(profileId) : null;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    let selectedColor = p ? p.avatar_color : AVATAR_COLORS[0];
    
    const colorsHtml = AVATAR_COLORS.map(c => 
        `<div class="color-circle ${c === selectedColor ? 'selected' : ''}" 
              data-color="${c}" style="background-color: ${c}"></div>`
    ).join('');

    modal.innerHTML = `
        <div class="modal-sheet">
            <h2 style="color:var(--accent); margin-bottom: 20px;">
                ${p ? 'Chỉnh sửa hồ sơ' : 'Thêm hồ sơ bé'}
            </h2>
            
            <div class="form-group">
                <label>Tên bé *</label>
                <input type="text" id="p-name" class="form-control" value="${p ? p.name : ''}" placeholder="Nhập tên bé, ví dụ: Xumi">
            </div>
            
            <div class="form-group">
                <label>Ngày sinh *</label>
                <input type="date" id="p-birth" class="form-control" value="${p ? p.birth_date : ''}">
            </div>
            
            <div class="form-group">
                <label>Ngày dự sinh (Tính Leap) *</label>
                <input type="date" id="p-due" class="form-control" value="${p ? p.due_date : ''}">
                <small style="color:var(--text-muted); display:block; margin-top:4px;">Nếu bé sinh non, chọn ngày dự sinh gốc. Nếu bình thường, hãy chọn trùng ngày sinh.</small>
            </div>
            
            <div class="form-group">
                <label>Màu đại diện</label>
                <div class="color-picker" id="p-colors">
                    ${colorsHtml}
                </div>
            </div>
            
            <div style="display:flex; gap:12px; margin-top:30px;">
                <button class="btn-secondary" style="flex:1; padding:12px; border-radius:10px; border:none; font-weight:bold" id="btn-cancel">Hủy</button>
                <button class="btn" style="flex:2;" id="btn-save">Lưu hồ sơ</button>
            </div>
            
            ${p ? `<div style="text-align:center; margin-top:16px;">
                 <button id="btn-delete" style="background:none; border:none; color:var(--danger); text-decoration:underline;">Xóa hồ sơ này</button>
            </div>` : ''}
        </div>
    `;

    document.getElementById('modal-container').appendChild(modal);

    // Color picker
    const circles = modal.querySelectorAll('.color-circle');
    circles.forEach(c => {
        c.addEventListener('click', (e) => {
            circles.forEach(el => el.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedColor = e.target.dataset.color;
        });
    });

    // Actions
    modal.querySelector('#btn-cancel').onclick = () => modal.remove();
    if(p) {
        modal.querySelector('#btn-delete').onclick = () => {
            if(confirm("Bạn có chắc chắn muốn xóa không? Dữ liệu tiêm chủng phòng sẽ mất hết.")) {
                deleteProfile(p.id);
                if(currentProfileId === p.id) {
                    const all = getProfiles();
                    currentProfileId = all.length > 0 ? all[0].id : null;
                }
                modal.remove();
                renderCurrentTab();
            }
        };
    }

    modal.querySelector('#btn-save').onclick = () => {
        const n = document.getElementById('p-name').value;
        const b = document.getElementById('p-birth').value;
        const d = document.getElementById('p-due').value;
        
        if(!n || !b || !d) {
            alert("Vui lòng nhập đủ thông tin có dấu *");
            return;
        }

        if(profileId) updateProfile(profileId, {name: n, birth_date: b, due_date: d, avatar_color: selectedColor});
        else {
            const newP = addProfile({name: n, birth_date: b, due_date: d, avatar_color: selectedColor});
            currentProfileId = newP.id;
        }
        modal.remove();
        renderCurrentTab();
    };
}


// ─── TAB: WONDER WEEKS ─────────────────────────────────────────────────────
function renderWonderWeeksTab(main) {
    if(!currentProfileId) return;
    const profile = getProfileById(currentProfileId);
    if(!profile) return;

    renderProfileSelector(main);

    // Age
    const ageWeeks = getAgeWeeksFromDue(profile.due_date);
    const currentWeekInfo = Math.floor(ageWeeks);
    
    // Hero
    const hero = document.createElement('div');
    hero.className = 'hero-card';
    const birthDateStr = new Date(profile.birth_date).toLocaleDateString('vi-VN');
    hero.innerHTML = `
        <div class="hero-avatar" style="background:${profile.avatar_color}">${profile.name.charAt(0).toUpperCase()}</div>
        <div class="hero-info">
            <h2>${profile.name}</h2>
            <p>🎂 Sinh: ${birthDateStr}</p>
            <div class="age">👶 Tuổi (từ dự sinh): ${currentWeekInfo > 0 ? ageWeeksToLabel(currentWeekInfo) : 'Chưa sinh'}</div>
        </div>
    `;
    main.appendChild(hero);

    // Current Leap Banner
    const leapsStatus = LEAPS.map(l => {
        const res = computeLeapDates(profile.due_date, l);
        return {...res, ...l};
    });
    
    const currentLeap = leapsStatus.find(l => l.status === 'current');
    const upcomingLeaps = leapsStatus.filter(l => l.status === 'upcoming').sort((a,b) => a.days_until_fussy - b.days_until_fussy);
    
    if (currentLeap) {
        const b = document.createElement('div');
        b.className = 'banner';
        b.style.background = '#4A3520';
        b.innerHTML = `
            <div class="banner-title" style="color:var(--warn-color)">🌟 ${profile.name} đang trong ${currentLeap.name}!</div>
            <div class="banner-desc" style="color:var(--warn-color)">${currentLeap.description}</div>
        `;
        main.appendChild(b);
    } else if (upcomingLeaps.length > 0) {
        const nxt = upcomingLeaps[0];
        const bdColor = nxt.days_until_fussy <= 7 ? '#3A2040' : '#1E2E30';
        const txtColor = nxt.days_until_fussy <= 7 ? 'var(--text-leap)' : 'var(--accent2)';
        const b = document.createElement('div');
        b.className = 'banner';
        b.style.background = bdColor;
        b.innerHTML = `<div class="banner-title" style="color:${txtColor}">⏳ Leap tiếp theo: ${nxt.name_vn} – còn ${nxt.days_until_fussy} ngày</div>`;
        main.appendChild(b);
    }

    // Daily Tips
    const tips = getTipsForWeek(currentWeekInfo);
    if(tips.source !== 'none') {
        let content = '';
        if(tips.source === 'leap') {
            content += `<h3 style="color:var(--accent); font-size:14px; margin-bottom:8px;">${tips.title}</h3>`;
            if(tips.doctor_advice && tips.doctor_advice.length > 0) {
                content += `<div style="margin-bottom:8px;">${tips.doctor_advice[0]}</div>`;
            }
            if(tips.tips && tips.tips.length > 0) {
                content += `<div style="font-size:13px; color:var(--text-muted)">${tips.tips[0]}</div>`;
            }
        } else {
            content += `<div style="font-size:14px;">${tips.tips[0]}</div>`;
        }

        const tipsBox = document.createElement('div');
        tipsBox.className = 'card';
        tipsBox.style.background = '#2D2248';
        tipsBox.innerHTML = `
            <div style="font-size:12px; font-weight:bold; color:var(--text-muted); margin-bottom:6px;">💡 MẸO & LỜI KHUYÊN (Tuần ${currentWeekInfo})</div>
            ${content}
        `;
        main.appendChild(tipsBox);
    }

    // Grid Chart
    const chartOut = document.createElement('div');
    chartOut.style.background = '#FFF0F3';
    chartOut.style.borderRadius = '16px';
    chartOut.style.padding = '12px';
    chartOut.style.marginBottom = '20px';
    
    chartOut.innerHTML = `
        <div style="background:#FF6B8A; color:white; padding:12px; border-radius:10px; font-weight:bold; font-size:14px; text-align:center;">
            🍼 WONDER WEEK — Tuần Khủng Hoảng
        </div>
        <div class="ww-grid" id="ww-grid-container"></div>
    `;
    main.appendChild(chartOut);

    const grid = document.getElementById('ww-grid-container');
    const cols = 7;
    const rows = Math.ceil(TOTAL_WEEKS / cols);
    
    let w = 1;
    for(let r=0; r<rows; r++) {
        for(let c=0; c<cols; c++) {
            if(w > TOTAL_WEEKS) break;
            
            const moodId = WEEK_MOOD_MAP[w] || 1;
            const mood = MOOD_LEVELS[moodId];
            const isCurr = w === currentWeekInfo;
            
            const cell = document.createElement('div');
            cell.className = `ww-cell ${isCurr ? 'current' : ''}`;
            cell.style.background = mood.color;
            if(!isCurr) cell.style.border = '1px solid #F5D0D8';
            
            cell.innerHTML = `
                <div class="ww-wk" style="color:${mood.text}">W${w}</div>
                <div class="ww-emoji">${isCurr ? '⭐' : mood.emoji}</div>
            `;
            grid.appendChild(cell);
            w++;
        }
    }

    // Detail Leaps List
    const title = document.createElement('h3');
    title.textContent = "📋 Chi tiết 10 Leaps";
    title.style.color = "var(--accent)";
    title.style.margin = "20px 0 10px 0";
    main.appendChild(title);

    leapsStatus.forEach(l => {
        const lc = document.createElement('div');
        lc.className = 'card';
        lc.style.padding = '0';
        lc.style.display = 'flex';
        lc.style.overflow = 'hidden';
        
        let badge = '';
        if(l.status === 'current') badge = `<span style="background:var(--warn-color); color:var(--bg-dark); padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold">ĐANG TRONG LEAP</span>`;
        else if(l.status === 'past') badge = `<span style="color:var(--text-muted); font-size:11px;">✓ Đã qua</span>`;
        else badge = `<span style="color:var(--accent2); font-size:11px;">⏳ ${l.days_until_fussy} ngày</span>`;

        lc.innerHTML = `
            <div style="width:6px; background:${l.color};"></div>
            <div style="padding:16px; flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <strong style="color:var(--text-primary)">${l.name} - ${l.name_vn}</strong>
                    ${badge}
                </div>
                ${l.status !== 'past' ? `<div style="font-size:10px; color:var(--text-muted); margin-bottom:4px;">Giai đoạn: ${l.fussy_start} → ${l.fussy_end}</div>` : ''}
                <div style="font-size:12px; color:var(--text-muted); line-height:1.4;">${l.description}</div>
            </div>
        `;
        main.appendChild(lc);
    });
}


// ─── TAB: VACCINATION ──────────────────────────────────────────────────────
function renderVaccinationTab(main) {
    if(!currentProfileId) return;
    const profile = getProfileById(currentProfileId);
    if(!profile) return;

    renderProfileSelector(main);
    
    // Sub-nav for Tracking | Schedule
    const subNav = document.createElement('div');
    subNav.className = 'vac-sub-tabs';
    subNav.innerHTML = `
        <div class="vac-tab active" data-sub="track">📌 Theo dõi</div>
        <div class="vac-tab" data-sub="sched">📋 Lịch KQ</div>
    `;
    main.appendChild(subNav);

    const subContent = document.createElement('div');
    subContent.id = 'vac-sub-content';
    main.appendChild(subContent);

    // Initial load
    renderVacTrackTab(profile);

    // Switch logic
    subNav.querySelectorAll('.vac-tab').forEach(t => {
        t.onclick = (e) => {
            subNav.querySelectorAll('.vac-tab').forEach(x => x.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            if(target.dataset.sub === 'track') renderVacTrackTab(profile);
            else renderVacSchedTab(profile);
        };
    });
}

function renderVacTrackTab(profile) {
    const main = document.getElementById('vac-sub-content');
    main.innerHTML = '';
    const ageWeeks = getAgeWeeksFromDue(profile.due_date);
    const records = getVaccineRecords(profile.id);

    // Track Cards
    VACCINES.forEach(vac => {
        const vacRecs = records[vac.id] || {};
        const allDone = vac.doses.every(d => vacRecs[d.dose_number]);
        
        const card = document.createElement('div');
        card.className = `track-card ${allDone ? 'all-done' : (Object.keys(vacRecs).length > 0 ? 'in-progress' : '')}`;
        
        const bdgClass = vac.is_required ? 'bg-tcmr' : 'bg-dv';
        const bdgText = vac.is_required ? 'TCMR' : 'DV';
        const sttColor = allDone ? 'var(--vac-green)' : 'var(--warn-color)';
        const sttIcon = allDone ? '✅' : `${Object.keys(vacRecs).length}/${vac.doses.length}`;

        let dosesHtml = '';
        vac.doses.forEach(dose => {
            const isDone = !!vacRecs[dose.dose_number];
            const isAct = ageWeeks >= dose.min_age_weeks && ageWeeks <= dose.max_age_weeks;
            const isUpC = !isDone && (dose.min_age_weeks - ageWeeks > 0) && (dose.min_age_weeks - ageWeeks <= 5);
            
            let rCls = isDone ? 'done-dose' : (isAct || isUpC ? 'active-dose' : '');
            let chk = isDone ? 'checked' : '';
            let stText = isDone ? `✅ ${vacRecs[dose.dose_number].date}` : (isAct ? '🔶 Cần tiêm' : (isUpC ? `🔵 ~${Math.ceil((dose.min_age_weeks - ageWeeks)*7)}d` : ''));
            let stCl = isDone ? 'color-green' : (isAct ? 'color-orange' : (isUpC ? 'color-blue' : ''));

            dosesHtml += `
                <div class="track-dose ${rCls}" onclick="toggleVacDose('${vac.id}', ${dose.dose_number}, ${isDone})">
                    <div class="check-circle ${chk}">${isDone?'✓':''}</div>
                    <div class="flex-1">
                        <div class="text-xs ${isDone?'color-green':''} font-bold mb-1">${dose.label} (${ageWeeksToLabel(dose.recommended_age_weeks)})</div>
                        <div class="text-xs ${stCl}">${stText}</div>
                    </div>
                </div>
            `;
        });

        card.innerHTML = `
            <div class="track-header">
                <div class="vac-badge ${bdgClass}" style="margin-right:8px">${bdgText}</div>
                <div class="font-bold text-sm flex-1">${vac.name_vn}</div>
                <div class="text-xs" style="color:${sttColor}">${vac.disease} | ${sttIcon}</div>
            </div>
            ${dosesHtml}
        `;
        main.appendChild(card);
    });
}

function renderVacSchedTab(profile) {
    const main = document.getElementById('vac-sub-content');
    main.innerHTML = '';
    const ageWeeks = getAgeWeeksFromDue(profile.due_date);

    FULL_SCHEDULE.forEach(item => {
        const stt = getDoseStatus(ageWeeks, {min_age_weeks: item.min_age_weeks, max_age_weeks: item.max_age_weeks});
        let rc = '#2A2240', ic = 'var(--text-muted)';
        if(stt === 'active') { rc = '#3D3010'; ic = 'var(--vac-orange)'; }
        else if(stt === 'upcoming') { rc = '#1E2838'; ic = 'var(--vac-blue)'; }
        
        const card = document.createElement('div');
        card.className = 'vac-row';
        card.style.background = rc;
        
        let mfr = item.manufacturers[0] ? item.manufacturers[0].name : '';
        let pr = item.manufacturers[0] ? (item.manufacturers[0].prices["VNVC"] || 'N/A') : 'N/A';
        let isFree = String(pr).includes('Miễn phí');

        card.innerHTML = `
            <div style="width:4px; height:100%; border-radius:2px; background:${item.is_required ? 'var(--vac-green)' : 'var(--vac-purple)';} margin-right:12px;"></div>
            <div class="flex-1">
                <div class="font-bold text-sm mb-1" style="color:${stt==='done'?'var(--text-muted)':'white'}">${item.vaccine_name_vn} - ${item.dose_label}</div>
                <div class="text-xs mb-1" style="color:var(--accent2)">Tuổi: ${item.recommended_age_label}</div>
                <div class="text-xs" style="color:${isFree?'var(--vac-green)':'var(--text-muted)'}">${mfr} • ${pr}</div>
            </div>
            <div style="font-size:20px; filter:grayscale(${stt === 'done' ? '1' : '0'})">${stt==='done' ? '✅' : (stt==='active'?'🔶':(stt==='upcoming'?'🔵':'⬜'))}</div>
        `;
        main.appendChild(card);
    });
}

// Check/Uncheck tiêm phòng
window.toggleVacDose = function(vacId, doseNum, isDone) {
    if(isDone) {
        // Uncheck
        if(confirm("Xóa lịch sử mũi tiêm này?")) {
            removeVaccineRecord(currentProfileId, vacId, doseNum);
            renderCurrentTab();
        }
    } else {
        // Check -> Yêu cầu nhập ngày/chi phí đơn giản
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-sheet">
                <h3 style="color:var(--vac-green); margin-bottom: 16px;">Xác nhận tiêm</h3>
                <div class="form-group">
                    <label>Ngày tiêm</label>
                    <input type="date" id="vac-date" class="form-control" value="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>Chi phí VNĐ (Option)</label>
                    <input type="number" id="vac-cost" class="form-control" value="0">
                </div>
                <div style="display:flex; gap:12px; margin-top:20px;">
                    <button class="btn-secondary" style="flex:1" onclick="this.closest('.modal-overlay').remove()">Hủy</button>
                    <button class="btn" style="flex:1; background:var(--vac-green); color:white" id="btn-save-vac">Lưu</button>
                </div>
            </div>
        `;
        document.getElementById('modal-container').appendChild(modal);
        
        modal.querySelector('#btn-save-vac').onclick = () => {
            const dStr = document.getElementById('vac-date').value;
            const cStr = document.getElementById('vac-cost').value;
            saveVaccineRecord(currentProfileId, vacId, doseNum, dStr, cStr);
            modal.remove();
            renderCurrentTab();
        };
    }
};
