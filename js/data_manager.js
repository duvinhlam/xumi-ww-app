// ─── Data Manager cho PWA (LocalStorage) ───────────────────────────────────

const STORAGE_KEYS = {
    PROFILES: 'xumi_profiles',
    VOTES: 'xumi_vaccine_votes',
    RECORDS: 'xumi_vaccine_records'
};

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// ─── Profiles ───
function getProfiles() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveProfiles(profiles) {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
}

function getProfileById(id) {
    return getProfiles().find(p => p.id === id) || null;
}

function addProfile({name, birth_date, due_date, avatar_color = "#B8A9D9", notify_days_before = 3}) {
    const profiles = getProfiles();
    if (!due_date) due_date = birth_date;
    
    const profile = {
        id: generateUUID(),
        name,
        birth_date,
        due_date,
        avatar_color,
        notify_days_before,
        notify_enabled: true,
        created_at: new Date().toISOString()
    };
    
    profiles.push(profile);
    saveProfiles(profiles);
    return profile;
}

function updateProfile(id, dataToUpdate) {
    const profiles = getProfiles();
    const index = profiles.findIndex(p => p.id === id);
    if (index !== -1) {
        profiles[index] = { ...profiles[index], ...dataToUpdate, updated_at: new Date().toISOString() };
        saveProfiles(profiles);
        return profiles[index];
    }
    return null;
}

function deleteProfile(id) {
    let profiles = getProfiles();
    profiles = profiles.filter(p => p.id !== id);
    saveProfiles(profiles);
}

// ─── Dates & Calculations ───
function getAgeWeeksFromDue(dueDateStr) {
    const due = new Date(dueDateStr);
    const today = new Date();
    // Reset time for accurate day calc
    due.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    const diffTime = Math.abs(today - due);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // If today is before due, negative days
    if (today < due) return -(diffDays / 7);
    return diffDays / 7;
}

function computeLeapDates(dueDateStr, leap) {
    const due = new Date(dueDateStr);
    due.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Leap date is due + leap.week
    const leapDate = new Date(due);
    leapDate.setDate(leapDate.getDate() + (leap.week * 7));
    
    const fussyStart = new Date(leapDate);
    fussyStart.setDate(fussyStart.getDate() - leap.fussy_window);
    
    const fussyEnd = new Date(leapDate);
    fussyEnd.setDate(fussyEnd.getDate() + leap.fussy_window);
    
    const daysUntil = Math.ceil((fussyStart - today) / (1000 * 60 * 60 * 24));
    
    let status = "upcoming";
    if (today > fussyEnd) status = "past";
    else if (today >= fussyStart && today <= fussyEnd) status = "current";
    
    return {
        leap_date: leapDate.toISOString().split('T')[0],
        fussy_start: fussyStart.toISOString().split('T')[0],
        fussy_end: fussyEnd.toISOString().split('T')[0],
        days_until_fussy: daysUntil,
        status: status
    };
}

// ─── Vaccine Votes ───
function getVotes() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.VOTES)) || {};
    } catch { return {}; }
}
function saveVotes(votes) {
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(votes));
}
function saveVaccineVote(profileId, vaccineId, manufacturerName) {
    const votes = getVotes();
    if (!votes[vaccineId]) votes[vaccineId] = {};
    votes[vaccineId][profileId] = manufacturerName;
    saveVotes(votes);
}
function getVaccineVotesList(vaccineId) {
    const votes = getVotes();
    const raw = votes[vaccineId] || {};
    const counts = {};
    Object.values(raw).forEach(mfr => {
        counts[mfr] = (counts[mfr] || 0) + 1;
    });
    return counts;
}

// ─── Vaccine Records ───
function getRecords() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECORDS)) || {};
    } catch { return {}; }
}
function saveLocalRecords(records) {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
}

function getVaccineRecords(profileId) {
    return getRecords()[profileId] || {};
}

function saveVaccineRecord(profileId, vaccineId, doseNumber, dateStr, cost) {
    const records = getRecords();
    if (!records[profileId]) records[profileId] = {};
    if (!records[profileId][vaccineId]) records[profileId][vaccineId] = {};
    
    records[profileId][vaccineId][doseNumber.toString()] = {
        date: dateStr,
        cost: parseInt(cost) || 0,
        completed: true
    };
    saveLocalRecords(records);
}

function removeVaccineRecord(profileId, vaccineId, doseNumber) {
    const records = getRecords();
    if (records[profileId] && records[profileId][vaccineId]) {
        delete records[profileId][vaccineId][doseNumber.toString()];
        saveLocalRecords(records);
    }
}

function getTotalCost(profileId) {
    const profileRecords = getVaccineRecords(profileId);
    let total = 0;
    Object.values(profileRecords).forEach(vac => {
        Object.values(vac).forEach(dose => {
            total += (dose.cost || 0);
        });
    });
    return total;
}

function updateDoseCost(profileId, vaccineId, doseNumber, cost) {
    const records = getRecords();
    if (records[profileId] && records[profileId][vaccineId] && records[profileId][vaccineId][doseNumber]) {
        records[profileId][vaccineId][doseNumber].cost = parseInt(cost) || 0;
        saveLocalRecords(records);
    }
}
