document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabCons = document.querySelectorAll('.tab-con');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab'); // 클릭한 버튼의 대상 ID 추출

            // 1. 모든 버튼과 컨텐츠에서 active 제거
            tabBtns.forEach(b => b.classList.remove('active'));
            tabCons.forEach(c => c.classList.remove('active'));

            // 2. 현재 클릭한 버튼과 해당 컨텐츠에 active 추가
            btn.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
});