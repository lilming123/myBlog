import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/ui/toast";

import { createSnippet } from "../actions";

export const useCreateSnippet = () => {
  return useRequest(createSnippet, {
    manual: true,
    loadingDelay: 300,
    onSuccess() {
      showSuccessToast("碎碎念已创建");
    },
    onError(error) {
      showErrorToast(`碎碎念创建失败: ${error.message}`);
    },
  });
};
