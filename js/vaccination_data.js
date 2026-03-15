// ─── Nguồn giá ────────────────────────────────────────────────────────────────
const PRICE_SOURCES = ["VNVC", "Phòng khám 315", "Long Châu"];

// ─── Danh sách Vaccine ────────────────────────────────────────────────────────
const VACCINES = [
    {
        id: "bcg",
        name: "BCG",
        name_vn: "Lao (BCG)",
        disease: "Bệnh Lao",
        is_required: true,
        doses: [
            {dose_number: 1, label: "Mũi duy nhất", recommended_age_weeks: 0, min_age_weeks: 0, max_age_weeks: 4},
        ],
        manufacturers: [
            {name: "BCG Việt Nam", country: "🇻🇳 Việt Nam",
             prices: {"VNVC": "Miễn phí (TCMR)", "Phòng khám 315": "Miễn phí (TCMR)", "Long Châu": "N/A"}},
        ],
        notes: "Tiêm ngay sau sinh tại bệnh viện. Chương trình TCMR miễn phí.",
    },
    {
        id: "hepb_birth",
        name: "Hepatitis B (sơ sinh)",
        name_vn: "Viêm gan B (sơ sinh)",
        disease: "Viêm gan B",
        is_required: true,
        doses: [
            {dose_number: 1, label: "Mũi sơ sinh", recommended_age_weeks: 0, min_age_weeks: 0, max_age_weeks: 1},
        ],
        manufacturers: [
            {name: "Euvax B", country: "🇰🇷 Hàn Quốc",
             prices: {"VNVC": "Miễn phí (TCMR)", "Phòng khám 315": "Miễn phí (TCMR)", "Long Châu": "N/A"}},
            {name: "Engerix-B", country: "🇧🇪 Bỉ",
             prices: {"VNVC": "200,000", "Phòng khám 315": "220,000", "Long Châu": "N/A"}},
        ],
        notes: "Tiêm trong 24h đầu sau sinh. Mũi TCMR miễn phí, chọn Engerix-B nếu muốn dịch vụ.",
    },
    {
        id: "hexaxim",
        name: "6 trong 1 (Hexaxim/Infanrix Hexa)",
        name_vn: "6 trong 1",
        disease: "Bạch hầu, Ho gà, Uốn ván, Bại liệt, Hib, Viêm gan B",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 8, min_age_weeks: 6, max_age_weeks: 12},
            {dose_number: 2, label: "Mũi 2", recommended_age_weeks: 12, min_age_weeks: 10, max_age_weeks: 16},
            {dose_number: 3, label: "Mũi 3", recommended_age_weeks: 16, min_age_weeks: 14, max_age_weeks: 24},
            {dose_number: 4, label: "Mũi nhắc", recommended_age_weeks: 78, min_age_weeks: 60, max_age_weeks: 96},
        ],
        manufacturers: [
            {name: "Hexaxim", country: "🇫🇷 Pháp (Sanofi)",
             prices: {"VNVC": "1,015,000", "Phòng khám 315": "1,050,000", "Long Châu": "980,000"}},
            {name: "Infanrix Hexa", country: "🇧🇪 Bỉ (GSK)",
             prices: {"VNVC": "1,100,000", "Phòng khám 315": "1,150,000", "Long Châu": "1,080,000"}},
        ],
        notes: "Thay thế mũi 5 trong 1 TCMR + Viêm gan B riêng. Tiêm dịch vụ.",
    },
    {
        id: "dtap_ipv_hib",
        name: "5 trong 1 (ComBE Five / Pentaxim)",
        name_vn: "5 trong 1",
        disease: "Bạch hầu, Ho gà, Uốn ván, Bại liệt, Hib",
        is_required: true,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 8, min_age_weeks: 6, max_age_weeks: 12},
            {dose_number: 2, label: "Mũi 2", recommended_age_weeks: 12, min_age_weeks: 10, max_age_weeks: 16},
            {dose_number: 3, label: "Mũi 3", recommended_age_weeks: 16, min_age_weeks: 14, max_age_weeks: 24},
            {dose_number: 4, label: "Mũi nhắc", recommended_age_weeks: 78, min_age_weeks: 60, max_age_weeks: 96},
        ],
        manufacturers: [
            {name: "ComBE Five", country: "🇮🇳 Ấn Độ",
             prices: {"VNVC": "Miễn phí (TCMR)", "Phòng khám 315": "Miễn phí (TCMR)", "Long Châu": "N/A"}},
            {name: "Pentaxim", country: "🇫🇷 Pháp (Sanofi)",
             prices: {"VNVC": "795,000", "Phòng khám 315": "820,000", "Long Châu": "780,000"}},
        ],
        notes: "ComBE Five miễn phí TCMR. Pentaxim là dịch vụ, ít tác dụng phụ hơn.",
    },
    {
        id: "opv_ipv",
        name: "Bại liệt (OPV/IPV)",
        name_vn: "Bại liệt",
        disease: "Bại liệt (Polio)",
        is_required: true,
        doses: [
            {dose_number: 1, label: "Mũi/uống 1", recommended_age_weeks: 8, min_age_weeks: 6, max_age_weeks: 12},
            {dose_number: 2, label: "Mũi/uống 2", recommended_age_weeks: 12, min_age_weeks: 10, max_age_weeks: 16},
            {dose_number: 3, label: "Mũi/uống 3", recommended_age_weeks: 16, min_age_weeks: 14, max_age_weeks: 24},
            {dose_number: 4, label: "Nhắc lại", recommended_age_weeks: 78, min_age_weeks: 60, max_age_weeks: 96},
        ],
        manufacturers: [
            {name: "OPV (uống)", country: "🇻🇳 Việt Nam",
             prices: {"VNVC": "Miễn phí (TCMR)", "Phòng khám 315": "Miễn phí (TCMR)", "Long Châu": "N/A"}},
            {name: "Imovax Polio (tiêm IPV)", country: "🇫🇷 Pháp",
             prices: {"VNVC": "490,000", "Phòng khám 315": "510,000", "Long Châu": "480,000"}},
        ],
        notes: "OPV uống miễn phí. IPV tiêm dịch vụ an toàn hơn. Nếu đã tiêm 6-in-1 thì không cần riêng.",
    },
    {
        id: "pneumococcal",
        name: "Phế cầu khuẩn",
        name_vn: "Phế cầu khuẩn",
        disease: "Viêm phổi, Viêm màng não, Nhiễm khuẩn huyết",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 8, min_age_weeks: 6, max_age_weeks: 12},
            {dose_number: 2, label: "Mũi 2", recommended_age_weeks: 16, min_age_weeks: 14, max_age_weeks: 24},
            {dose_number: 3, label: "Mũi 3", recommended_age_weeks: 26, min_age_weeks: 22, max_age_weeks: 30},
            {dose_number: 4, label: "Mũi nhắc", recommended_age_weeks: 52, min_age_weeks: 48, max_age_weeks: 60},
        ],
        manufacturers: [
            {name: "Synflorix 10", country: "🇧🇪 Bỉ (GSK)",
             prices: {"VNVC": "1,060,000", "Phòng khám 315": "1,100,000", "Long Châu": "1,020,000"}},
            {name: "Prevenar 13", country: "🇮🇪 Ireland (Pfizer)",
             prices: {"VNVC": "1,290,000", "Phòng khám 315": "1,350,000", "Long Châu": "1,250,000"}},
        ],
        notes: "Dịch vụ. Rất khuyến khích tiêm. Prevenar 13 phòng thêm 3 chủng so với Synflorix.",
    },
    {
        id: "rotavirus",
        name: "Rotavirus",
        name_vn: "Tiêu chảy do Rotavirus",
        disease: "Tiêu chảy cấp do Rotavirus",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Liều 1 (uống)", recommended_age_weeks: 8, min_age_weeks: 6, max_age_weeks: 15},
            {dose_number: 2, label: "Liều 2 (uống)", recommended_age_weeks: 16, min_age_weeks: 10, max_age_weeks: 24},
            {dose_number: 3, label: "Liều 3 (uống, nếu Rotateq)", recommended_age_weeks: 24, min_age_weeks: 14, max_age_weeks: 32},
        ],
        manufacturers: [
            {name: "Rotarix (2 liều)", country: "🇧🇪 Bỉ (GSK)",
             prices: {"VNVC": "915,000", "Phòng khám 315": "950,000", "Long Châu": "900,000"}},
            {name: "Rotateq (3 liều)", country: "🇺🇸 Mỹ (MSD)",
             prices: {"VNVC": "665,000", "Phòng khám 315": "690,000", "Long Châu": "650,000"}},
        ],
        notes: "Uống, không tiêm. Rotarix 2 liều, Rotateq 3 liều. Phải hoàn thành trước 8 tháng tuổi.",
    },
    {
        id: "flu",
        name: "Cúm mùa",
        name_vn: "Cúm mùa",
        disease: "Cúm mùa (Influenza)",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 26, min_age_weeks: 26, max_age_weeks: 156},
            {dose_number: 2, label: "Mũi 2 (cách 4 tuần)", recommended_age_weeks: 30, min_age_weeks: 30, max_age_weeks: 156},
        ],
        manufacturers: [
            {name: "Vaxigrip Tetra", country: "🇫🇷 Pháp (Sanofi)",
             prices: {"VNVC": "356,000", "Phòng khám 315": "380,000", "Long Châu": "350,000"}},
            {name: "Influvac Tetra", country: "🇳🇱 Hà Lan (Abbott)",
             prices: {"VNVC": "356,000", "Phòng khám 315": "370,000", "Long Châu": "345,000"}},
            {name: "GC Flu Quadrivalent", country: "🇰🇷 Hàn Quốc",
             prices: {"VNVC": "320,000", "Phòng khám 315": "340,000", "Long Châu": "310,000"}},
        ],
        notes: "Tiêm hàng năm từ 6 tháng tuổi. Lần đầu tiêm 2 mũi cách nhau 4 tuần.",
    },
    {
        id: "measles",
        name: "Sởi đơn",
        name_vn: "Sởi",
        disease: "Bệnh Sởi",
        is_required: true,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 39, min_age_weeks: 36, max_age_weeks: 48},
        ],
        manufacturers: [
            {name: "MVVAC (sởi đơn)", country: "🇻🇳 Việt Nam",
             prices: {"VNVC": "Miễn phí (TCMR)", "Phòng khám 315": "Miễn phí (TCMR)", "Long Châu": "N/A"}},
        ],
        notes: "Mũi 1 lúc 9 tháng (TCMR). Mũi 2 thường thay bằng MMR lúc 12-18 tháng.",
    },
    {
        id: "mmr",
        name: "Sởi - Quai bị - Rubella (MMR)",
        name_vn: "Sởi-Quai bị-Rubella (MMR)",
        disease: "Sởi, Quai bị, Rubella",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 52, min_age_weeks: 48, max_age_weeks: 60},
            {dose_number: 2, label: "Mũi 2", recommended_age_weeks: 78, min_age_weeks: 72, max_age_weeks: 96},
        ],
        manufacturers: [
            {name: "MMR II", country: "🇺🇸 Mỹ (MSD)",
             prices: {"VNVC": "375,000", "Phòng khám 315": "395,000", "Long Châu": "365,000"}},
            {name: "Priorix", country: "🇧🇪 Bỉ (GSK)",
             prices: {"VNVC": "380,000", "Phòng khám 315": "400,000", "Long Châu": "370,000"}},
        ],
        notes: "Dịch vụ. Mũi 1 lúc 12 tháng, mũi 2 lúc 18 tháng. Thay thế sởi đơn TCMR mũi 2.",
    },
    {
        id: "varicella",
        name: "Thủy đậu",
        name_vn: "Thủy đậu",
        disease: "Bệnh Thủy đậu",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 52, min_age_weeks: 48, max_age_weeks: 60},
            {dose_number: 2, label: "Mũi nhắc", recommended_age_weeks: 156, min_age_weeks: 108, max_age_weeks: 208},
        ],
        manufacturers: [
            {name: "Varilrix", country: "🇧🇪 Bỉ (GSK)",
             prices: {"VNVC": "850,000", "Phòng khám 315": "880,000", "Long Châu": "830,000"}},
            {name: "Varicella (Trung Quốc)", country: "🇨🇳 Trung Quốc",
             prices: {"VNVC": "520,000", "Phòng khám 315": "550,000", "Long Châu": "500,000"}},
        ],
        notes: "Dịch vụ. Mũi 1 lúc 12 tháng. Mũi nhắc lúc 4-5 tuổi.",
    },
    {
        id: "hepa",
        name: "Viêm gan A",
        name_vn: "Viêm gan A",
        disease: "Viêm gan A",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 52, min_age_weeks: 48, max_age_weeks: 60},
            {dose_number: 2, label: "Mũi 2 (cách 6 tháng)", recommended_age_weeks: 78, min_age_weeks: 72, max_age_weeks: 96},
        ],
        manufacturers: [
            {name: "Avaxim 80U", country: "🇫🇷 Pháp (Sanofi)",
             prices: {"VNVC": "565,000", "Phòng khám 315": "590,000", "Long Châu": "550,000"}},
            {name: "Havax", country: "🇻🇳 Việt Nam (VABIOTECH)",
             prices: {"VNVC": "280,000", "Phòng khám 315": "300,000", "Long Châu": "270,000"}},
        ],
        notes: "Dịch vụ. Mũi 1 từ 12 tháng, mũi 2 cách 6-12 tháng.",
    },
    {
        id: "je",
        name: "Viêm não Nhật Bản",
        name_vn: "Viêm não Nhật Bản",
        disease: "Viêm não Nhật Bản",
        is_required: true,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 52, min_age_weeks: 48, max_age_weeks: 60},
            {dose_number: 2, label: "Mũi 2 (cách 1-2 tuần)", recommended_age_weeks: 54, min_age_weeks: 50, max_age_weeks: 64},
            {dose_number: 3, label: "Mũi 3 (cách 1 năm)", recommended_age_weeks: 104, min_age_weeks: 96, max_age_weeks: 120},
        ],
        manufacturers: [
            {name: "Jevax", country: "🇻🇳 Việt Nam (VABIOTECH)",
             prices: {"VNVC": "Miễn phí (TCMR)", "Phòng khám 315": "Miễn phí (TCMR)", "Long Châu": "N/A"}},
            {name: "Imojev", country: "🇹🇭 Thái Lan (Sanofi)",
             prices: {"VNVC": "765,000", "Phòng khám 315": "800,000", "Long Châu": "750,000"}},
        ],
        notes: "Jevax (TCMR) 3 mũi. Imojev (dịch vụ) chỉ cần 1-2 mũi, ít tác dụng phụ.",
    },
    {
        id: "meningococcal",
        name: "Não mô cầu",
        name_vn: "Não mô cầu",
        disease: "Viêm màng não mô cầu",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Mũi 1", recommended_age_weeks: 26, min_age_weeks: 24, max_age_weeks: 36},
            {dose_number: 2, label: "Mũi 2 (cách 3 tháng)", recommended_age_weeks: 39, min_age_weeks: 36, max_age_weeks: 48},
        ],
        manufacturers: [
            {name: "VA-Mengoc-BC (B+C)", country: "🇨🇺 Cuba",
             prices: {"VNVC": "465,000", "Phòng khám 315": "490,000", "Long Châu": "450,000"}},
            {name: "Menactra (A,C,Y,W-135)", country: "🇺🇸 Mỹ (Sanofi)",
             prices: {"VNVC": "1,310,000", "Phòng khám 315": "1,350,000", "Long Châu": "1,280,000"}},
        ],
        notes: "Dịch vụ. Menactra phòng 4 nhóm (A, C, Y, W-135), tốt hơn nhưng đắt hơn.",
    },
    {
        id: "typhoid",
        name: "Thương hàn",
        name_vn: "Thương hàn",
        disease: "Sốt thương hàn",
        is_required: false,
        doses: [
            {dose_number: 1, label: "Mũi duy nhất", recommended_age_weeks: 104, min_age_weeks: 96, max_age_weeks: 156},
        ],
        manufacturers: [
            {name: "Typhim Vi", country: "🇫🇷 Pháp (Sanofi)",
             prices: {"VNVC": "285,000", "Phòng khám 315": "300,000", "Long Châu": "275,000"}},
        ],
        notes: "Dịch vụ. Tiêm từ 2 tuổi. Nhắc lại mỗi 3 năm nếu cần.",
    },
];

// ─── Lịch tổng hợp ──────────────────────────────────────────────────────────
const FULL_SCHEDULE = [];
VACCINES.forEach(vac => {
    vac.doses.forEach(dose => {
        FULL_SCHEDULE.push({
            vaccine_id: vac.id,
            vaccine_name: vac.name,
            vaccine_name_vn: vac.name_vn,
            disease: vac.disease,
            is_required: vac.is_required,
            manufacturers: vac.manufacturers,
            notes: vac.notes,
            dose_number: dose.dose_number,
            dose_label: dose.label,
            recommended_age_weeks: dose.recommended_age_weeks,
            recommended_age_label: ageWeeksToLabel(dose.recommended_age_weeks),
            min_age_weeks: dose.min_age_weeks,
            max_age_weeks: dose.max_age_weeks,
        });
    });
});
FULL_SCHEDULE.sort((a, b) => a.recommended_age_weeks - b.recommended_age_weeks);

// ─── Utilities ──────────────────────────────────────────────────────────
function ageWeeksToLabel(weeks) {
    if (weeks === 0) return "Sơ sinh";
    const months = weeks / 4.33;
    if (months < 1) return `${weeks} tuần`;
    if (months < 24) return `${Math.round(months)} tháng`;
    const years = months / 12;
    return `${years.toFixed(1).replace('.0','')} tuổi`;
}

function getDoseStatus(ageWeeks, dose) {
    if (ageWeeks > dose.max_age_weeks) return "done";
    if (ageWeeks >= dose.min_age_weeks && ageWeeks <= dose.max_age_weeks) return "active";
    if (dose.min_age_weeks - ageWeeks <= 5) return "upcoming";
    return "future";
}

function getVaccinesForAge(ageWeeks) {
    let results = [];
    VACCINES.forEach(vac => {
        let matches = vac.doses.filter(d => ageWeeks >= d.min_age_weeks && ageWeeks <= d.max_age_weeks);
        if (matches.length > 0) results.push({ ...vac, matching_doses: matches });
    });
    return results;
}

function getUpcomingVaccines(ageWeeks, lookaheadWeeks = 5) {
    let results = [];
    const limit = ageWeeks + lookaheadWeeks;
    VACCINES.forEach(vac => {
        let matches = vac.doses.filter(d => d.min_age_weeks > ageWeeks && d.min_age_weeks <= limit);
        if (matches.length > 0) results.push({ ...vac, matching_doses: matches });
    });
    return results;
}
