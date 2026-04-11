// assets/js/include.js

function loadComponent(id, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('파일 로드 실패: ' + url);
            return response.text();
        })
        .then(data => {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = data;
                // [핵심] 헤더 안의 모든 상대/절대 경로를 현재 프로젝트 루트에 맞게 보정합니다.
                fixPaths(el);
            }
        })
        .catch(err => console.error(err));
}

// 경로를 자동으로 고쳐주는 함수
function fixPaths(container) {
    const root = findRoot();
    
    // a 태그와 img 태그를 모두 찾습니다.
    const tags = container.querySelectorAll('a, img');
    
    tags.forEach(tag => {
        const attr = tag.tagName === 'A' ? 'href' : 'src';
        let val = tag.getAttribute(attr);
        
        // 만약 경로가 '/'로 시작한다면 (절대 경로 스타일)
        if (val && val.startsWith('/')) {
            // 맨 앞의 '/'를 제거하고 프로젝트 루트(root)를 붙여줍니다.
            tag.setAttribute(attr, root + val.substring(1));
        }
    });
}

// 현재 스크립트 위치를 기반으로 프로젝트 루트 경로를 계산하는 함수
function findRoot() {
    const scripts = document.getElementsByTagName('script');
    for (let s of scripts) {
        if (s.src.includes('include.js')) {
            // 예: http://.../defense-jbnu.github.io/assets/js/include.js 
            // -> http://.../defense-jbnu.github.io/ 를 추출
            return s.src.split('assets/js/include.js')[0];
        }
    }
    return '/';
}

window.addEventListener('DOMContentLoaded', () => {
    const root = findRoot();
    // 헤더 파일 자체를 불러올 때도 계산된 root를 사용합니다.
    loadComponent('header-include', root + 'include/header.html');
});