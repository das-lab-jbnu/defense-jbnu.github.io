// assets/js/main-notice.js

async function loadMainNotices() {
    try {
        // 1. 데이터 가져오기 (index.html 기준 경로)
        const response = await fetch('data/notice.json');
        const allData = await response.json();

        // 2. 최신글 4개만 추출 (수학적 슬라이싱)
        const top4 = allData.slice(0, 4);

        const listElement = document.getElementById('main-notice-list');
        
        // 3. HTML 생성
        listElement.innerHTML = top4.map(item => {
            // 날짜 분리 로직: "2026.03.31" -> ["2026", "03", "31"]
            const dateParts = item.date.split('.');
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];

            return `
                <li class="news-item">
                    <a href="pages/community/${item.link}">
                        <div class="item-date">
                            <span class="day">${day}</span>
                            <span class="year-month">${year}-${month}</span>
                        </div>
                        <h3 class="item-subject">${item.title}</h3>
                        <div class="item-view">VIEW <span class="long-arrow">——→</span></div>
                    </a>
                </li>
            `;
        }).join('');

    } catch (error) {
        console.error("메인 소식 로드 실패:", error);
    }
}

// 실행
document.addEventListener('DOMContentLoaded', loadMainNotices);