export function hookComponentInit(componentInit) {
  return function (component) {
    console.info("register component: ", component);

    if (component?.computed?.listToolActions) {
      component.computed.listToolActions = hookListToolActions(
        component.computed.listToolActions
      );
    }

    if (component?.computed?.hideHeader) {
      component.mixins?.forEach((plugin) => {
        if (plugin?.methods?.handlePreview) {
          plugin.created = hookMixinPluginContainer(plugin.created);
        }
      });
    }

    return componentInit.apply(this, arguments);
  };
}

export function hookMixinPluginContainer(createdFn) {
  return function () {
    const result = createdFn.apply(this, arguments);
    this.previewPlugin.push({
      compName: "demo-dialog-jixun",
      show: true,
      key: "Jixun Code Input Dialog",
      compProps: {
        fileMetaList: [],
        currentFileMeta: null,
        otherParam: null,
      },
    });
    return result;
  };
}

export function hookListToolActions(listToolActions) {
  return function () {
    const result = listToolActions.apply(this, arguments);
    if (result?.[0]?.comp === "upload-button") {
      result.splice(1, 0, {
        comp: "jixun-code-upload-button",
        evt: "instant-code-upload",
        icon: "u-icon-upper-shelf",
        plugin: "code-upload@com.baidu.pan",
        text: "秒传",
      });
    }
    // console.info("listToolActions:", result);
    return result;
  };
}
