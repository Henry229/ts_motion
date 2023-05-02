import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video"> 
            <div class="video__player">
            <iframe class="video__iframe"></iframe>
            </div>
            <h3 class="video__title"></h3>
          </section>`);
    const iframe = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    iframe.src = this.convertToEmbededURL(url); // 'https://www.youtube.com/embed/_Yk1H2CKcWQ'; //url -> videoId
    console.log(url);

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
  // https://regexr.com/5l6nr

  private convertToEmbededURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
  // input
  //https://www.youtube.com/watch?v=K3-jG52XwuQ (주소창의 url)
  //https://youtu.be/K3-jG52XwuQ (유투브화면의 우클릭 후 url 복사)
  // output
  // https://www.youtube.com/embed/K3-jG52XwuQ (우리가 사용할 url)
  // 끝에 k3-jG52XwuQ를 가져오기 위해서 정규표현식을 사용한다. Regex
}

// const iframe = <iframe width="1049" height="599" src="https://www.youtube.com/embed/_Yk1H2CKcWQ" title="재능이 없다면 5가지만 기억하세요, 나이키 조던 부사장이 말하는 5가지 성공 법칙 바이블 | 하워드 화이트 | 동기부여학과" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
