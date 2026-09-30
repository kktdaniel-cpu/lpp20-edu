/* ============================================================
   LIFE 2.0 · edu.lpp20.com 내부자료 비밀번호 게이트
   ------------------------------------------------------------
   ▶ 비밀번호를 바꾸려면 아래 PASSWORD 값만 수정하세요.
   ▶ 한 번 맞추면 브라우저 탭을 닫기 전까지 다시 묻지 않습니다.
   ※ 참고: 정적 사이트 특성상 '캐주얼 차단' 수준입니다.
     (진짜 로그인 보안이 필요하면 Cloudflare Access 안내 참고)
   ============================================================ */
(function () {
  var PASSWORD = "life2026";              // ← 원하는 비밀번호로 변경
  var KEY = "lpp20_edu_auth";

  try { if (sessionStorage.getItem(KEY) === PASSWORD) return; } catch (e) {}

  function mount() {
    var ov = document.createElement("div");
    ov.id = "__lpp_gate";
    ov.style.cssText =
      "position:fixed;inset:0;z-index:2147483647;background:#163529;" +
      "display:flex;align-items:center;justify-content:center;padding:20px;" +
      "font-family:'Pretendard',-apple-system,sans-serif;";
    ov.innerHTML =
      '<div style="width:100%;max-width:380px;background:#fff;border-radius:18px;' +
      'padding:34px 30px;box-shadow:0 24px 60px rgba(0,0,0,.4);text-align:center">' +
        '<div style="font-size:11px;font-weight:800;letter-spacing:.16em;color:#c9762b">LIFE 2.0 · 「2막1장」</div>' +
        '<div style="font-size:20px;font-weight:800;color:#183a2c;margin-top:10px;letter-spacing:-.01em">내부 강의자료</div>' +
        '<div style="font-size:13px;color:#6f7d73;margin-top:8px;line-height:1.55">비밀번호를 입력하시면 자료가 열립니다.</div>' +
        '<input id="__lpp_pw" type="password" inputmode="text" autocomplete="off" placeholder="비밀번호" ' +
        'style="width:100%;margin-top:20px;padding:13px 15px;border:1.5px solid #dcd7cc;border-radius:11px;' +
        'font-size:15px;color:#183a2c;outline:none;box-sizing:border-box">' +
        '<div id="__lpp_err" style="height:16px;font-size:12px;color:#b23a3a;margin-top:7px;font-weight:600"></div>' +
        '<button id="__lpp_go" style="width:100%;margin-top:6px;padding:13px;border:none;border-radius:999px;' +
        'background:#183a2c;color:#fff;font-size:15px;font-weight:800;cursor:pointer">확인 →</button>' +
        '<div style="font-size:11px;color:#b7b0a2;margin-top:16px">주식회사 라이프이점영 · 내부 자료</div>' +
      '</div>';
    document.body.appendChild(ov);
    document.documentElement.style.overflow = "hidden";

    var inp = ov.querySelector("#__lpp_pw");
    var err = ov.querySelector("#__lpp_err");
    var btn = ov.querySelector("#__lpp_go");
    inp.focus();

    function submit() {
      if (inp.value === PASSWORD) {
        try { sessionStorage.setItem(KEY, PASSWORD); } catch (e) {}
        ov.remove();
        document.documentElement.style.overflow = "";
      } else {
        err.textContent = "비밀번호가 올바르지 않습니다.";
        inp.value = "";
        inp.focus();
        ov.firstChild.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-8px)" },
           { transform: "translateX(8px)" }, { transform: "translateX(0)" }],
          { duration: 220 });
      }
    }
    btn.addEventListener("click", submit);
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
