// ─── Week-by-week mood map (1–77) ─────────────────────────────────────────────
// Levels: 1=sunny, 2=mostly_sunny, 3=cloudy, 4=rainy, 5=stormy
const WEEK_MOOD_MAP = {
    1: 1,  2: 1,  3: 1,  4: 1,  5: 5,  6: 3,  7: 1,
    8: 5,  9: 2,  10: 1, 11: 1, 12: 5, 13: 3, 14: 1,
    15: 3, 16: 1, 17: 2, 18: 3, 19: 5, 20: 2, 21: 1,
    22: 1, 23: 3, 24: 1, 25: 2, 26: 5, 27: 2, 28: 1,
    29: 3, 30: 4, 31: 1, 32: 1, 33: 4, 34: 5, 35: 5,
    36: 4, 37: 3, 38: 2, 39: 3, 40: 4, 41: 4, 42: 5,
    43: 3, 44: 4, 45: 3, 46: 5, 47: 2, 48: 3, 49: 3,
    50: 3, 51: 4, 52: 4, 53: 4, 54: 5, 55: 3, 56: 3,
    57: 3, 58: 4, 59: 4, 60: 4, 61: 5, 62: 5, 63: 5,
    64: 3, 65: 4, 66: 4, 67: 4, 68: 5, 69: 3, 70: 1,
    71: 3, 72: 4, 73: 5, 74: 4, 75: 5, 76: 2, 77: 3,
};

const MOOD_LEVELS = {
    1: {label: "Bé thoải mái",                 emoji: "😊", color: "#FFFFFF",  text: "#555555"},
    2: {label: "Hy vọng bé ngoan",             emoji: "🙂", color: "#FFF5E6",  text: "#7A6530"},
    3: {label: "Bé khó tính",                  emoji: "😢", color: "#FFD6E0",  text: "#8B3A50"},
    4: {label: "Có khả năng gây 'bão tố'",     emoji: "😭", color: "#FF9EB5",  text: "#7A1530"},
    5: {label: "Bé trở nên hay gắt gỏng",      emoji: "😤", color: "#FF5C7A",  text: "#FFFFFF"},
};

const TOTAL_WEEKS = 77;

// ─── 10 Developmental Leaps ──────────────────────────────────────────────────
const LEAPS = [
    {
        id: 1,
        name: "Leap 1",
        name_vn: "Thế giới Cảm giác",
        week: 5,
        fussy_window: 7,
        description: "Bé bắt đầu nhận thức thế giới xung quanh rõ hơn. Thị giác, thính giác nhạy bén hơn.",
        skills: ["Nhìn rõ hơn", "Phản xạ giật mình giảm", "Nghe rõ âm thanh nhỏ"],
        color: "#B8A9D9"
    },
    {
        id: 2,
        name: "Leap 2",
        name_vn: "Thế giới Khuôn mẫu",
        week: 8,
        fussy_window: 7,
        description: "Bé bắt đầu nhận ra các khuôn mẫu lặp lại trong cuộc sống. Cuộc sống trở nên quen thuộc hơn.",
        skills: ["Nhận ra giọng mẹ", "Theo dõi đồ vật", "Cười xã hội"],
        color: "#A9C5D9"
    },
    {
        id: 3,
        name: "Leap 3",
        name_vn: "Thế giới Chuyển đổi trôi chảy",
        week: 12,
        fussy_window: 7,
        description: "Bé nhận ra sự thay đổi dần dần của âm thanh, ánh sáng, chuyển động và cảm xúc.",
        skills: ["Cười to hơn", "Theo dõi vật di chuyển", "Phát âm bập bẹ"],
        color: "#A9D9B8"
    },
    {
        id: 4,
        name: "Leap 4",
        name_vn: "Thế giới Sự kiện",
        week: 19,
        fussy_window: 10,
        description: "Bé bắt đầu hiểu rằng một hành động dẫn đến một kết quả khác. Tham gia trò chơi đơn giản.",
        skills: ["Lật người", "Cầm đồ vật", "Vươn tay với đồ vật"],
        color: "#D9C5A9"
    },
    {
        id: 5,
        name: "Leap 5",
        name_vn: "Thế giới Mối quan hệ",
        week: 26,
        fussy_window: 10,
        description: "Bé hiểu mối quan hệ giữa người và đồ vật. Bắt đầu lo lắng khi xa mẹ.",
        skills: ["Ngồi không cần đỡ", "Object permanence", "Lo sợ người lạ"],
        color: "#D9A9B8"
    },
    {
        id: 6,
        name: "Leap 6",
        name_vn: "Thế giới Phân loại",
        week: 37,
        fussy_window: 14,
        description: "Bé bắt đầu phân loại mọi thứ theo đặc điểm chung. Khám phá thế giới chủ động hơn.",
        skills: ["Bò", "Giơ tay ra hiệu", "Hiểu từ đơn giản"],
        color: "#B8D9A9"
    },
    {
        id: 7,
        name: "Leap 7",
        name_vn: "Thế giới Trình tự",
        week: 46,
        fussy_window: 14,
        description: "Bé hiểu các sự kiện xảy ra theo thứ tự cố định. Thích làm đi làm lại một việc.",
        skills: ["Đứng vịn", "Nói từ đầu tiên", "Chỉ vào đồ vật"],
        color: "#D9D0A9"
    },
    {
        id: 8,
        name: "Leap 8",
        name_vn: "Thế giới Chương trình",
        week: 55,
        fussy_window: 14,
        description: "Bé hiểu các trình tự là một 'chương trình' để đạt mục tiêu. Bắt đầu giải quyết vấn đề.",
        skills: ["Đi những bước đầu tiên", "Dùng dụng cụ đơn giản", "Bắt chước hành động"],
        color: "#C5A9D9"
    },
    {
        id: 9,
        name: "Leap 9",
        name_vn: "Thế giới Nguyên tắc",
        week: 64,
        fussy_window: 14,
        description: "Bé bắt đầu hiểu quy tắc và giới hạn. Có thể bắt đầu thử thách các quy tắc.",
        skills: ["Đi vững hơn", "Hiểu 'không'", "Chơi giả vờ đơn giản"],
        color: "#A9D9D0"
    },
    {
        id: 10,
        name: "Leap 10",
        name_vn: "Thế giới Hệ thống",
        week: 75,
        fussy_window: 14,
        description: "Bé nhận ra sự độc lập của bản thân và khẳng định sở thích. Khủng hoảng tuổi lên 2!",
        skills: ["Chạy", "Nói câu đơn giản", "Thể hiện cá tính mạnh mẽ"],
        color: "#D9A9A9"
    }
];

function getLeapById(leapId) {
    return LEAPS.find(l => l.id === leapId) || null;
}
