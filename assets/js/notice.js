// 설정
const itemsPerPage = 5; // 한 페이지에 10개씩
let currentPage = 1;
let allData = [];

// 1. 데이터 가져오기 (상대 경로 주의: community/notice.html 기준)
async function loadNoticeData() {
    try {
        // 경로가 /data/notice.json 이므로 ../../data/notice.json
        const response = await fetch('../../data/notice.json');
        allData = await response.json();
        
        // 전체 개수 업데이트
        document.getElementById('total-count').innerText = allData.length;
        
        renderNoticeTable();
    } catch (error) {
        console.error("데이터 로드 실패:", error);
        document.getElementById('notice-list').innerHTML = '<tr><td colspan="4" style="text-align:center; padding:50px;">데이터를 불러오지 못했습니다.</td></tr>';
    }
}

// 2. 테이블 그리기
function renderNoticeTable() {
    const listElement = document.getElementById('notice-list');
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedData = allData.slice(startIndex, endIndex);

    if (pagedData.length === 0) {
        listElement.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:50px;">등록된 게시물이 없습니다.</td></tr>';
        return;
    }

    // [중요] 조회수(item.view) 칸을 삭제하여 3칸으로 맞춥니다.
    listElement.innerHTML = pagedData.map(item => `
        <tr class="notice-item" style="border-bottom: 1px solid #eee;">
            <td style="text-align: center; padding: 20px; color: #999;">${item.id}</td>
            <td style="padding: 20px;">
                <a href="${item.link}" style="text-decoration: none; color: #333; font-weight: 500;">${item.title}</a>
            </td>
            <td style="text-align: center; padding: 20px; color: #666;">${item.date}</td>
            </tr>
    `).join('');

    renderPagination();
}

// 3. 페이지네이션 생성
function renderPagination() {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const wrap = document.getElementById('pagination-wrap');
    
    let paginationHtml = '';
    
    // 이전 버튼
    paginationHtml += `<a href="#" onclick="movePage(${currentPage - 1})" style="width:35px; height:35px; border:1px solid #ddd; display:flex; align-items:center; justify-content:center; text-decoration:none; color:#333;">&laquo;</a>`;

    // 숫자 버튼
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        paginationHtml += `
            <a href="#" onclick="movePage(${i})" style="width:35px; height:35px; border:1px solid ${isActive ? '#003366' : '#ddd'}; display:flex; align-items:center; justify-content:center; text-decoration:none; color:${isActive ? '#fff' : '#333'}; background:${isActive ? '#003366' : '#fff'}; font-weight:${isActive ? 'bold' : 'normal'};">
                ${i}
            </a>`;
    }

    // 다음 버튼
    paginationHtml += `<a href="#" onclick="movePage(${currentPage + 1})" style="width:35px; height:35px; border:1px solid #ddd; display:flex; align-items:center; justify-content:center; text-decoration:none; color:#333;">&raquo;</a>`;

    wrap.innerHTML = paginationHtml;
}

// 4. 페이지 이동 함수
window.movePage = function(page) {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderNoticeTable();
    window.scrollTo(0, 300); // 이동 시 상단으로 부드럽게 스크롤
};

// 실행
loadNoticeData();