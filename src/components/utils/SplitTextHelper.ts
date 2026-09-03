export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  private originalHTML: Map<HTMLElement, string> = new Map();

  constructor(
    target:
      | string
      | HTMLElement
      | NodeListOf<HTMLElement>
      | (string | HTMLElement)[],
    _options?: { type?: string; linesClass?: string }
  ) {
    let elements: HTMLElement[] = [];
    if (typeof target === "string") {
      elements = Array.from(document.querySelectorAll<HTMLElement>(target));
    } else if (target instanceof HTMLElement) {
      elements = [target];
    } else if (Array.isArray(target)) {
      target.forEach((item) => {
        if (typeof item === "string") {
          elements.push(...Array.from(document.querySelectorAll<HTMLElement>(item)));
        } else if (item instanceof HTMLElement) {
          elements.push(item);
        }
      });
    } else if (target && "forEach" in target) {
      Array.from(target).forEach((el) => {
        if (el instanceof HTMLElement) elements.push(el);
      });
    }

    elements.forEach((el) => {
      this.originalHTML.set(el, el.innerHTML);
      const text = el.innerText || el.textContent || "";
      const words = text.split(/\s+/).filter(Boolean);
      el.innerHTML = "";

      words.forEach((word, wIdx) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "split-word";
        wordSpan.style.display = "inline-block";

        const chars = Array.from(word);
        chars.forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.className = "split-char";
          charSpan.style.display = "inline-block";
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        });

        this.words.push(wordSpan);
        el.appendChild(wordSpan);

        if (wIdx < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });
    });
  }

  revert() {
    this.originalHTML.forEach((html, el) => {
      el.innerHTML = html;
    });
  }
}
