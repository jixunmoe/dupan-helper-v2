import { VueComponentShim } from "../external/vue";

interface WithPreviewPluginEnabled {
  previewPlugin: unknown[];
}

export function hookMixinPluginContainer(createdFn: Function) {
  return function (this: WithPreviewPluginEnabled) {
    const result = createdFn.apply(this, arguments);
    this.previewPlugin.push({
      compName: "JixunCodeUploadContainer",
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

export function hookListToolActions(listToolActions: Function) {
  return function (this: unknown) {
    const result = listToolActions.apply(this, arguments);
    if (result?.[0]?.comp === "upload-button") {
      result.splice(1, 0, {
        comp: "JixunCodeUploadButton",
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

export function hookComponentInit(componentInit: Function) {
  return function (this: unknown, component: VueComponentShim) {
    console.info("register component: ", component);

    if (component?.computed?.listToolActions) {
      component.computed.listToolActions = hookListToolActions(
        <Function>component.computed.listToolActions
      );
    }

    if (component?.computed?.hideHeader) {
      component.mixins?.forEach((plugin) => {
        if (plugin?.methods?.handlePreview && plugin.created) {
          plugin.created = hookMixinPluginContainer(plugin.created);
        }
      });
    }

    return componentInit.apply(this, arguments);
  };
}
