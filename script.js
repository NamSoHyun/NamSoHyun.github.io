document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");

  // 스크롤이 일정 이상 내려가면 navbar 표시
  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 0.9) {
      navbar.classList.add("show");
    } else {
      navbar.classList.remove("show");
    }
  })

  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // 빛나는 커서 
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = e.clientY + "px";
      cursor.style.left = e.clientX + "px";
    });

    document.addEventListener("mousedown", () => cursor.classList.add("click"));
    document.addEventListener("mouseup", () => cursor.classList.remove("click"));
  }

  // 글자 분해 효과
  const title = document.querySelector(".landing h1");
  if (title) {
    const text = title.textContent;
    const frag = document.createDocumentFragment();
    let i = 0;

    for (const ch of text) {
      if (ch === " ") {
        frag.appendChild(document.createTextNode(" "));
        continue;
      }
      const span = document.createElement("span");
      span.className = "char " + (i % 2 ? "odd" : "even");
      span.textContent = ch;
      frag.appendChild(span);
      i++;
    }

    title.textContent = "";
    title.appendChild(frag);
  }

  // 강점 애니메이션
  const section = document.querySelector(".strengths");
  const curious = document.querySelector(".face.curious");
  const aha = document.querySelector(".face.aha");
  const strengths = document.querySelectorAll(".strength");

  if (section && curious && aha) {
    let timer;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          clearTimeout(timer);

          timer = setTimeout(() => {
            curious.style.opacity = 0;
            aha.style.opacity = 1;

            strengths.forEach((item, i) => {
              setTimeout(() => item.classList.add("show"), i * 400);
            });
          }, 200);

        } else {
          clearTimeout(timer);

          curious.style.opacity = 1;
          aha.style.opacity = 0;

          strengths.forEach(item => {
            item.classList.remove("show");
          });
        }
      });
    }, { threshold: 0.5 });

    observer.observe(section);
  }
});
