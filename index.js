const HIDDEN_TEXTAREA_STYLE = `
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

function calculateNodeStyling(node) {
  const style = window.getComputedStyle(node);
  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-top')) +
    parseFloat(style.getPropertyValue('padding-bottom'))
  );

  const borderSize = (
    parseFloat(style.getPropertyValue('border-top')) +
    parseFloat(style.getPropertyValue('border-bottom'))
  );

  const height = node.offsetHeight - borderSize - paddingSize;

  return {
    height
  };
}


function clamp(ele, line, char = '...') {
  // cloen DOM
  const cloneDOM = ele.cloneNode(true);
  document.body.appendChild(cloneDOM);
  cloneDOM.removeAttribute('id');
  cloneDOM.setAttribute('style', HIDDEN_TEXTAREA_STYLE);

  let content = cloneDOM.innerHTML;
  cloneDOM.innerText = '1';
  const originHeight = calculateNodeStyling(ele).height;
  // 获取一行当行高度
  const lineHeight = calculateNodeStyling(cloneDOM).height;
  console.log(originHeight, lineHeight, content);
  cloneDOM.innerText = content;

  const targetHeight = line * lineHeight;
  const totalLine = Math.ceil(originHeight / lineHeight)
  const isModify = calculateNodeStyling(cloneDOM).height > targetHeight;
  if (isModify) {
    // 截取多行
    totalLine, line, content
    const wordNumPerLine = Math.floor(content.length / totalLine);
    let i = totalLine - line - 1;
    let contentBak = content;
    do {
      contentBak = content.slice(0, -(i * wordNumPerLine));
      i += 1;
      cloneDOM.innerText = `${contentBak}...`;
    } while(calculateNodeStyling(cloneDOM).height < targetHeight)
    console.log(contentBak);
    content = contentBak;
    while(calculateNodeStyling(cloneDOM).height > targetHeight) {
      content = `${content.slice(0, -1)}`;
      cloneDOM.innerText = `${content}...`;
    }
  }
  console.log(content);
  ele.innerHTML = `${content}...`;

  document.body.removeChild(cloneDOM);
}