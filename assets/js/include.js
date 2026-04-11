// assets/js/include.js

function loadComponent(id, url) {
    // 1. 현재 페이지의 깊이(depth)를 계산합니다.
    // 예: /index.html -> 0
    // 예: /pages/about/intro.html -> 2
    const path = window.location.pathname;
    
    // 로컬 환경과 GitHub Pages 환경의 경로 차이를 고려하여 depth 계산
    // (보통 /의 개수에서 1을 빼면 depth가 나옵니다)
    const segments = path.split('/').filter(p => p !== '');
    
    // GitHub Pages(저장소 이름 포함)인 경우와 Local(루트)인 경우를 구분해야 하지만,
    // 가장 확실한 방법은 '기준 폴더'를 찾는 것입니다.
    
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('파일 로드 실패: ' + url);
            return response.text();
        })
        .then(data => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = data;
        })
        .catch(err => console.error(err));
}

window.addEventListener('DOMContentLoaded', () => {
    // [중요] 함수 내부에서 경로를 동적으로 생성하는 대신, 
    // HTML 파일 자체에서 자신의 '뿌리'까지의 경로를 변수로 들고 있게 하면 가장 확실합니다.
    
    // 대안: 각 HTML 파일의 <head>에 <base> 태그를 쓰거나, 
    // 아래와 같이 현재 HTML에서 직접 경로를 유추하게 합니다.
    
    const findRoot = () => {
        const scripts = document.getElementsByTagName('script');
        for (let s of scripts) {
            if (s.src.includes('include.js')) {
                // include.js가 assets/js/에 있다는 것을 이용해 루트를 찾음
                return s.src.split('assets/js/include.js')[0];
            }
        }
        return '/';
    };

    const root = findRoot();
    
    // 이제 어느 페이지에서든 'root + 경로' 조합으로 호출 가능합니다.
    loadComponent('header-include', root + 'include/header.html');
    // 나중에 푸터도 필요하시다면:
    // loadComponent('footer-include', root + 'include/footer.html');
});