getCheck();
async function getCheck() {
  let node = await figma.getFileThumbnailNodeAsync();
  //如果能在整个文件中找到这个封面节点。则进行下一步
  if (node) {
    //寻找封面节点的父节点,需要去循环遍历，直到找到
    let parentPage = findNodePage(node);
    let pageName = parentPage?.name;  //当前页面的名称
    //定义当前界面
    const targetPage: any = figma.root.children.find(
      (page) => page.name === pageName
    );
    //如果page存在则聚焦
    if (targetPage) {
      //定位当前界面
      await figma.setCurrentPageAsync(targetPage);
      //聚焦封面节点
      figma.viewport.scrollAndZoomIntoView([node]);
    }else{
      figma.notify("page未找到");
    }
  } else {
    figma.notify("未找到节点");
  }

  figma.closePlugin();
}

//循环寻找封面节点的父节点，知道找到page
function findNodePage(node: BaseNode) {
  let parentNode: any = node.parent;
  //先判断一次，如果不是在循环遍历，直到找到未知
  if (parentNode?.type == "PAGE") {
    return parentNode;
  } else {
    while (parentNode?.type != "PAGE") {
      parentNode = parentNode?.parent;
    }
    return parentNode;
  }
}
