// 음소거 버튼 js 스크립트 by jinh
const toggleMute = (event) => {
    event.preventDefault();
    // 버튼 상태: 로몬형 왈, 토글을 어떻게 구현할건지한다음 적용할것
    // 그렇기때문에 여기서는 그냥 true/ false로 임시로 지정해서 구분
    const toggleState = false;

    // audio-tags 가져옴
    const audioTags = document.querySelectorAll("div#audio-boxes audio");
    // // 버튼
    // const audioMuteButton = document.querySelector("#audio-mute-button");

    if (toggleState) {
        // 음소거 해야할 경우
        for (let i=0; i < audioTags.length; i++) {
            audioTags[i].muted = true;
        }
        toggleState = false;
    }
    else {
        // 음소거 해제해야 할 경우
        for (let i=0; i < audioTags.length; i++) {
            audioTags[i].muted = false;
        }
        toggleState = true;
    }
}
// button이름을 audio-mute-button
const button = document.querySelector("#audio-mute-button");
button.addEventListener("click", toggleMute);
